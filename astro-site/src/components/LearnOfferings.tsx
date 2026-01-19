import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const offerings = [
  {
    title: '1:1 Coaching',
    description: 'Personalized sessions tailored to your stack and goals. Pair program on real problems with live debugging.',
    icon: '👨‍🏫',
    features: ['Custom curriculum', 'Async support between sessions', 'Recording included'],
  },
  {
    title: 'Live Workshops',
    description: 'Team training sessions covering Claude Code fundamentals to advanced plugin development.',
    icon: '🎯',
    features: ['For teams of 3-20', 'Hands-on exercises', 'Custom to your stack'],
  },
  {
    title: 'Code Reviews',
    description: 'Get expert feedback on your Claude Code setup, plugins, and CLAUDE.md configurations.',
    icon: '🔍',
    features: ['Written feedback', 'Video walkthrough', 'Priority recommendations'],
  },
  {
    title: 'Plugin Development',
    description: 'Learn to build production-grade plugins with hooks, agents, and MCP integrations.',
    icon: '🔌',
    features: ['Build real plugins', 'Publish to marketplace', 'Ongoing support'],
  },
  {
    title: 'GCP / Vertex AI',
    description: 'Master Vertex AI, Agent Engine, and cloud-native AI infrastructure.',
    icon: '☁️',
    features: ['Production patterns', 'Cost optimization', 'Security best practices'],
  },
];

export default function LearnOfferings() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-zinc-950 border-t border-zinc-800/60" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h1 font-bold text-zinc-50 mb-4">
            Training Options
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            From quick sessions to ongoing mentorship. Choose what fits your learning style.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.title}
              className="card-slate"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-3xl mb-4">{offering.icon}</div>
              <h3 className="text-lg font-semibold text-zinc-50 mb-2">
                {offering.title}
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                {offering.description}
              </p>
              <ul className="space-y-2">
                {offering.features.map((feature) => (
                  <li key={feature} className="text-xs text-zinc-500 flex items-center gap-2">
                    <span className="text-zinc-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-zinc-400 mb-4">
            Not sure which is right for you?
          </p>
          <a
            href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
            target="_blank"
            rel="noopener"
            className="btn-primary"
          >
            Book a Free 15-Min Chat
          </a>
        </motion.div>
      </div>
    </section>
  );
}
