# Professional Deployment Guide

This guide provides step-by-step instructions for setting up a professional CI/CD workflow with GitHub and Vercel.

## 📋 Table of Contents

1. [Initial Setup](#initial-setup)
2. [GitHub Repository Setup](#github-repository-setup)
3. [Vercel Setup](#vercel-setup)
4. [GitHub Secrets Configuration](#github-secrets-configuration)
5. [Branch Protection Rules](#branch-protection-rules)
6. [Developer Workflow](#developer-workflow)
7. [Deployment Process](#deployment-process)
8. [Troubleshooting](#troubleshooting)

## 🚀 Initial Setup

### Step 1: Initialize Git Repository

```bash
# Navigate to your project directory
cd /Users/mdrakibmostofa/Personal\ projects/mikatlifestyle

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Full-stack e-commerce project setup"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/mikatlifestyle.git

# Push to GitHub
git push -u origin main
```

### Step 2: Create Required Branches

```bash
# Create and push beta branch
git checkout -b beta
git push -u origin beta

# Create and push develop branch (optional, for feature development)
git checkout -b develop
git push -u origin develop

# Return to main
git checkout main
```

## 📦 GitHub Repository Setup

### Step 3: Configure Repository Settings

1. **Go to your GitHub repository**
   - Navigate to: `https://github.com/YOUR_USERNAME/mikatlifestyle`

2. **Enable GitHub Actions**
   - Go to Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
   - Click "Save"

3. **Enable GitHub Container Registry**
   - Go to Settings → Actions → General
   - Scroll to "Artifact and log retention"
   - Set retention days as needed
   - Go to Settings → Packages
   - Ensure "GitHub Container Registry" is enabled

## 🎨 Vercel Setup

### Step 4: Create Vercel Projects

#### For Beta Environment:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in or create an account

2. **Import Project (Beta)**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Project Name**: `mikatlifestyle-beta`
     - **Root Directory**: `frontend`
     - **Framework Preset**: Next.js
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`
     - **Install Command**: `npm install`

3. **Environment Variables (Beta)**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL = https://api-beta.mikatlifestyle.com
     ```
   - Select "Production", "Preview", and "Development"

4. **Get Vercel Project IDs**
   - Go to Project Settings → General
   - Copy the **Project ID** (save this for GitHub secrets)
   - Copy the **Organization ID** (save this for GitHub secrets)

#### For Production Environment:

1. **Create Production Project**
   - Click "Add New" → "Project"
   - Import the same GitHub repository
   - Configure:
     - **Project Name**: `mikatlifestyle-production`
     - **Root Directory**: `frontend`
     - **Framework Preset**: Next.js
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`
     - **Install Command**: `npm install`

2. **Environment Variables (Production)**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL = https://api.mikatlifestyle.com
     ```
   - Select "Production", "Preview", and "Development"

3. **Get Production Project ID**
   - Go to Project Settings → General
   - Copy the **Project ID** (save this for GitHub secrets)

### Step 5: Get Vercel Token

1. **Generate Vercel Token**
   - Go to: https://vercel.com/account/tokens
   - Click "Create Token"
   - Name: `GitHub Actions CI/CD`
   - Scope: Full Account
   - Copy the token (you won't see it again!)

## 🔐 GitHub Secrets Configuration

### Step 6: Add GitHub Secrets

1. **Go to Repository Settings**
   - Navigate to: `https://github.com/YOUR_USERNAME/mikatlifestyle/settings/secrets/actions`

2. **Add the following secrets:**

   #### Vercel Secrets:
   ```
   VERCEL_TOKEN = <your-vercel-token>
   VERCEL_ORG_ID = <your-vercel-org-id>
   VERCEL_PROJECT_ID = <production-project-id>
   VERCEL_PROJECT_ID_BETA = <beta-project-id>
   ```

   #### Environment URLs (Optional - for notifications):
   ```
   BETA_API_URL = https://api-beta.mikatlifestyle.com
   BETA_FRONTEND_URL = https://beta.mikatlifestyle.com
   PRODUCTION_API_URL = https://api.mikatlifestyle.com
   PRODUCTION_FRONTEND_URL = https://mikatlifestyle.com
   ```

   #### Backend Deployment (if using Railway/Render/Fly.io):
   ```
   RAILWAY_TOKEN = <your-railway-token>  # If using Railway
   RENDER_API_KEY = <your-render-key>     # If using Render
   FLY_API_TOKEN = <your-fly-token>       # If using Fly.io
   ```

## 🛡️ Branch Protection Rules

### Step 7: Protect Main and Beta Branches

1. **Protect Main Branch**
   - Go to Settings → Branches
   - Click "Add rule" for `main`
   - Configure:
     - ✅ Require a pull request before merging
     - ✅ Require approvals: 1 (or more)
     - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - ✅ Include administrators
   - Click "Create"

2. **Protect Beta Branch**
   - Click "Add rule" for `beta`
   - Configure:
     - ✅ Require a pull request before merging
     - ✅ Require status checks to pass before merging
   - Click "Create"

## 👨‍💻 Developer Workflow

### Standard Development Process

```
1. Feature Branch → 2. Pull Request → 3. Merge to Beta → 4. Merge to Main
```

### Step 8: Create Feature Branch

```bash
# Always start from main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... code, code, code ...

# Commit changes
git add .
git commit -m "feat: add new feature description"

# Push feature branch
git push -u origin feature/your-feature-name
```

### Step 9: Create Pull Request

1. **Go to GitHub**
   - Navigate to your repository
   - Click "Compare & pull request"

2. **Create PR to Beta**
   - Base: `beta`
   - Compare: `feature/your-feature-name`
   - Title: `feat: Your feature description`
   - Description: Describe your changes
   - Click "Create pull request"

3. **CI Pipeline Runs**
   - Tests will run automatically
   - Wait for all checks to pass ✅
   - Get code review approval

4. **Merge to Beta**
   - Click "Merge pull request"
   - This triggers Beta Pipeline
   - Frontend deploys to Vercel Beta automatically

### Step 10: Deploy to Beta

After merging to `beta`:

1. **Automatic Deployment**
   - Beta pipeline runs automatically
   - Frontend deploys to Vercel (beta project)
   - Backend Docker image is built and pushed

2. **Verify Beta Deployment**
   - Check Vercel dashboard for beta project
   - Visit beta URL to test
   - Run manual tests

### Step 11: Promote to Production

When beta is stable:

1. **Create PR to Main**
   ```bash
   # From beta branch
   git checkout beta
   git pull origin beta
   
   # Create PR branch
   git checkout -b release/promote-to-production
   git push -u origin release/promote-to-production
   ```

2. **Create Pull Request**
   - Base: `main`
   - Compare: `beta`
   - Title: `chore: promote beta to production`
   - Description: List of changes
   - Click "Create pull request"

3. **Review and Merge**
   - Get approval
   - Merge to main

4. **Production Deployment**
   - Production pipeline runs automatically
   - Frontend deploys to Vercel (production project)
   - Requires manual confirmation if using workflow_dispatch

## 🚢 Deployment Process

### Beta Deployment Flow

```
Push to beta branch
    ↓
Beta Pipeline triggers
    ↓
Run tests
    ↓
Build Docker images
    ↓
Deploy Frontend to Vercel (Beta)
    ↓
Deploy Backend (your platform)
    ↓
✅ Beta environment live
```

### Production Deployment Flow

```
Push to main branch
    ↓
Production Pipeline triggers
    ↓
Run tests (strict)
    ↓
Security scan
    ↓
Build Docker images
    ↓
Deploy Frontend to Vercel (Production)
    ↓
Deploy Backend (your platform)
    ↓
Run smoke tests
    ↓
✅ Production environment live
```

## 🔧 Backend Deployment Options

### Option 1: Railway (Recommended for NestJS)

1. **Create Railway Account**
   - Visit: https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Select `backend` as root directory

3. **Configure Service**
   - Add PostgreSQL database
   - Set environment variables
   - Deploy

4. **Update GitHub Workflow**
   - Add Railway deployment step in workflows

### Option 2: Render

1. **Create Render Account**
   - Visit: https://render.com
   - Sign up

2. **Create Web Service**
   - New → Web Service
   - Connect GitHub repository
   - Configure:
     - Root Directory: `backend`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm run start:prod`

### Option 3: Fly.io

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Create App**
   ```bash
   cd backend
   fly launch
   ```

3. **Deploy**
   ```bash
   fly deploy
   ```

## 📝 Quick Reference Commands

### Daily Developer Commands

```bash
# Start new feature
git checkout main
git pull origin main
git checkout -b feature/feature-name

# Work and commit
git add .
git commit -m "feat: description"
git push origin feature/feature-name

# After PR merge, update local branches
git checkout main
git pull origin main
git checkout beta
git pull origin beta
```

### Deployment Commands

```bash
# Check deployment status
gh run list  # Requires GitHub CLI

# View workflow logs
# Go to: https://github.com/YOUR_USERNAME/mikatlifestyle/actions
```

## 🐛 Troubleshooting

### Common Issues

1. **Vercel Deployment Fails**
   - Check VERCEL_TOKEN is correct
   - Verify VERCEL_PROJECT_ID matches
   - Check environment variables in Vercel dashboard

2. **GitHub Actions Fail**
   - Check secrets are set correctly
   - Verify branch protection rules
   - Check workflow file syntax

3. **Tests Fail**
   - Run tests locally first
   - Check test database connection
   - Verify environment variables

4. **Docker Build Fails**
   - Ensure package-lock.json exists
   - Check Dockerfile syntax
   - Verify build context

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Git Flow Guide](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## ✅ Checklist

Before going live:

- [ ] GitHub repository created and pushed
- [ ] Beta and main branches created
- [ ] Branch protection rules configured
- [ ] Vercel projects created (beta + production)
- [ ] Vercel tokens and IDs collected
- [ ] GitHub secrets configured
- [ ] Backend deployment platform chosen and configured
- [ ] Test deployment to beta successful
- [ ] Team members have access
- [ ] Documentation reviewed

---

**Need Help?** Check the workflow logs in GitHub Actions or contact your team lead.
