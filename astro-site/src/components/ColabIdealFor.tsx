import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const idealFor = [
  {
    title: 'Agencies',
    description: 'Need AI implementation muscle for client projects? I can be your technical bench.',
    icon: '🏢',
  },
  {
    title: 'Founders',
    description: "Have a vision but need a technical partner who can actually build? Let's talk.",
    icon: '💡',
  },
  {
    title: 'Companies',
    description: 'Exploring AI but lacking internal expertise? I can bridge that gap.',
    icon: '🎯',
  },
];

const whatIBring = [
  {
    title: 'Full-Stack AI Implementation',
    description: 'Not just prompts — production systems that actually work.',
  },
  {
    title: 'GCP/Vertex Infrastructure',
    description: 'Enterprise-grade cloud architecture built for scale.',
  },
  {
    title: '15+ Years Ops Experience',
    description: 'Operational discipline from the trenches. I ship.',
  },
  {
    title: '258+ Claude Code Plugins',
    description: 'Deep expertise in AI tooling and developer workflows.',
  },
];

export default function ColabIdealFor() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-zinc-900 border-t border-zinc-800/60" ref={ref}>
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          {/* Ideal For Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h1 font-bold text-zinc-50 mb-4">
              Is This You?
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Colab works best when both sides bring something to the table.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {idealFor.map((item, index) => (
              <motion.div
                key={item.title}
                className="card-slate text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-zinc-50 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* What I Bring Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-h2 font-bold text-zinc-50 mb-4">
              What I Bring to the Table
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {whatIBring.map((item, index) => (
              <motion.div
                key={item.title}
                className="flex items-start gap-4 p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-lg"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <span className="text-zinc-600 mt-1">✓</span>
                <div>
                  <h3 className="text-zinc-50 font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-zinc-400 mb-4">
              Sound like a fit? Let's explore what we could build together.
            </p>
            <a
              href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
              target="_blank"
              rel="noopener"
              className="btn-primary"
            >
              Schedule a Partnership Call
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
