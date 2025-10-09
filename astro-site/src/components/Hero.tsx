import { motion } from 'framer-motion';

export default function Hero() {
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
          <motion.h1
            className="text-hero font-extrabold text-zinc-50 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            creating industries<br />that don't exist
          </motion.h1>

          <motion.p
            className="text-lg text-zinc-500 mb-6"
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
            </a>
          </motion.p>

          <motion.p
            className="text-body-lg text-zinc-400 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            independent ai consultant building automation systems and shipping real products.
            from automotive diagnostics to youth sports tracking.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#products" className="btn-primary">
              view my work
            </a>
            <a href="/survey" className="px-6 py-3 text-sm bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-all duration-200">
              HUSTLE Survey →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
