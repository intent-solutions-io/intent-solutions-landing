#!/bin/bash
# Script to add data restoration to all HUSTLE Survey pages
# This fixes the issue where form data isn't restored when navigating back

ASTRO_SURVEY_DIR="/home/jeremy/projects/intent-solutions-landing/astro-site/src/pages/survey"

echo "🔧 Updating HUSTLE Survey pages with data restoration..."
echo ""

# Update sections 3-15 (1 and 2 already updated manually)
for section in {3..15}; do
  file="${ASTRO_SURVEY_DIR}/${section}.astro"

  if [ ! -f "$file" ]; then
    echo "⚠️  File not found: ${file}"
    continue
  fi

  echo "Processing survey/${section}.astro..."

  # Check if already has the import
  if grep -q "import { restoreSurveySection }" "$file"; then
    echo "  ✅ Already updated"
    continue
  fi

  # Find the line with <script> and add import + restoration call
  # This uses a more precise sed command
  sed -i '/<script>/a\    import { restoreSurveySection } from '\''../../utils/surveyRestore'\'';' "$file"

  # Add restoration call after consent check
  # Look for the consent check and add restoration after the return
  sed -i '/window.location.href = .*\/survey\/1.*;/a\      }\n\n      // Restore previously saved data for this section\n      restoreSurveySection('"$section"');' "$file"

  echo "  ✅ Updated"
done

echo ""
echo "✅ All survey pages updated!"
echo ""
echo "Next steps:"
echo "1. Test locally: cd astro-site && npm run dev"
echo "2. Navigate through survey sections"
echo "3. Click 'back' button and verify fields are populated"
echo "4. Check browser console for restoration logs"
