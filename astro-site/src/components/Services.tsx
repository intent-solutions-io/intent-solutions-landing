import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: 'ai workflow automation',
      description: 'n8n workflows, claude api integration, custom automation systems that eliminate manual processes',
    },
    {
      title: 'rapid prototyping',
      description: 'full-stack react/typescript applications deployed in days, not months. get to market fast.',
    },
    {
      title: 'enterprise data systems',
      description: 'bigquery architecture, firebase/firestore backends, scalable cloud infrastructure',
    },
    {
      title: 'ai agents & rag',
      description: 'custom ai agents, local rag systems, knowledge graphs with neo4j, intelligent document processing',
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
