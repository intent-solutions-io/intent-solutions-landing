import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Products() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const products = [
    {
      name: 'diagnosticpro',
      description: 'live automotive ai diagnostic platform. vertex ai + firebase/firestore backend processing real customer diagnostics.',
      badge: 'typescript • react • vertex ai',
      link: 'https://diagnosticpro.io',
    },
    {
      name: 'vibe prd ⭐ 15 stars',
      description: 'ai-powered documentation generator transforming ideas into enterprise-ready docs in 5 minutes. used by developers worldwide.',
      badge: 'python • claude api • cli',
      link: 'https://github.com/jeremylongshore/vibe-prd',
    },
    {
      name: 'hustle',
      description: 'youth sports tracking app for competitive families. currently in research phase - validating with parent surveys.',
      badge: 'next.js • postgresql • research',
      link: null,
    },
  ];

  return (
    <section id="products" className="py-24 bg-zinc-900" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.h2
          className="text-h1 font-bold text-zinc-50 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          products i've shipped
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="card-slate"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-zinc-50 mb-3">
                {product.name}
              </h3>
              <p className="text-zinc-400 mb-4 text-sm leading-relaxed">
                {product.description}
              </p>
              <span className="inline-block px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded border border-zinc-700">
                {product.badge}
              </span>
              {product.link && (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-zinc-200 text-sm hover:text-zinc-50 transition-smooth"
                >
                  view project →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
