import { motion } from 'framer-motion';

export default function Hero() {
  const focusAreas = [
    'automation programs that eliminate manual reporting',
    'ai agents and rag systems grounded in your data',
    'production-ready astro, react, and n8n launches',
  ];

  return (
    <section className="min-h-screen flex items-center bg-gradient-main relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute w-96 h-96 bg-zinc-100/5 rounded-full blur-3xl top-0 right-0 -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-8 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl"
        >
          <motion.p
            className="uppercase tracking-[0.3em] text-xs font-semibold text-zinc-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            ai systems that ship to production
          </motion.p>

          <motion.h1
            className="text-hero font-extrabold text-zinc-50 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            creating industries<br />that don't exist
          </motion.h1>

          <motion.p
            className="text-lg text-zinc-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a
              href="https://jeremylongshore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              jeremy_longshore
            </a>{' '}
            · independent ai consultant
          </motion.p>

          <motion.p
            className="text-body-lg text-zinc-400 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I build measurable automation, data, and agent workflows for operators who need real
            outcomes—faster onboarding, fewer spreadsheets, and launch-ready customer experiences.
          </motion.p>

          <motion.ul
            className="mb-10 space-y-3 text-zinc-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {focusAreas.map((area) => (
              <li key={area} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="mt-1 h-2 w-2 rounded-full bg-zinc-200" />
                <span>{area}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#contact" className="btn-primary">
              start a project
            </a>
            <a
              href="/survey"
              className="inline-flex items-center text-zinc-200 hover:text-zinc-50 transition-smooth"
            >
              view the hustle research survey →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
