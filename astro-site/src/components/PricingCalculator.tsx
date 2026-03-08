import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

const services: ServiceOption[] = [
  {
    id: 'iam-m1',
    name: 'IAM M1 Package',
    basePrice: 497,
    description: '1 customized Intent Agent Model',
  },
  {
    id: 'iam-m2',
    name: 'IAM M2 Package',
    basePrice: 997,
    description: '2-3 customized IAM agents',
  },
  {
    id: 'iam-m3',
    name: 'IAM M3 Package',
    basePrice: 1997,
    description: '4+ customized IAM agents (like PipelinePilot)',
  },
  {
    id: 'private-ai',
    name: 'Private AI Infrastructure',
    basePrice: 1497,
    description: 'ChatGPT-style experience on your cloud',
  },
  {
    id: 'automation',
    name: 'Automation Workflows',
    basePrice: 797,
    description: 'n8n + Netlify workflows',
  },
  {
    id: 'cloud',
    name: 'Cloud & Data Architecture',
    basePrice: 1297,
    description: 'Google Cloud-native setup',
  },
];

const usageOptions = [
  { value: 100, label: 'Light', description: '~100 API calls/day' },
  { value: 500, label: 'Standard', description: '~500 API calls/day' },
  { value: 2000, label: 'Heavy', description: '~2,000 API calls/day' },
  { value: 5000, label: 'Enterprise', description: '~5,000+ API calls/day' },
];

