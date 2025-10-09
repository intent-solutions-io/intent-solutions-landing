# GitHub Actions Workflows

Automated CI/CD pipelines for Intent Solutions landing page.

---

## 🔄 Workflows

### 1. **Test Suite** (`test.yml`)

**Triggers:**
- Every push to `main` branch
- Every pull request to `main` branch

**What it does:**
- Installs dependencies
- Runs Playwright tests
- Uploads test results and screenshots
- Runs on every code change

**Status:** Runs automatically

---

### 2. **Release Pipeline** (`release.yml`)

**Triggers:**
- **Manual:** Go to Actions > Release Pipeline > Run workflow
- **Automatic:** Push a git tag like `v2.1.2`

**What it does:**
1. ✅ Runs full test suite
2. 📦 Bumps version in package.json
3. 📝 Generates changelog entry
4. 📄 Updates README.md version
5. 🏷️ Creates git tag
6. 🚀 Creates GitHub release
7. 📁 Archives release artifacts
8. 📢 Creates announcement issue

**How to use:**

#### Option A: Manual Release (Recommended)
```bash
# In GitHub:
1. Go to Actions tab
2. Click "Release Pipeline"
3. Click "Run workflow"
4. Choose: patch (bug fixes) / minor (new features) / major (breaking changes)
5. Click "Run workflow"
```

#### Option B: Tag-Based Release
```bash
# Locally:
git tag -a v2.1.2 -m "Release v2.1.2"
git push origin v2.1.2
```

---

### 3. **Deploy to Netlify** (`deploy.yml`)

**Triggers:**
- Every push to `main` branch
- Every GitHub release published

**What it does:**
- Builds Astro site
- Deploys to Netlify production
- Comments with deployment status

**Status:** Runs automatically

**Note:** Requires Netlify secrets configured (see Setup below)

---

## 🔧 Setup Required

### Netlify Deployment Secrets

Add these to **Settings > Secrets and variables > Actions > Repository secrets**:

1. `NETLIFY_AUTH_TOKEN`
   - Get from: https://app.netlify.com/user/applications
   - Create new personal access token

2. `NETLIFY_SITE_ID`
   - Get from: Netlify site settings > General > Site details > Site ID

### How to add secrets:
```
1. Go to: https://github.com/jeremylongshore/intent-solutions-landing/settings/secrets/actions
2. Click "New repository secret"
3. Add NETLIFY_AUTH_TOKEN
4. Add NETLIFY_SITE_ID
```

---

## 📊 Workflow Status

Check workflow runs:
```
https://github.com/jeremylongshore/intent-solutions-landing/actions
```

---

## 🚀 Quick Release Guide

**To release a new version:**

1. **Make your changes** and commit to `main`
2. **Go to GitHub Actions**
3. **Click "Release Pipeline"**
4. **Run workflow** with bump type:
   - `patch` - Bug fixes (2.1.1 → 2.1.2)
   - `minor` - New features (2.1.2 → 2.2.0)
   - `major` - Breaking changes (2.2.0 → 3.0.0)

**That's it!** The workflow automatically:
- Tests everything
- Bumps version
- Updates changelog
- Creates release
- Deploys to production
- Announces release

---

## 🔍 Monitoring

**View test results:**
- Go to Actions > Latest workflow run
- Check "Run tests" step
- Download test artifacts if tests fail

**View deployments:**
- Go to Actions > Deploy to Netlify
- Check deployment status
- Verify at https://intentsolutions.io

---

## ⚠️ Troubleshooting

### Tests failing?
- Check test results in Actions tab
- Download screenshots artifact
- Fix tests locally first
- Re-run workflow

### Deployment failing?
- Verify Netlify secrets are configured
- Check Netlify dashboard for errors
- Ensure build succeeds locally: `npm run build`

### Release failing?
- Ensure tests pass first
- Check you have write permissions
- Verify CHANGELOG.md exists
- Check git tags: `git tag -l`

---

## 📝 Notes

- **Tests must pass** before release (can be skipped with `skip_tests` flag, not recommended)
- **Version bumps** are automatic based on bump type
- **Changelog** is auto-generated from git commits
- **Announcements** are auto-created as GitHub issues
- **Deployments** happen automatically on release

---

**Last Updated:** 2025-10-08
**Status:** ✅ All workflows active
