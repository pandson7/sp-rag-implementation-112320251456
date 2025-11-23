#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { RagImplementationStack112320251456 } from '../lib/backend-stack';

const app = new cdk.App();
new RagImplementationStack112320251456(app, 'RagImplementationStack112320251456', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
  },
});