export default function PricingCalculator() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedService, setSelectedService] = useState<string>('iam-m1');
  const [usageLevel, setUsageLevel] = useState<number>(500);
  const [includeSupport, setIncludeSupport] = useState<boolean>(false);

  // Calculate estimated monthly usage cost (rough estimate)
  const usageCostPerCall = 0.002; // $0.002 per API call (average)
  const monthlyUsageCalls = usageLevel * 30;
  const usageCost = Math.round(monthlyUsageCalls * usageCostPerCall);

  // Get selected service
  const service = services.find((s) => s.id === selectedService);
  const basePrice = service?.basePrice || 0;

  // Support cost (20% of base)
  const supportCost = includeSupport ? Math.round(basePrice * 0.2) : 0;

  // Total monthly estimate
  const totalMonthly = basePrice + usageCost + supportCost;

  return (
    <section
      ref={ref}
      className="py-24 border-y"
      style={{
        backgroundColor: 'rgb(var(--color-bg-tertiary))',
        borderColor: 'rgba(var(--color-accent-primary), 0.15)',
      }}
    >
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className="text-h1 font-bold mb-4"
              style={{ color: 'rgb(var(--color-text-primary))' }}
            >
              estimate your investment
            </h2>
            <p
              className="text-body-lg max-w-2xl mx-auto"
              style={{ color: 'rgb(var(--color-text-secondary))' }}
            >
              Transparent pricing with no hidden fees. Base fee + usage pass-through + optional support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Configuration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Service Selection */}
              <div>
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: 'rgb(var(--color-text-primary))' }}
                >
                  Select Service
                </label>
                <div className="space-y-2">
                  {services.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => setSelectedService(svc.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedService === svc.id
                          ? 'border-[rgb(var(--color-accent-primary))] bg-gradient-glow'
                          : 'border-[rgba(var(--color-accent-primary),0.15)] hover:border-[rgba(var(--color-accent-primary),0.3)]'
                      }`}
                      style={{
                        backgroundColor:
                          selectedService === svc.id
                            ? 'rgba(var(--color-accent-primary), 0.1)'
                            : 'rgba(var(--color-bg-secondary), 0.6)',
                      }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span
                          className="font-semibold text-sm"
                          style={{ color: 'rgb(var(--color-text-primary))' }}
                        >
                          {svc.name}
                        </span>
                        <span
                          className="font-mono font-bold text-sm"
                          style={{ color: 'rgb(var(--color-accent-primary))' }}
                        >
                          ${svc.basePrice}/mo
                        </span>
                      </div>
                      <p
                        className="text-xs"
                        style={{ color: 'rgb(var(--color-text-secondary))' }}
                      >
                        {svc.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Usage Level */}
              <div>
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: 'rgb(var(--color-text-primary))' }}
                >
                  Expected Usage Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {usageOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setUsageLevel(option.value)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        usageLevel === option.value
                          ? 'border-[rgb(var(--color-accent-primary))] bg-gradient-glow'
                          : 'border-[rgba(var(--color-accent-primary),0.15)] hover:border-[rgba(var(--color-accent-primary),0.3)]'
                      }`}
                      style={{
                        backgroundColor:
                          usageLevel === option.value
                            ? 'rgba(var(--color-accent-primary), 0.1)'
                            : 'rgba(var(--color-bg-secondary), 0.6)',
                      }}
                    >
                      <div
                        className="font-semibold text-sm mb-1"
                        style={{ color: 'rgb(var(--color-text-primary))' }}
                      >
                        {option.label}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: 'rgb(var(--color-text-secondary))' }}
                      >
                        {option.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Support Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg border"
                style={{
                  backgroundColor: 'rgba(var(--color-bg-secondary), 0.6)',
                  borderColor: 'rgba(var(--color-accent-primary), 0.15)',
                }}
              >
                <div>
                  <div
                    className="font-semibold text-sm mb-1"
                    style={{ color: 'rgb(var(--color-text-primary))' }}
                  >
                    Priority Support
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'rgb(var(--color-text-secondary))' }}
                  >
                    24/7 support + SLA (20% of base)
                  </div>
                </div>
                <button
                  onClick={() => setIncludeSupport(!includeSupport)}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    includeSupport ? 'bg-gradient-accent' : 'bg-[rgb(var(--color-border))]'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      includeSupport ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </motion.div>

            {/* Right: Price Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-premium p-6 h-fit sticky top-8"
            >
              <h3
                className="text-lg font-bold mb-6"
                style={{ color: 'rgb(var(--color-text-primary))' }}
              >
                Monthly Estimate
              </h3>

              <div className="space-y-4 mb-6">
                {/* Base Price */}
                <div className="flex justify-between items-center pb-3 border-b"
                  style={{ borderColor: 'rgba(var(--color-accent-primary), 0.15)' }}
                >
                  <span
                    className="text-sm"
                    style={{ color: 'rgb(var(--color-text-secondary))' }}
                  >
                    Base subscription
                  </span>
                  <span
                    className="font-mono font-semibold"
                    style={{ color: 'rgb(var(--color-text-primary))' }}
                  >
                    ${basePrice}
                  </span>
                </div>

                {/* Usage Cost */}
                <div className="flex justify-between items-center pb-3 border-b"
                  style={{ borderColor: 'rgba(var(--color-accent-primary), 0.15)' }}
                >
                  <div>
                    <div
                      className="text-sm"
                      style={{ color: 'rgb(var(--color-text-secondary))' }}
                    >
                      Estimated usage
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      {monthlyUsageCalls.toLocaleString()} calls/month
                    </div>
                  </div>
                  <span
                    className="font-mono font-semibold"
                    style={{ color: 'rgb(var(--color-text-primary))' }}
                  >
                    ${usageCost}
                  </span>
                </div>

                {/* Support Cost */}
                {includeSupport && (
                  <div className="flex justify-between items-center pb-3 border-b"
                    style={{ borderColor: 'rgba(var(--color-accent-primary), 0.15)' }}
                  >
                    <span
                      className="text-sm"
                      style={{ color: 'rgb(var(--color-text-secondary))' }}
                    >
                      Priority support
                    </span>
                    <span
                      className="font-mono font-semibold"
                      style={{ color: 'rgb(var(--color-text-primary))' }}
                    >
                      ${supportCost}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-glow">
                <span
                  className="text-lg font-bold"
                  style={{ color: 'rgb(var(--color-text-primary))' }}
                >
                  Total Monthly
                </span>
                <span className="font-mono text-2xl font-bold text-gradient">
                  ${totalMonthly}
                </span>
              </div>

              {/* Disclaimer */}
              <p
                className="text-xs mt-4 leading-relaxed"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                * Usage costs are estimates based on average API pricing. Actual costs depend on
                your chosen model (Claude, GPT, Gemini, etc.) and usage patterns. We pass through
                costs at provider rates with no markup.
              </p>

              {/* CTA */}
              <a
                href="#contact"
                className="btn-primary w-full mt-6 text-center block"
              >
                Get Custom Quote
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
