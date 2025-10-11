/**
 * HUSTLE Survey - Form Data Restoration Utility
 *
 * Restores form field values from sessionStorage when users navigate
 * back to previous sections.
 *
 * Supports:
 * - Radio buttons (single selection)
 * - Checkboxes (multiple selections)
 * - Text inputs
 * - Email/phone inputs
 * - Textareas
 */

export function restoreSurveySection(sectionNumber: number): void {
  const sectionKey = `survey_section_${sectionNumber}`;
  const sectionData = sessionStorage.getItem(sectionKey);

  if (!sectionData) {
    console.log(`No saved data found for section ${sectionNumber}`);
    return;
  }

  try {
    const data = JSON.parse(sectionData);
    let restoredCount = 0;

    console.log(`Restoring section ${sectionNumber} data:`, data);

    // Iterate through all saved fields
    Object.entries(data).forEach(([fieldName, fieldValue]) => {
      if (Array.isArray(fieldValue)) {
        // Handle checkbox arrays (multiple selections)
        fieldValue.forEach((value: any) => {
          const checkbox = document.querySelector(
            `input[type="checkbox"][name="${fieldName}"][value="${value}"]`
          ) as HTMLInputElement;

          if (checkbox) {
            checkbox.checked = true;
            restoredCount++;
          }
        });
      } else if (typeof fieldValue === 'string' && fieldValue !== '') {
        // Try to find and restore radio button
        const radio = document.querySelector(
          `input[type="radio"][name="${fieldName}"][value="${fieldValue}"]`
        ) as HTMLInputElement;

        if (radio) {
          radio.checked = true;
          restoredCount++;
        } else {
          // If not a radio, try text input, email, tel, or textarea
          const input = document.querySelector(
            `input[name="${fieldName}"], textarea[name="${fieldName}"]`
          ) as HTMLInputElement | HTMLTextAreaElement;

          if (input) {
            input.value = fieldValue;
            restoredCount++;
          }
        }
      }
    });

    if (restoredCount > 0) {
      console.log(`✅ Restored ${restoredCount} field(s) for section ${sectionNumber}`);

      // Optional: Show visual feedback to user
      showRestorationNotice(restoredCount);
    } else {
      console.log(`⚠️ No fields were restored for section ${sectionNumber}`);
    }
  } catch (error) {
    console.error(`Error restoring section ${sectionNumber}:`, error);
  }
}

/**
 * Show a brief visual notification that data was restored
 */
function showRestorationNotice(count: number): void {
  // Create a subtle toast notification
  const toast = document.createElement('div');
  toast.textContent = `✅ ${count} previous answer${count === 1 ? '' : 's'} restored`;
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: rgb(39 39 42);
    border: 1px solid rgb(161 161 170);
    color: rgb(228 228 231);
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Check if a section has saved data
 */
export function hasSavedData(sectionNumber: number): boolean {
  const sectionData = sessionStorage.getItem(`survey_section_${sectionNumber}`);
  return sectionData !== null;
}

/**
 * Get all completed sections
 */
export function getCompletedSections(): number[] {
  const completed: number[] = [];

  for (let i = 1; i <= 15; i++) {
    if (hasSavedData(i)) {
      completed.push(i);
    }
  }

  return completed;
}
