---
name: master-github-repo-release
description: Complete GitHub release system that validates fixes, bumps version, generates changelog, tags, creates release, and deploys with synced documentation
model: opus
date: 2025-10-08
---

# GitHub Repository Release System

**Phase: Release Pipeline**

---

## RELEASE WORKFLOW

### 1. Verification
- Confirm all critical and high issues for the milestone are closed.
- Run test suite and security scans.
- Ensure no uncommitted changes remain in the repository.

### 2. Version Management
- Determine bump type (major, minor, patch) based on merged changes.
- Increment version number to next sequential release.
- Commit updated version file(s).

### 3. Changelog Generation
- Build changelog entry for the new version with:
  - Release date
  - Audit ID or milestone reference
  - Categories: security, documentation, infrastructure, code quality, community
  - Metrics: number of fixes, manual fixes, critical issues closed
- Update CHANGELOG.md (prepend new entry).
- Commit changelog update.

### 4. README & Documentation Sync
- Cross-check README.md, docs site, and reference files for version references.
- Update as needed to reflect the new release.
- Commit updated documentation.

### 5. Tag & Release
- Create annotated Git tag vX.Y.Z with release notes from changelog.
- Push tag to repository.
- Create GitHub release with title, notes, and linked milestone.

### 6. Deployment
- Trigger deployment based on repository type:
  - NPM publish if public package.
  - Docker build and push if container.
  - GitHub Actions deploy workflow if defined.
  - Update documentation site if docs/ directory exists.

### 7. Announcement
- Open a release announcement issue summarizing highlights.
- Pin announcement.
- Optionally create a discussion post in "Announcements" category.

### 8. Archive & Schedule
- Archive audit/milestone artifacts under .github/audits/.
- Commit archive to repo.
- Schedule next audit with new GitHub issue.

---

## GUARANTEES

- **Sequential correctness**: Version bump and tag always follow previous release in proper semantic order.
- **Consistency**: All references (README, changelog, docs, release notes) match the current release number.
- **Audit trail**: Every release includes archived artifacts and linked milestone closure.
- **Automation ready**: Each phase can be executed as standalone or end-to-end without manual handoff.

---

## USAGE

When ready to release, invoke this prompt with:

```
Execute GitHub release workflow for milestone [MILESTONE_NAME]
Repository: [REPO_NAME]
Bump type: [major|minor|patch]
```

The system will execute all 8 phases in sequence, ensuring complete release integrity.

---

**Last Updated**: 2025-10-08
**Status**: Active Release System
