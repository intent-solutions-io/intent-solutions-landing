import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function LearnHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-zinc-900" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-hero font-bold text-zinc-50 mb-6">
            Learn with Jeremy
          </h1>
          <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
            Skip the tutorials that stop at "Hello World" — learn to build AI systems that actually ship to production.
          </p>

          {/* Credibility badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full text-sm text-zinc-300">
              227+ plugins created
            </div>
            <div className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full text-sm text-zinc-300">
              15+ years ops experience
            </div>
            <div className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full text-sm text-zinc-300">
              Real production deployments
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
              target="_blank"
              rel="noopener"
              className="btn-primary text-lg"
            >
              Book a Learning Session
            </a>
            <a
              href="#contact"
              className="btn-secondary text-lg"
            >
              Ask a Question
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
