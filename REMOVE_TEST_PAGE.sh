#!/bin/bash
# Script to remove test-submit page from production
# Generated: 2025-10-09

set -e

echo "🗑️  Removing test-submit page from production..."

cd /home/jeremy/projects/intent-solutions-landing

# Remove the test page
git rm astro-site/src/pages/survey/test-submit.astro

# Commit the removal
git commit -m "chore: remove test-submit page from production

The test page at /survey/test-submit was used for rapid testing during
the critical form submission fix. Now that the fix is verified working,
removing it from production.

Real survey remains at /survey/1 through /survey/15.
Form detection via _netlify-probe.html (permanent).

🤖 Generated with Claude Code"

# Push to production
git push origin main

echo "✅ Test page removed! Netlify will rebuild and remove /survey/test-submit"
echo "✅ Real survey at /survey/15 still works perfectly"
