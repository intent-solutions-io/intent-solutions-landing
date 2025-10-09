# GitHub Release Checklist

**One-Pager Release Standard**

---

## Pre-Release

- [ ] All critical/high issues closed for milestone
- [ ] Test suite passes (`npm test` or equivalent)
- [ ] Security scans clean
- [ ] Working tree clean (`git status`)

## Version & Changelog

- [ ] Determine bump type: `major.minor.patch`
- [ ] Update version in `package.json` (or equivalent)
- [ ] Generate changelog entry in `CHANGELOG.md`:
  ```markdown
  ## [X.Y.Z] - YYYY-MM-DD

  ### Security
  - [List security fixes]

  ### Documentation
  - [List doc updates]

  ### Infrastructure
  - [List infra changes]

  ### Code Quality
  - [List quality improvements]

  ### Community
  - [List contributor/community items]

  **Metrics**: N fixes, M manual, K critical closed
  ```
- [ ] Commit version + changelog: `git commit -m "chore: release vX.Y.Z"`

## Documentation Sync

- [ ] Update version references in `README.md`
- [ ] Update version in docs site (if exists)
- [ ] Update any reference documentation
- [ ] Commit: `git commit -m "docs: sync version vX.Y.Z"`

## Tag & Release

- [ ] Create annotated tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z - [brief description]"`
- [ ] Push tag: `git push origin vX.Y.Z`
- [ ] Create GitHub release via `gh` CLI or web UI:
  - Title: `vX.Y.Z - [Brief Title]`
  - Notes: Copy from changelog
  - Link milestone
  - Attach binaries/artifacts (if applicable)

## Deploy

- [ ] **NPM**: `npm publish` (if public package)
- [ ] **Docker**: Build and push image
- [ ] **GitHub Actions**: Trigger deploy workflow
- [ ] **Docs Site**: Rebuild and deploy (if applicable)
- [ ] **Netlify/Vercel**: Auto-deploy on tag push (verify)

## Post-Release

- [ ] Create release announcement issue
- [ ] Pin announcement issue
- [ ] Create discussion post in "Announcements" (optional)
- [ ] Archive audit artifacts to `.github/audits/vX.Y.Z/`
- [ ] Commit archive: `git commit -m "chore: archive release vX.Y.Z artifacts"`
- [ ] Schedule next audit issue

---

## Quick Commands

```bash
# Version bump (choose one)
npm version major  # Breaking changes
npm version minor  # New features
npm version patch  # Bug fixes

# Create annotated tag
git tag -a vX.Y.Z -m "Release vX.Y.Z"

# Push tag
git push origin vX.Y.Z

# Create GitHub release (gh CLI)
gh release create vX.Y.Z \
  --title "vX.Y.Z - Release Title" \
  --notes-file CHANGELOG_SNIPPET.md \
  --verify-tag

# NPM publish
npm publish

# Docker build + push
docker build -t user/repo:vX.Y.Z .
docker push user/repo:vX.Y.Z
```

---

## Guarantees

✅ Sequential version correctness
✅ All references synced (README, docs, changelog)
✅ Complete audit trail
✅ Automation-ready workflow

---

**Last Updated**: 2025-10-08
**Repository**: intent-solutions-landing
