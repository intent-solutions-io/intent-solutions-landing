import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const tiers = [
  {
    name: 'Starter',
    target: 'Solo / Small Team',
    description: 'Get up and running with Claude Code fast',
    includes: [
      'Curated plugin pack for your stack',
      'Basic system setup and configuration',
      '1-hour training session',
      'Setup documentation',
    ],
  },
  {
    name: 'Growth',
    target: 'Growing Teams',
    description: 'Custom plugins and team-wide configuration',
    includes: [
      'Everything in Starter',
      'Custom plugin development (up to 3)',
      'Team workflow optimization',
      '4-hour training workshop',
      '30-day support',
    ],
    featured: true,
  },
  {
    name: 'Scale',
    target: 'Departments',
    description: 'Full system build with ongoing support',
    includes: [
      'Everything in Growth',
      'Complete system architecture',
      'Unlimited custom plugins',
      'Team training (up to 20 seats)',
      '90-day support + check-ins',
    ],
  },
  {
    name: 'Enterprise',
    target: 'Organization-wide',
    description: 'Custom everything with dedicated partnership',
    includes: [
      'Everything in Scale',
      'Ongoing retainer relationship',
      'Quarterly workshops',
      'Priority development queue',
      'White-label options available',
    ],
  },
];

export default function ClaudeCodeTiers() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="tiers" className="py-24 bg-zinc-950 border-t border-b border-zinc-800/50" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h1 font-bold text-zinc-50 mb-4">
            choose your setup
          </h2>
          <p className="text-zinc-400">
            From quick starts to enterprise partnerships—pick the level that matches your team.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`card-slate h-full flex flex-col ${
                tier.featured ? 'ring-2 ring-zinc-200' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {tier.featured && (
                <span className="text-xs font-semibold text-zinc-900 bg-zinc-200 px-2 py-1 rounded mb-4 self-start">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-zinc-50 mb-1">{tier.name}</h3>
              <p className="text-sm text-zinc-500 mb-3">{tier.target}</p>
              <p className="text-sm text-zinc-400 mb-6">{tier.description}</p>

              <ul className="space-y-2 flex-1 mb-6">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
                target="_blank"
                rel="noopener"
                className={`text-center py-3 px-4 rounded-lg font-medium transition-smooth ${
                  tier.featured
                    ? 'bg-zinc-200 text-zinc-900 hover:bg-zinc-50'
                    : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                }`}
              >
                Book a Discovery Call
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-zinc-500 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          All tiers include access to{' '}
          <a
            href="https://claudecodeplugins.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-zinc-50 transition-colors"
          >
            270+ open-source plugins
          </a>
        </motion.p>
      </div>
    </section>
  );
}
