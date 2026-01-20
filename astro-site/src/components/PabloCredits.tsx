import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function PabloCredits() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-zinc-950 border-t border-zinc-800/60" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-h2 font-bold text-zinc-50 mb-2">
              Community Contributions
            </h2>
            <p className="text-zinc-400">
              Projects originated by collaborators in our network
            </p>
          </div>

          <div className="card-slate">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="text-4xl">🍽️</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-zinc-50">
                    No-You-Pick
                  </h3>
                  <span className="text-xs px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-amber-300">
                    Created by Pablo Perez
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mb-4">
                  Restaurant finder app that solves the eternal question: "Where should we eat?"
                  Pablo had the vision and built the MVP - Intent Solutions polished it for production.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Firebase', 'Restaurant API'].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-zinc-800/50 border border-zinc-700/50 rounded text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://github.com/intent-solutions-io/No-You-Pick."
                  target="_blank"
                  rel="noopener"
                  className="text-sm text-zinc-300 hover:text-zinc-50 transition-smooth inline-flex items-center gap-2"
                >
                  View on GitHub
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-500 mt-8">
            Have a project idea? <a href="#contact" className="text-zinc-300 hover:text-zinc-50 transition-smooth">Let's build it together.</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
