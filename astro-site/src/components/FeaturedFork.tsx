import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function FeaturedFork() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-zinc-900 border-t border-zinc-800/60" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 block">
                  Open Source Contribution
                </span>
                <h3 className="text-xl font-bold text-zinc-50 mb-2">
                  Blueprint Docs
                </h3>
                <p className="text-zinc-400 mb-4">
                  Enterprise-grade AI documentation generator with 22 professional templates.
                  PRD, Architecture, Tasks, Risk Management - zero setup required for Claude Code and Cursor IDE.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Claude Code', 'Cursor IDE', '22 Templates', 'PRD', 'Architecture'].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://github.com/intent-solutions-io/intent-blueprint-docs"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500/20 border border-indigo-500/40 rounded-lg text-indigo-200 hover:bg-indigo-500/30 hover:text-indigo-100 transition-smooth font-medium"
                >
                  View on GitHub
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
