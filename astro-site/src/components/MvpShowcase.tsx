import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MvpShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MvpShowcase({ isOpen, onClose }: MvpShowcaseProps) {
  // Trap focus and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Focus trap
    const focusableElements = document.querySelectorAll(
      '[data-modal] a, [data-modal] button'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);
    document.body.style.overflow = 'hidden';

    // Focus first element
    setTimeout(() => firstElement?.focus(), 100);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              data-modal
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-2xl bg-zinc-900 rounded-lg border border-zinc-800 shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="p-8 pt-12">
                <h2
                  id="modal-title"
                  className="text-2xl font-bold text-zinc-50 mb-4"
                >
                  example mvp: 3 containerized agents
                </h2>

                <p className="text-zinc-400 mb-6">
                  This is one starter configuration. We tailor agents to your stack, data, and
                  goals.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-zinc-200 flex-shrink-0" />
                    <div>
                      <h3 className="text-zinc-100 font-semibold mb-1">
                        outbound research + enrichment
                      </h3>
                      <p className="text-sm text-zinc-400">
                        Analyze closed deals, build ICP scoring, prioritize high-value leads.
                        Integrates with Apollo, Sales Navigator, HubSpot.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-zinc-200 flex-shrink-0" />
                    <div>
                      <h3 className="text-zinc-100 font-semibold mb-1">
                        meeting intelligence + notes to crm
                      </h3>
                      <p className="text-sm text-zinc-400">
                        Transcribe calls, extract action items, sync to CRM automatically. Works
                        with Zoom, Meet, Teams.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-zinc-200 flex-shrink-0" />
                    <div>
                      <h3 className="text-zinc-100 font-semibold mb-1">
                        support triage + knowledge search
                      </h3>
                      <p className="text-sm text-zinc-400">
                        Monitor tickets, draft responses, escalate urgent issues. Connects to
                        Zendesk, Intercom, Slack.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 mb-8">
                  <p className="text-sm text-zinc-300">
                    <strong className="text-zinc-100">Note:</strong> This is one example
                    configuration. We mix and match agents per client needs. Models and providers
                    are pluggable (Google, AWS, Azure, on-prem).
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/agents"
                    className="btn-primary text-sm"
                    onClick={onClose}
                  >
                    see agent options
                  </a>
                  <a
                    href="/learn/pricing"
                    className="inline-flex items-center text-zinc-200 hover:text-zinc-50 transition-smooth text-sm"
                    onClick={onClose}
                  >
                    how pricing works →
                  </a>
                  <a
                    href="/#contact"
                    className="inline-flex items-center text-zinc-200 hover:text-zinc-50 transition-smooth text-sm"
                    onClick={onClose}
                  >
                    discuss your use case →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
