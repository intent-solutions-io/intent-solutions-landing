import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Products() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const products = [
    {
      name: 'Claude Code Plugins Hub',
      description:
        '227 plugins for Claude Code with Skills Powerkit for plugin management—197 GitHub stars, 26 forks, community-driven development.',
      badge: 'JavaScript • Open Source • 197★',
      link: 'https://github.com/jeremylongshore/claude-code-plugins-plus',
    },
    {
      name: 'DiagnosticPro',
      description:
        'Live automotive diagnostics for service centers—Vertex AI orchestrates triage while Firebase keeps technicians synced in real time.',
      badge: 'TypeScript • React • Vertex AI',
      link: 'https://diagnosticpro.io',
    },
    {
      name: 'StartAITools',
      description:
        'Technical research blog documenting real AI implementations, production systems, and practical development guides for engineers.',
      badge: 'Hugo • Technical Writing • Education',
      link: 'https://startaitools.com',
    },
    {
      name: "Bob's Brain",
      description:
        'Collaborative AI assistant with Slack integration—Google Gemini 2.5 Flash, Neo4j knowledge graphs, BigQuery analytics, Cloud Run deployment.',
      badge: 'Python • Gemini • Neo4j',
      link: 'https://github.com/jeremylongshore/bobs-brain',
    },
    {
      name: 'AI DevOps Documentation',
      description:
        'Claude-powered runbook generator that ships enterprise-ready docs in minutes; teams deploy it to unblock audits and handoffs.',
      badge: 'JavaScript • Claude API • 19★',
      link: 'https://github.com/jeremylongshore/ai-devops-intent-solutions',
    },
    {
      name: 'Waygate MCP',
      description:
        'Secure Model Context Protocol server that drops into enterprise stacks so operators can run AI agents with container isolation.',
      badge: 'Python • Docker • Security',
      link: 'https://github.com/jeremylongshore/waygate-mcp',
    },
    {
      name: 'HUSTLE',
      description:
        'Youth sports performance tracking backed by a 76-question parent research study—now collecting beta testers via Netlify forms.',
      badge: 'Next.js • PostgreSQL • Research',
      link: '/survey',
    },
    {
      name: 'News Pipeline',
      description:
        'Automated monitoring that converts daily news into structured intelligence briefs for decision makers.',
      badge: 'n8n • AI Analysis • 4★',
      link: 'https://github.com/jeremylongshore/news-pipeline-n8n',
    },
    {
      name: 'Disposable Marketplace',
      description:
        'Instant micro-marketplaces for manufacturers to collect quotes—CSV-driven inventory, ranked responses, zero custom CMS required.',
      badge: 'Shell • n8n • Automation',
      link: 'https://github.com/jeremylongshore/disposable-marketplace-n8n',
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
