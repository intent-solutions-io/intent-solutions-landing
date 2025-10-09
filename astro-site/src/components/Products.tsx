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
      name: 'ai devops documentation',
      description: 'ai-powered documentation generator. transform ideas into enterprise-ready docs in 5 minutes. 17 stars on github.',
      badge: 'javascript • claude api • automation',
      link: 'https://github.com/jeremylongshore/ai-devops-intent-solutions',
    },
    {
      name: 'HUSTLE',
      description: 'youth sports tracking app for competitive families. currently in research phase - validating with parent surveys.',
      badge: 'next.js • postgresql • research',
      link: '/survey',
    },
    {
      name: 'waygate mcp',
      description: 'foundational mcp server framework. secure, containerized model context protocol server for ai integrations.',
      badge: 'python • docker • security',
      link: 'https://github.com/jeremylongshore/waygate-mcp',
    },
    {
      name: 'disposable marketplace',
      description: 'instant marketplace creation for quote collection. csv-based reseller management with automated ranking. 2 stars.',
      badge: 'shell • automation • n8n',
      link: 'https://github.com/jeremylongshore/disposable-marketplace-n8n',
    },
    {
      name: 'news pipeline',
      description: 'automated daily news monitoring and analysis pipeline. transform scattered news sources into organized intelligence.',
      badge: 'n8n • ai analysis • automation',
      link: 'https://github.com/jeremylongshore/news-pipeline-n8n',
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
