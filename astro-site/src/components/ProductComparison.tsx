import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Feature {
  name: string;
  description: string;
  m1: boolean | string;
  m2: boolean | string;
  m3: boolean | string;
  privateAI: boolean | string;
}

const features: Feature[] = [
  {
    name: 'Custom IAM Agents',
    description: 'Customized Intent Agent Models for your workflow',
    m1: '1 agent',
    m2: '2-3 agents',
    m3: '4+ agents',
    privateAI: false,
  },
  {
    name: 'Model-Agnostic',
    description: 'Works with Claude, GPT, Gemini, Llama, etc.',
    m1: true,
    m2: true,
    m3: true,
    privateAI: true,
  },
  {
    name: 'Private Infrastructure',
    description: 'Runs on your cloud (GCP, AWS, Azure)',
    m1: false,
    m2: false,
    m3: true,
    privateAI: true,
  },
  {
    name: 'RAG Integration',
    description: 'Connect to your knowledge base',
    m1: 'Basic',
    m2: 'Advanced',
    m3: 'Full custom',
    privateAI: 'Full custom',
  },
  {
    name: 'API Integrations',
    description: 'Connect to CRM, email, databases',
    m1: '2-3 APIs',
    m2: '5-8 APIs',
    m3: 'Unlimited',
    privateAI: 'Unlimited',
  },
  {
    name: 'Vertex AI Ready',
    description: 'Production-grade security on Google Cloud',
    m1: false,
    m2: true,
    m3: true,
    privateAI: true,
  },
  {
    name: 'n8n Orchestration',
    description: 'Visual workflow automation',
    m1: false,
    m2: true,
    m3: true,
    privateAI: false,
  },
  {
    name: 'HIPAA Compliance',
    description: 'Healthcare-ready deployment',
    m1: false,
    m2: false,
    m3: 'Add-on',
    privateAI: true,
  },
  {
    name: 'Custom UI/UX',
    description: 'Branded frontend experience',
    m1: false,
    m2: false,
    m3: true,
    privateAI: true,
  },
  {
    name: 'Deployment Time',
    description: 'Average time from start to production',
    m1: '2-3 weeks',
    m2: '3-5 weeks',
    m3: '6-8 weeks',
    privateAI: '4-6 weeks',
  },
  {
    name: 'Starting Price',
    description: 'Base monthly subscription (usage separate)',
    m1: '$497/mo',
    m2: '$997/mo',
    m3: '$1,997/mo',
    privateAI: '$1,497/mo',
  },
];

export default function ProductComparison() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [highlightedColumn, setHighlightedColumn] = useState<string | null>(null);

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-accent">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      ) : (
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full"
          style={{ backgroundColor: 'rgba(var(--color-text-tertiary), 0.2)' }}
        >
          <svg
            className="w-4 h-4"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      );
    }
    return (
      <span
        className="text-sm font-semibold"
        style={{ color: 'rgb(var(--color-text-primary))' }}
      >
        {value}
      </span>
    );
  };

  return (
    <section
      ref={ref}
      className="py-24 border-y relative overflow-hidden"
      style={{
        backgroundColor: 'rgb(var(--color-bg-primary))',
        borderColor: 'rgba(var(--color-accent-primary), 0.15)',
      }}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-h1 font-bold mb-4"
            style={{ color: 'rgb(var(--color-text-primary))' }}
          >
            choose your build path
          </h2>
          <p
            className="text-body-lg max-w-2xl mx-auto"
            style={{ color: 'rgb(var(--color-text-secondary))' }}
          >
            Compare IAM packages and Private AI infrastructure to find the right fit for your workflow.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto overflow-x-auto"
        >
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div></div>
              {['IAM M1', 'IAM M2', 'IAM M3', 'Private AI'].map((product, index) => (
                <motion.div
                  key={product}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  onMouseEnter={() => setHighlightedColumn(product)}
                  onMouseLeave={() => setHighlightedColumn(null)}
                  className={`card-slate text-center p-4 transition-all ${
                    highlightedColumn === product ? 'transform scale-105' : ''
                  }`}
                  style={{
                    backgroundColor:
                      highlightedColumn === product
                        ? 'rgba(var(--color-accent-primary), 0.1)'
                        : undefined,
                  }}
                >
                  <h3
                    className="font-bold mb-2"
                    style={{ color: 'rgb(var(--color-text-primary))' }}
                  >
                    {product}
                  </h3>
                  {product === 'IAM M3' && (
                    <span
                      className="inline-block px-2 py-1 text-xs font-semibold rounded"
                      style={{
                        backgroundColor: 'rgba(var(--color-accent-primary), 0.2)',
                        color: 'rgb(var(--color-accent-primary))',
                      }}
                    >
                      Most Popular
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Feature Rows */}
            <div className="space-y-2">
              {features.map((feature, featureIndex) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + featureIndex * 0.05 }}
                  className="grid grid-cols-5 gap-4 items-center p-4 rounded-lg transition-all"
                  style={{
                    backgroundColor: 'rgba(var(--color-bg-secondary), 0.6)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(var(--color-accent-primary), 0.1)',
                  }}
                >
                  {/* Feature Name */}
                  <div>
                    <div
                      className="font-semibold text-sm mb-1"
                      style={{ color: 'rgb(var(--color-text-primary))' }}
                    >
                      {feature.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      {feature.description}
                    </div>
                  </div>

                  {/* M1 */}
                  <div
                    className={`flex items-center justify-center transition-all ${
                      highlightedColumn === 'IAM M1' ? 'transform scale-110' : ''
                    }`}
                  >
                    {renderFeatureValue(feature.m1)}
                  </div>

                  {/* M2 */}
                  <div
                    className={`flex items-center justify-center transition-all ${
                      highlightedColumn === 'IAM M2' ? 'transform scale-110' : ''
                    }`}
                  >
                    {renderFeatureValue(feature.m2)}
                  </div>

                  {/* M3 */}
                  <div
                    className={`flex items-center justify-center transition-all ${
                      highlightedColumn === 'IAM M3' ? 'transform scale-110' : ''
                    }`}
                  >
                    {renderFeatureValue(feature.m3)}
                  </div>

                  {/* Private AI */}
                  <div
                    className={`flex items-center justify-center transition-all ${
                      highlightedColumn === 'Private AI' ? 'transform scale-110' : ''
                    }`}
                  >
                    {renderFeatureValue(feature.privateAI)}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-5 gap-4 mt-6"
            >
              <div></div>
              <a href="/agents#m1" className="btn-primary text-center text-sm">
                Get M1
              </a>
              <a href="/agents#m2" className="btn-primary text-center text-sm">
                Get M2
              </a>
              <a href="/agents#m3" className="btn-primary text-center text-sm">
                Get M3
              </a>
              <a href="/private-ai" className="btn-primary text-center text-sm">
                Get Private AI
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-xs mt-8 max-w-3xl mx-auto"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          All packages include model-agnostic delivery (Claude, GPT, Gemini, Llama, Mistral, Qwen, fine-tunes, local models).
          Usage costs are passed through at provider rates with no markup. Custom configurations available.
        </motion.p>
      </div>
    </section>
  );
}
