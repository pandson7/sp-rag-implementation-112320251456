# RAG Implementation Project

A comprehensive Retrieval-Augmented Generation (RAG) system built with AWS services, featuring a React frontend and serverless backend architecture.

## 🏗️ Architecture Overview

This project implements a modern RAG system using:

- **Frontend**: React TypeScript application with Tailwind CSS
- **Backend**: AWS CDK infrastructure with Lambda functions
- **Vector Database**: Amazon OpenSearch for document embeddings
- **Storage**: Amazon S3 for document storage
- **AI/ML**: Amazon Bedrock for text generation and embeddings

## 📁 Project Structure

```
sp-rag-implementation-112320251456/
├── backend/                    # AWS CDK infrastructure
│   ├── lib/                   # CDK stack definitions
│   ├── lambda/                # Lambda function code
│   ├── test/                  # Unit tests
│   └── cdk.out/               # CDK synthesis output
├── frontend/                   # React application
│   ├── src/                   # Source code
│   ├── public/                # Static assets
│   └── node_modules/          # Dependencies
├── generated-diagrams/         # Architecture diagrams
├── specs/                     # Project specifications
├── pricing/                   # Cost analysis
└── qr-code/                   # QR code for project access
```

## 🚀 Features

- **Document Upload & Processing**: Upload documents and convert them to searchable embeddings
- **Intelligent Search**: Vector-based similarity search across document corpus
- **Context-Aware Generation**: Generate responses using retrieved context
- **Real-time Chat Interface**: Interactive chat UI for querying documents
- **Scalable Architecture**: Serverless design that scales automatically
- **Cost Optimization**: Pay-per-use model with efficient resource utilization

## 🛠️ Technology Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Modern component architecture
- Responsive design

### Backend
- AWS CDK for Infrastructure as Code
- AWS Lambda for serverless compute
- Amazon S3 for document storage
- Amazon OpenSearch for vector search
- Amazon Bedrock for AI capabilities
- API Gateway for REST endpoints

## 📊 Architecture Diagrams

The project includes comprehensive architecture diagrams:

1. **System Architecture**: High-level component overview
2. **Data Flow**: Document processing and query flow
3. **Deployment Architecture**: AWS service interactions

View diagrams in the `generated-diagrams/` folder.

## 💰 Cost Analysis

Detailed cost analysis available in `pricing/rag_cost_analysis.md` including:
- Monthly cost estimates
- Usage-based pricing breakdown
- Cost optimization recommendations
- Scaling considerations

## 🔧 Setup & Deployment

### Prerequisites
- Node.js 18+
- AWS CLI configured
- AWS CDK installed globally

### Backend Deployment
```bash
cd backend
npm install
npm run build
cdk deploy
```

### Frontend Development
```bash
cd frontend
npm install
npm start
```

## 📋 Project Specifications

Comprehensive project documentation available in the `specs/` folder:
- `requirements.md`: Functional and technical requirements
- `design.md`: System design and architecture decisions
- `tasks.md`: Development tasks and milestones

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📈 Performance Considerations

- **Embedding Generation**: Optimized batch processing for document embeddings
- **Vector Search**: Efficient similarity search with OpenSearch
- **Caching**: Strategic caching at multiple layers
- **Auto-scaling**: Serverless functions scale based on demand

## 🔒 Security Features

- IAM roles with least privilege access
- VPC configuration for network isolation
- Encryption at rest and in transit
- API authentication and authorization

## 🌟 Key Benefits

1. **Serverless Architecture**: No server management required
2. **Cost Effective**: Pay only for what you use
3. **Scalable**: Handles varying workloads automatically
4. **Modern Stack**: Latest technologies and best practices
5. **Production Ready**: Comprehensive testing and monitoring

## 📚 Documentation

- **Project Summary**: `PROJECT_SUMMARY.md`
- **JIRA Stories**: `jira-stories-summary.md`
- **Task Description**: `task_description.md`

## 🤝 Contributing

This project follows modern development practices:
- TypeScript for type safety
- Comprehensive testing
- Infrastructure as Code
- CI/CD ready architecture

## 📞 Support

For questions or issues, refer to the project documentation or contact the development team.

---

**Built with ❤️ using AWS services and modern web technologies**
