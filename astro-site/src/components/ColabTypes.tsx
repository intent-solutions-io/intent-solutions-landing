import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const engagementModes = [
  {
    name: 'Delivery Sprint',
    duration: '2–4 weeks',
    description: 'Focused implementation sprint with a defined scope and deliverable.',
    deliverables: ['Claude Code repo setup', 'Custom plugins or workflows', 'CI/CD guardrails', 'Handoff documentation'],
    ideal: 'Teams with a specific project or use case to ship',
    featured: true,
  },
  {
    name: 'Monthly Cadence',
    duration: 'Ongoing',
    description: 'Continuous delivery partnership with regular shipping cycles.',
    deliverables: ['Bi-weekly PRs and reviews', 'Iteration on feedback', 'Ongoing maintenance', 'Priority support'],
    ideal: 'Teams building out Claude Code capabilities over time',
    featured: false,
  },
  {
    name: 'Advisory',
    duration: 'As needed',
    description: 'Strategic guidance and code review without hands-on implementation.',
    deliverables: ['Architecture review', 'Code audits', 'Best practices guidance', 'Async support'],
    ideal: 'Teams with internal devs who need expert direction',
    featured: false,
  },
];

const deliverables = [
  { name: 'Claude Code repo setup', desc: 'CLAUDE.md, hooks, permissions, and project structure' },
  { name: 'Custom plugins and skills', desc: 'Tailored to your workflows and team needs' },
  { name: 'CI/CD guardrails', desc: 'Human approval gates, test suites, and safety checks' },
  { name: 'Agent implementations', desc: 'Vertex AI / ADK agents for automation' },
  { name: 'Deployment runbooks', desc: 'Step-by-step guides for your ops team' },
  { name: 'Handoff documentation', desc: 'Everything your team needs to maintain it' },
];

const processSteps = [
  { step: '1', title: 'Intake', desc: 'Understand your stack, goals, and constraints' },
  { step: '2', title: 'Plan', desc: 'Define scope, milestones, and success criteria' },
  { step: '3', title: 'Build', desc: 'PRs in your repo with human review at every step' },
  { step: '4', title: 'Test', desc: 'Automated tests, manual QA, and edge case validation' },
  { step: '5', title: 'Deploy', desc: 'Ship to production with monitoring in place' },
];

export default function ColabTypes() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      {/* Engagement Modes */}
      <section id="engagements" className="py-20 bg-zinc-950 border-t border-zinc-800/60" ref={ref}>
        <div className="container mx-auto px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h1 font-bold text-zinc-50 mb-4">
              Engagement Options
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Choose the depth that fits your needs. All engagements include human approval on every PR.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {engagementModes.map((mode, index) => (
              <motion.div
                key={mode.name}
                className={`card-slate flex flex-col h-full ${mode.featured ? 'ring-2 ring-zinc-200' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {mode.featured && (
                  <span className="text-xs font-semibold text-zinc-900 bg-zinc-200 px-2 py-1 rounded mb-4 self-start">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-zinc-50 mb-1">{mode.name}</h3>
                <p className="text-sm text-zinc-500 mb-3">{mode.duration}</p>
                <p className="text-sm text-zinc-400 mb-4">{mode.description}</p>
                <ul className="space-y-2 flex-1 mb-4">
                  {mode.deliverables.map((item) => (
                    <li key={item} className="text-sm text-zinc-400 flex items-start gap-2">
                      <span className="text-zinc-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-zinc-500 mb-4">
                  <span className="font-medium">Ideal for:</span> {mode.ideal}
                </p>
                <a
                  href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
                  target="_blank"
                  rel="noopener"
                  className={`w-full text-center py-2 px-4 rounded-lg font-medium transition-smooth ${
                    mode.featured
                      ? 'bg-zinc-200 text-zinc-900 hover:bg-zinc-50'
                      : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-16 bg-zinc-900 border-t border-zinc-800/60">
        <div className="container mx-auto px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-h2 font-bold text-zinc-50 mb-8 text-center">
              What We Deliver
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {deliverables.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="flex items-start gap-3 p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <span className="text-green-500 mt-0.5">✓</span>
                  <div>
                    <p className="text-zinc-200 font-medium">{item.name}</p>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-zinc-950 border-t border-zinc-800/60">
        <div className="container mx-auto px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-h2 font-bold text-zinc-50 mb-8 text-center">
              How We Work
            </h2>
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-400">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-zinc-200 font-medium">{step.title}</h3>
                    <p className="text-sm text-zinc-500">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
