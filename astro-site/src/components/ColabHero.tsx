import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ColabHero() {
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
            Colab with Jeremy
          </h1>
          <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
            Build together. Ship together. Win together.
          </p>

          {/* Value prop */}
          <p className="text-lg text-zinc-500 mb-10 max-w-2xl mx-auto">
            Looking for a technical partner who can actually build, not just advise?
            Let's create something real.
          </p>

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
              Let's Talk Partnership
            </a>
            <a
              href="#contact"
              className="btn-secondary text-lg"
            >
              Send a Proposal
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
