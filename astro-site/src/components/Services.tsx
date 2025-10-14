import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: 'automation programs',
      description:
        'Design and implement n8n, Netlify Functions, and Vertex AI workflows that replace manual reporting and onboarding tasks.',
    },
    {
      title: 'ai agents & rag systems',
      description:
        'Deploy Claude- and OpenAI-powered agents backed by your docs, vector stores, and safety rails so teams trust every recommendation.',
    },
    {
      title: 'data & infra foundations',
      description:
        'Architect BigQuery, Firebase, and Postgres pipelines with telemetry, access control, and monitoring baked in from day one.',
    },
    {
      title: 'launch-ready product builds',
      description:
        'Ship Astro + React experiences, surveys, and admin tools with coherent design systems, copy, and analytics instrumentation included.',
    },
  ];

  return (
    <section className="py-24 bg-gradient-main" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.h2
          className="text-h1 font-bold text-zinc-50 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          what i build
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="card-slate"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-zinc-50 mb-2">
                {service.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
