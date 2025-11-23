# RAG Implementation AWS Architecture Diagrams

This directory contains AWS architecture diagrams for the RAG (Retrieval-Augmented Generation) implementation based on the technical design specifications.

## Generated Diagrams

### 1. RAG Architecture Overview (`rag_architecture.png`)
- **Purpose**: High-level system architecture showing all major components
- **Components**:
  - Frontend: React application (localhost:3000)
  - API Layer: AWS API Gateway
  - Backend: AWS Lambda (Node.js)
  - Document Processing: Amazon Kendra Index with S3 storage
  - AI Generation: Amazon Bedrock with Claude 4
  - Infrastructure: AWS CDK, IAM, CloudWatch
- **Data Flow**: User → React → API Gateway → Lambda → Kendra/Bedrock → Response

### 2. Data Flow Process (`rag_data_flow.png`)
- **Purpose**: Detailed step-by-step data flow through the RAG pipeline
- **Process Steps**:
  1. User submits question via React interface
  2. POST request sent to API Gateway
  3. Lambda function invoked for processing
  4. Semantic search performed in Kendra
  5. Relevant documents retrieved
  6. Context and query sent to Bedrock Claude 4
  7. AI response generated
  8. Response formatted and returned
  9. UI displays response with sources
  10. User receives final answer

### 3. Deployment Architecture (`rag_deployment.png`)
- **Purpose**: Infrastructure deployment and environment setup
- **Environments**:
  - **Local Development**: Developer machine, React dev server, local documents
  - **AWS Cloud**: Lambda runtime, API Gateway, Kendra, Bedrock, S3, IAM roles
  - **Infrastructure as Code**: CDK application and CloudFormation stack
- **Security**: IAM roles for Lambda execution and Kendra service access
- **Monitoring**: CloudWatch Logs for observability

## Technical Implementation Details

### Key AWS Services Used:
- **Amazon Kendra**: Enterprise search service for document indexing and semantic search
- **Amazon Bedrock**: Managed AI service with Claude 4 for response generation
- **AWS Lambda**: Serverless compute for backend processing
- **Amazon API Gateway**: RESTful API management
- **Amazon S3**: Document storage
- **AWS CDK**: Infrastructure as Code deployment
- **IAM**: Security and access management
- **CloudWatch**: Logging and monitoring

### Architecture Benefits:
- **Serverless**: Auto-scaling and cost-effective
- **Semantic Search**: Advanced document retrieval with Kendra
- **AI-Powered**: High-quality responses using Claude 4
- **Secure**: Proper IAM roles and policies
- **Observable**: CloudWatch integration for monitoring
- **Maintainable**: Infrastructure as Code with CDK

## File Locations
- Main Architecture: `/home/pandson/echo-architect-artifacts/sp-rag-implementation-112320251456/generated-diagrams/rag_architecture.png`
- Data Flow: `/home/pandson/echo-architect-artifacts/sp-rag-implementation-112320251456/generated-diagrams/rag_data_flow.png`
- Deployment: `/home/pandson/echo-architect-artifacts/sp-rag-implementation-112320251456/generated-diagrams/rag_deployment.png`

Generated on: Sunday, November 23, 2025 at 15:00 EST
