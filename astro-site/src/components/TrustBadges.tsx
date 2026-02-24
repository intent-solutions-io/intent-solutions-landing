import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedCounter from './AnimatedCounter';

export default function TrustBadges() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      value: 48,
      suffix: 'hrs',
      label: 'avg deployment time',
      decimals: 0,
    },
    {
      value: 99.9,
      suffix: '%',
      label: 'uptime guarantee',
      decimals: 1,
    },
    {
      value: 9,
      suffix: '+',
      label: 'AI models supported',
      decimals: 0,
    },
    {
      value: 497,
      prefix: '$',
      suffix: '/mo',
      label: 'starting price',
      decimals: 0,
    },
  ];

  const badges = [
    {
      title: 'HIPAA Ready',
      description: 'Healthcare compliance',
    },
    {
      title: 'SOC 2',
      description: 'Security certified',
    },
    {
      title: 'Google Cloud',
      description: 'Partner network',
    },
    {
      title: 'Model Agnostic',
      description: 'No vendor lock-in',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 border-y"
      style={{
        backgroundColor: 'rgb(var(--color-bg-secondary))',
        borderColor: 'rgba(var(--color-accent-primary), 0.15)',
      }}
    >
      <div className="container mx-auto px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-2">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                  duration={2000}
                  className="font-mono text-3xl md:text-4xl font-bold text-gradient"
                />
              </div>
              <p
                className="text-xs uppercase tracking-wider"
                style={{ color: 'rgb(var(--color-text-secondary))' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="card-slate text-center p-4"
            >
              <h3
                className="text-sm font-semibold mb-1"
                style={{ color: 'rgb(var(--color-text-primary))' }}
              >
                {badge.title}
              </h3>
              <p
                className="text-xs"
                style={{ color: 'rgb(var(--color-text-secondary))' }}
              >
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
