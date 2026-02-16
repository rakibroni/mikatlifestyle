# Deployment (main only, no develop branch)

Single integration branch: **main**. No develop branch.

---

## How it works

| Flow           | Trigger                  | What runs                                                        | Result                                                                    |
| -------------- | ------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Beta**       | Push or PR to `main`     | `ci.yml` (lint, format, typecheck, tests, Knip, build, security) | CI status on the PR or after push. Vercel deploys production from `main`. |
| **Production** | Publish a GitHub Release | `release.yml` (same CI on the release tag)                       | Validates that the released version passes all checks.                    |

---

## Deploy to production

1. Merge your feature branch into **main** (or push directly to `main`).
2. **CI (beta)** runs on that push.
3. **Vercel** deploys from `main` automatically (Production Branch = `main`).

No separate “release” step in Vercel. Production is whatever is deployed from `main`.

---

## Mark a version as production-ready

1. Create a tag (e.g. `v1.0.0`) on the commit you want to release:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
2. In GitHub: **Releases** → **Draft a new release** → choose that tag → **Publish release**.
3. **CI (production)** runs (`release.yml`) on that tag and validates the build.

---

## Vercel settings

- **Production Branch:** `main`
- **Root Directory:** `frontend`
- **Preview:** PRs get preview deployments; production deploys only from `main`.
