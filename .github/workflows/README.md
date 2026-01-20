# CI/CD Pipelines Documentation

This repository contains three CI/CD pipelines:

## 1. CI Pipeline (`ci.yml`)
- **Triggers**: All branches, PRs to main/beta/develop
- **Purpose**: Run tests and linting on all code changes
- **Actions**:
  - Backend tests and linting
  - Frontend tests, linting, and type checking
  - Docker image building (test only, no push)

## 2. Beta Pipeline (`beta.yml`)
- **Triggers**: Pushes to `beta` branch, PRs to `beta`, manual dispatch
- **Purpose**: Deploy to beta/staging environment
- **Actions**:
  - Run all tests
  - Build and push Docker images to GitHub Container Registry
  - Deploy to beta environment
  - Image tags: `beta`, `beta-<sha>`, branch name

### Beta Environment Setup
1. Create a `beta` branch
2. Configure secrets in GitHub:
   - `BETA_API_URL` (optional): Beta API URL
   - `BETA_DEPLOY_URL` (optional): Beta deployment URL

## 3. Production Pipeline (`production.yml`)
- **Triggers**: Pushes to `main` branch, manual dispatch (requires confirmation)
- **Purpose**: Deploy to production environment
- **Actions**:
  - Run all tests (strict - failures block deployment)
  - Security scanning with Trivy
  - Build and push Docker images to GitHub Container Registry
  - Deploy to production (with confirmation)
  - Smoke tests after deployment
  - Automatic rollback on failure
  - Image tags: `latest`, `prod-<sha>`, semantic versioning

### Production Environment Setup
1. Ensure `main` branch is protected
2. Configure secrets in GitHub:
   - `PRODUCTION_API_URL` (optional): Production API URL
   - `PRODUCTION_DEPLOY_URL` (optional): Production deployment URL
3. For manual deployment:
   - Go to Actions → Production CI/CD Pipeline
   - Click "Run workflow"
   - Type "deploy" in the confirmation field

## Workflow

```
Feature Branch → PR → CI Pipeline (tests)
                    ↓
              Merge to beta → Beta Pipeline (deploy to beta)
                    ↓
              Merge to main → Production Pipeline (deploy to production)
```

## Docker Images

Images are pushed to GitHub Container Registry:
- `ghcr.io/<owner>/<repo>/backend:<tag>`
- `ghcr.io/<owner>/<repo>/frontend:<tag>`

## Environment Variables

### Beta
- `NEXT_PUBLIC_API_URL`: Set via `BETA_API_URL` secret or default
- `NODE_ENV`: production

### Production
- `NEXT_PUBLIC_API_URL`: Set via `PRODUCTION_API_URL` secret or default
- `NODE_ENV`: production

## Deployment

### Automatic Deployment
- **Beta**: Automatically deploys on push to `beta` branch
- **Production**: Automatically deploys on push to `main` branch

### Manual Deployment
- **Beta**: Use workflow_dispatch in Actions
- **Production**: Use workflow_dispatch and type "deploy" to confirm

## Customization

To customize deployment steps, edit the `deploy-beta` and `deploy-production` jobs in their respective workflow files. Common deployment methods:

- **Kubernetes**: Use `kubectl` commands
- **Docker Compose**: Use `docker-compose` commands
- **Cloud Providers**: Use provider-specific CLI tools (AWS, GCP, Azure)
- **Platforms**: Use platform-specific tools (Vercel, Netlify, Railway, etc.)

## Security

- Production pipeline includes Trivy security scanning
- All Docker images are scanned for vulnerabilities
- Results are uploaded to GitHub Security tab

## Notifications

Add notification steps to the deployment jobs:
- Slack: Use `slackapi/slack-github-action`
- Discord: Use webhook actions
- Email: Use email notification services
- Custom: Add your own notification logic
