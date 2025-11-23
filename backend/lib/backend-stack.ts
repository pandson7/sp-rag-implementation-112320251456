import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kendra from 'aws-cdk-lib/aws-kendra';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import * as path from 'path';

export class RagImplementationStack112320251456 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = '112320251456';

    // S3 bucket for document storage
    const documentBucket = new s3.Bucket(this, `DocumentBucket${suffix}`, {
      bucketName: `rag-documents-${suffix}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT, s3.HttpMethods.POST],
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
      }]
    });

    // Kendra index
    const kendraIndex = new kendra.CfnIndex(this, `KendraIndex${suffix}`, {
      name: `rag-index-${suffix}`,
      roleArn: new iam.Role(this, `KendraRole${suffix}`, {
        assumedBy: new iam.ServicePrincipal('kendra.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess')
        ]
      }).roleArn,
      edition: 'DEVELOPER_EDITION'
    });

    // S3 data source for Kendra
    const kendraDataSource = new kendra.CfnDataSource(this, `KendraDataSource${suffix}`, {
      indexId: kendraIndex.attrId,
      name: `s3-data-source-${suffix}`,
      type: 'S3',
      roleArn: new iam.Role(this, `KendraDataSourceRole${suffix}`, {
        assumedBy: new iam.ServicePrincipal('kendra.amazonaws.com'),
        inlinePolicies: {
          S3Access: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: ['s3:GetObject', 's3:ListBucket'],
                resources: [documentBucket.bucketArn, `${documentBucket.bucketArn}/*`]
              }),
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: ['kendra:*'],
                resources: ['*']
              })
            ]
          })
        }
      }).roleArn,
      dataSourceConfiguration: {
        s3Configuration: {
          bucketName: documentBucket.bucketName
        }
      }
    });

    // Lambda function for RAG processing
    const ragFunction = new lambda.Function(this, `RagFunction${suffix}`, {
      functionName: `rag-processor-${suffix}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      timeout: cdk.Duration.minutes(5),
      memorySize: 1024,
      environment: {
        KENDRA_INDEX_ID: kendraIndex.attrId,
        BUCKET_NAME: documentBucket.bucketName
      },
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda'))
    });

    // IAM permissions for Lambda
    ragFunction.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['kendra:Retrieve', 'kendra:Query'],
      resources: [kendraIndex.attrArn]
    }));

    ragFunction.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['bedrock:InvokeModel'],
      resources: ['arn:aws:bedrock:*::foundation-model/amazon.nova-lite-v1:0']
    }));

    // API Gateway
    const api = new apigateway.RestApi(this, `RagApi${suffix}`, {
      restApiName: `rag-api-${suffix}`,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization']
      }
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(ragFunction);

    // API endpoints
    const queryResource = api.root.addResource('query');
    queryResource.addMethod('POST', lambdaIntegration);

    const samplesResource = api.root.addResource('samples');
    samplesResource.addMethod('GET', lambdaIntegration);

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL'
    });

    new cdk.CfnOutput(this, 'BucketName', {
      value: documentBucket.bucketName,
      description: 'S3 Bucket for documents'
    });

    new cdk.CfnOutput(this, 'KendraIndexId', {
      value: kendraIndex.attrId,
      description: 'Kendra Index ID'
    });
  }
}
