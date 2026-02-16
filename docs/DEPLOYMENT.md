# Deployment (main + release branch)

Single integration branch: **main**. Production deploys only from **release** (extra release step).

---

## How it works

| Flow           | Trigger                  | What runs                                                               | Result                                                                           |
| -------------- | ------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **CI (main)**  | Push or PR to `main`     | `ci.yml` (lint, format, typecheck, tests, Knip, build, security)        | CI status. Vercel builds `main` as **Preview** only (not production).            |
| **Production** | Publish a GitHub Release | `release.yml` (CI on the release tag, then push tag → `release` branch) | Validates the release; updates `release` branch → **Vercel deploys production**. |

---

## Deploy to production (release step)

Production does **not** deploy on merge to `main`. It deploys only when you publish a GitHub Release.

1. Merge your feature branch into **main**. CI runs; you get preview deployments only.
2. When you want to ship to production:
   - Create a tag on the commit you want to release (usually the latest on `main`):
     ```bash
     git checkout main
     git pull origin main
     git tag v1.0.0
     git push origin v1.0.0
     ```
   - In GitHub: **Releases** → **Draft a new release** → choose that tag (e.g. `v1.0.0`) → **Publish release**.
3. **CI (production)** runs on that tag (lint, tests, build). If it passes, the workflow pushes that commit to the **release** branch.
4. **Vercel** sees the new commit on `release` and deploys **production**.

So: **merge to main** = preview/staging only → **Publish release** = production deploy.

---

## Vercel settings (required)

- **Production Branch:** `release` (not `main`)
- **Root Directory:** `frontend`
- **Preview:** PRs and pushes to `main` get preview deployments; production deploys only from `release`.

First time: create the `release` branch (e.g. from `main`) and push it so Vercel has a branch to deploy:

```bash
git checkout main
git pull origin main
git checkout -b release
git push -u origin release
```
