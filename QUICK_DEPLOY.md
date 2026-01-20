# 🚀 Quick Deployment Checklist

## Step-by-Step: Push to GitHub & Deploy

### ✅ Step 1: Prepare Your Local Repository

```bash
# Navigate to project
cd "/Users/mdrakibmostofa/Personal projects/mikatlifestyle"

# Initialize git (if not done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Full-stack e-commerce with CI/CD"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mikatlifestyle.git

# Push to main
git push -u origin main
```

### ✅ Step 2: Create Required Branches

```bash
# Create beta branch
git checkout -b beta
git push -u origin beta

# Create develop branch (optional)
git checkout -b develop
git push -u origin develop

# Return to main
git checkout main
```

### ✅ Step 3: Set Up Vercel

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Create Beta Project**:
   - Import GitHub repo
   - Name: `mikatlifestyle-beta`
   - Root Directory: `frontend`
   - Framework: Next.js
   - Add env: `NEXT_PUBLIC_API_URL = https://api-beta.mikatlifestyle.com`
   - **Copy Project ID** → Save for Step 4

3. **Create Production Project**:
   - Import same repo
   - Name: `mikatlifestyle-production`
   - Root Directory: `frontend`
   - Framework: Next.js
   - Add env: `NEXT_PUBLIC_API_URL = https://api.mikatlifestyle.com`
   - **Copy Project ID** → Save for Step 4

4. **Get Vercel Token**:
   - Go to: https://vercel.com/account/tokens
   - Create token: `GitHub Actions CI/CD`
   - **Copy token** → Save for Step 4

5. **Get Organization ID**:
   - Vercel Dashboard → Settings → General
   - **Copy Organization ID** → Save for Step 4

### ✅ Step 4: Configure GitHub Secrets

1. **Go to**: `https://github.com/YOUR_USERNAME/mikatlifestyle/settings/secrets/actions`
2. **Click "New repository secret"** and add:

   ```
   Name: VERCEL_TOKEN
   Value: <your-vercel-token>
   ```

   ```
   Name: VERCEL_ORG_ID
   Value: <your-org-id>
   ```

   ```
   Name: VERCEL_PROJECT_ID
   Value: <production-project-id>
   ```

   ```
   Name: VERCEL_PROJECT_ID_BETA
   Value: <beta-project-id>
   ```

   ```
   Name: BETA_API_URL
   Value: https://api-beta.mikatlifestyle.com
   ```

   ```
   Name: PRODUCTION_API_URL
   Value: https://api.mikatlifestyle.com
   ```

### ✅ Step 5: Protect Branches

1. **Go to**: `https://github.com/YOUR_USERNAME/mikatlifestyle/settings/branches`
2. **Add rule for `main`**:
   - ✅ Require pull request
   - ✅ Require 1 approval
   - ✅ Require status checks
3. **Add rule for `beta`**:
   - ✅ Require pull request
   - ✅ Require status checks

### ✅ Step 6: Test the Workflow

```bash
# Create a test feature
git checkout -b feature/test-deployment

# Make a small change (e.g., update README)
echo "# Test" >> test.txt
git add .
git commit -m "test: verify CI/CD pipeline"
git push origin feature/test-deployment
```

1. **Create PR**: `feature/test-deployment` → `beta`
2. **Wait for CI** to pass ✅
3. **Merge PR** → Triggers beta deployment
4. **Check Vercel** → Beta project should deploy

### ✅ Step 7: Developer Workflow (Daily Use)

```bash
# 1. Start new feature from main
git checkout main
git pull origin main
git checkout -b feature/your-feature

# 2. Make changes and commit
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature

# 3. Create PR on GitHub: feature/your-feature → beta
# 4. After review, merge → Auto-deploys to beta
# 5. Test on beta environment
# 6. Create PR: beta → main
# 7. After review, merge → Auto-deploys to production
```

## 🎯 Workflow Summary

```
Developer creates feature branch
         ↓
    Push to GitHub
         ↓
    Create PR to beta
         ↓
    CI runs (tests, lint)
         ↓
    Merge to beta
         ↓
    Auto-deploy to Vercel (Beta)
         ↓
    Test on beta
         ↓
    Create PR: beta → main
         ↓
    Merge to main
         ↓
    Auto-deploy to Vercel (Production)
```

## 📋 Verification Checklist

After setup, verify:

- [ ] Code pushed to GitHub
- [ ] Beta and main branches exist
- [ ] Vercel projects created (beta + production)
- [ ] GitHub secrets configured
- [ ] Branch protection enabled
- [ ] Test PR merged successfully
- [ ] Beta deployment works
- [ ] Production deployment works

## 🆘 Need Help?

- **Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Workflow Docs**: See [.github/workflows/README.md](.github/workflows/README.md)
- **GitHub Actions**: Check `.github/workflows/` folder

---

**Ready to deploy?** Follow the steps above and you'll have a professional CI/CD pipeline running! 🎉
