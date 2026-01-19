import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const colabTypes = [
  {
    title: 'Joint Ventures',
    description: 'Partner on product builds where we both have skin in the game. Shared risk, shared reward.',
    icon: '🤝',
    examples: ['SaaS products', 'AI-powered tools', 'Platform plays'],
  },
  {
    title: 'White-Label Solutions',
    description: 'Need AI capabilities for your agency or product? I build, you brand and sell.',
    icon: '🏷️',
    examples: ['Custom AI assistants', 'Automation workflows', 'Client deliverables'],
  },
  {
    title: 'Revenue Share',
    description: 'I build the tech, you bring the distribution. We split the upside.',
    icon: '📈',
    examples: ['Course platforms', 'Membership sites', 'Productized services'],
  },
  {
    title: 'Technical Co-Founding',
    description: "Have a vision but need a technical partner? Let's build your company together.",
    icon: '🚀',
    examples: ['Early-stage startups', 'MVP development', 'Technical leadership'],
  },
  {
    title: 'Open Source',
    description: 'Contributing to projects that matter. Currently maintaining 258+ Claude Code plugins.',
    icon: '💻',
    examples: ['Claude Code ecosystem', 'AI tooling', 'Developer tools'],
  },
];

export default function ColabTypes() {
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
            Ways to Work Together
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Not looking for a vendor. Looking for a partner.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {colabTypes.map((type, index) => (
            <motion.div
              key={type.title}
              className="card-slate"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-3xl mb-4">{type.icon}</div>
              <h3 className="text-lg font-semibold text-zinc-50 mb-2">
                {type.title}
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                {type.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {type.examples.map((example) => (
                  <span
                    key={example}
                    className="text-xs px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded text-zinc-500"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
