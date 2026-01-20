import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const whoItsFor = [
  'Executives evaluating Claude Code for their organization',
  'Technical leaders who need to advise the C-suite',
  'Team leads planning a safe, controlled rollout',
];

const artifacts = [
  { name: 'Executive briefing', desc: '1–2 pages explaining Claude Code in business terms' },
  { name: 'Rollout plan', desc: '2–4 week phased approach with approval gates' },
  { name: 'First use-case shortlist', desc: 'Ranked by ROI and risk for your context' },
  { name: 'Team enablement plan', desc: 'Who does what, when, and how to train them' },
  { name: 'Security checklist', desc: 'Permissions, data handling, and governance basics' },
];

const packages = [
  {
    name: 'Executive Onramp',
    duration: '60–90 minutes',
    description: 'A focused session to get you from zero to decision-ready.',
    deliverables: ['Executive briefing', 'Rollout plan outline', 'Use-case prioritization'],
    ideal: 'Leaders who need clarity before committing resources',
    featured: true,
  },
  {
    name: 'Leadership Workshop',
    duration: 'Half day',
    description: 'Align your leadership team on strategy, governance, and first steps.',
    deliverables: ['Full rollout roadmap', 'Governance framework', 'Team alignment session'],
    ideal: 'Organizations with multiple stakeholders to align',
    featured: false,
  },
  {
    name: 'Team Enablement',
    duration: '2–3 hours',
    description: 'Get your operators started with hands-on fundamentals.',
    deliverables: ['Hands-on training', 'Best practices guide', 'Q&A with your team'],
    ideal: 'Teams ready to start using Claude Code',
    featured: false,
  },
];

const agenda = [
  { time: '0–15 min', item: 'Context gathering — your stack, team, and goals' },
  { time: '15–40 min', item: 'Claude Code explained — capabilities, limits, and how it works' },
  { time: '40–60 min', item: 'Your use cases — prioritized by ROI and risk' },
  { time: '60–75 min', item: 'Rollout planning — phases, guardrails, and team structure' },
  { time: '75–90 min', item: 'Q&A and next steps' },
];

export default function LearnOfferings() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      {/* Who It's For */}
      <section className="py-16 bg-zinc-950 border-t border-zinc-800/60" ref={ref}>
        <div className="container mx-auto px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2 font-bold text-zinc-50 mb-6 text-center">
              Who This Is For
            </h2>
            <ul className="space-y-4">
              {whoItsFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-zinc-500 mt-1">→</span>
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-zinc-500 mt-6 text-sm">
              Common pain: You've heard the hype, but you're not sure what's real, what's risky, or where to start.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What You Walk Away With */}
      <section className="py-16 bg-zinc-900 border-t border-zinc-800/60">
        <div className="container mx-auto px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-h2 font-bold text-zinc-50 mb-8 text-center">
              What You Walk Away With
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {artifacts.map((artifact, index) => (
                <motion.div
                  key={artifact.name}
                  className="flex items-start gap-3 p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <span className="text-green-500 mt-0.5">✓</span>
                  <div>
                    <p className="text-zinc-200 font-medium">{artifact.name}</p>
                    <p className="text-sm text-zinc-500">{artifact.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agenda */}
      <section className="py-16 bg-zinc-950 border-t border-zinc-800/60">
        <div className="container mx-auto px-8">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-h2 font-bold text-zinc-50 mb-8 text-center">
              Executive Onramp Agenda
            </h2>
            <div className="space-y-3">
              {agenda.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <span className="text-xs text-zinc-500 font-mono w-20 flex-shrink-0 pt-1">
                    {step.time}
                  </span>
                  <span className="text-zinc-300">{step.item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-20 bg-zinc-900 border-t border-zinc-800/60">
        <div className="container mx-auto px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-h1 font-bold text-zinc-50 mb-4">
              Session Options
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Choose the depth that fits your needs. All sessions include follow-up notes and async Q&A.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                className={`card-slate flex flex-col h-full ${pkg.featured ? 'ring-2 ring-zinc-200' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                {pkg.featured && (
                  <span className="text-xs font-semibold text-zinc-900 bg-zinc-200 px-2 py-1 rounded mb-4 self-start">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-zinc-50 mb-1">{pkg.name}</h3>
                <p className="text-sm text-zinc-500 mb-3">{pkg.duration}</p>
                <p className="text-sm text-zinc-400 mb-4">{pkg.description}</p>
                <ul className="space-y-2 flex-1 mb-4">
                  {pkg.deliverables.map((item) => (
                    <li key={item} className="text-sm text-zinc-400 flex items-start gap-2">
                      <span className="text-zinc-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-zinc-500 mb-4">
                  <span className="font-medium">Ideal for:</span> {pkg.ideal}
                </p>
                <a
                  href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
                  target="_blank"
                  rel="noopener"
                  className={`w-full text-center py-2 px-4 rounded-lg font-medium transition-smooth ${
                    pkg.featured
                      ? 'bg-zinc-200 text-zinc-900 hover:bg-zinc-50'
                      : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                  }`}
                >
                  Book Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
