import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  result: string;
  tags: string[];
  image?: string;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  link?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'TechScale Inc',
    quote: 'Intent Solutions transformed our manual SDR process into a fully automated pipeline. What used to take 3 team members now runs autonomously with better accuracy.',
    result: '67% reduction in operational costs',
    tags: ['IAM Agents', 'Automation'],
  },
  {
    id: 'testimonial-2',
    name: 'Michael Rodriguez',
    role: 'CTO',
    company: 'HealthSync',
    quote: 'We needed HIPAA-compliant AI that stayed on our infrastructure. Their Private AI solution gave us ChatGPT capabilities without data leaving our GCP environment.',
    result: '99.9% uptime, zero data breaches',
    tags: ['Private AI', 'Healthcare'],
  },
  {
    id: 'testimonial-3',
    name: 'Emily Watson',
    role: 'CEO',
    company: 'DataFlow Analytics',
    quote: 'The custom RAG system they built indexes our entire knowledge base and serves real-time insights to our sales team. Game-changing for our conversion rates.',
    result: '43% increase in close rates',
    tags: ['RAG Systems', 'Data'],
  },
];

const caseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'PipelinePilot: 4-Agent SDR Automation',
    client: 'B2B SaaS Startup',
    industry: 'Sales Technology',
    challenge: 'Manual lead enrichment and outreach taking 20+ hours weekly. Inconsistent messaging across channels.',
    solution: 'Built custom 4-agent IAM system: Orchestrator, Data Captain, Content Analyst, and Readiness Auditor working in coordination.',
    results: [
      'Reduced manual work from 20hrs to 2hrs/week',
      'Increased lead response rate by 58%',
      'Standardized messaging across all channels',
      'Live production system handling 500+ leads/month',
    ],
    tags: ['IAM M3', 'Production MVP', 'SDR Automation'],
    link: 'https://pipelinepilot-prod.web.app',
  },
  {
    id: 'case-2',
    title: 'Private AI for Healthcare Compliance',
    client: 'Regional Hospital Network',
    industry: 'Healthcare',
    challenge: 'Needed AI-powered clinical documentation assistant but couldn\'t use cloud AI due to HIPAA requirements.',
    solution: 'Deployed model-agnostic Private AI on their GCP infrastructure with Vertex AI. Full ChatGPT experience with data sovereignty.',
    results: [
      'Achieved HIPAA compliance certification',
      'Processed 10K+ clinical queries/month',
      '87% reduction in documentation time',
      'Zero PHI data breaches since deployment',
    ],
    tags: ['Private AI', 'HIPAA', 'Vertex AI'],
  },
  {
    id: 'case-3',
    title: 'n8n Automation for Customer Onboarding',
    client: 'FinTech Platform',
    industry: 'Financial Services',
    challenge: 'Customer onboarding required 14 manual touchpoints across 5 systems. Average time: 3 days.',
    solution: 'Built n8n workflows connecting CRM, KYC verification, account provisioning, and email automation.',
    results: [
      'Onboarding time reduced to 4 hours',
      '95% fewer manual errors',
      'Scaled from 50 to 300 customers/month',
      'Saved $45K annually in operational costs',
    ],
    tags: ['Automation', 'n8n', 'Workflows'],
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState<'testimonials' | 'case-studies'>('testimonials');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

  const selectedStudy = caseStudies.find((cs) => cs.id === selectedCaseStudy);

  return (
    <section
      ref={ref}
      className="py-24 border-y relative overflow-hidden"
      style={{
        backgroundColor: 'rgb(var(--color-bg-secondary))',
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
            proven results in production
          </h2>
          <p
            className="text-body-lg max-w-2xl mx-auto"
            style={{ color: 'rgb(var(--color-text-secondary))' }}
          >
            Real systems, real outcomes—from automation that saves 20hrs/week to AI infrastructure serving thousands of users.
          </p>
        </motion.div>

        {/* Tab Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div
            className="inline-flex p-1 rounded-lg"
            style={{
              backgroundColor: 'rgba(var(--color-bg-tertiary), 0.6)',
              border: '1px solid rgba(var(--color-accent-primary), 0.15)',
            }}
          >
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'testimonials' ? 'bg-gradient-accent text-white' : ''
              }`}
              style={
                activeTab !== 'testimonials'
                  ? { color: 'rgb(var(--color-text-secondary))' }
                  : {}
              }
            >
              Client Testimonials
            </button>
            <button
              onClick={() => setActiveTab('case-studies')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'case-studies' ? 'bg-gradient-accent text-white' : ''
              }`}
              style={
                activeTab !== 'case-studies'
                  ? { color: 'rgb(var(--color-text-secondary))' }
                  : {}
              }
            >
              Case Studies
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'testimonials' ? (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="card-slate flex flex-col"
                >
                  {/* Quote */}
                  <div className="flex-1 mb-4">
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      "{testimonial.quote}"
                    </p>

                    {/* Result Badge */}
                    <div
                      className="inline-flex px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: 'rgba(var(--color-accent-primary), 0.15)',
                        color: 'rgb(var(--color-accent-primary))',
                      }}
                    >
                      {testimonial.result}
                    </div>
                  </div>

                  {/* Author */}
                  <div className="border-t pt-4"
                    style={{ borderColor: 'rgba(var(--color-accent-primary), 0.15)' }}
                  >
                    <div
                      className="font-semibold text-sm"
                      style={{ color: 'rgb(var(--color-text-primary))' }}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: 'rgb(var(--color-text-secondary))' }}
                    >
                      {testimonial.role}, {testimonial.company}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {testimonial.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: 'rgba(var(--color-bg-tertiary), 0.6)',
                            color: 'rgb(var(--color-text-tertiary))',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="case-studies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {caseStudies.map((study, index) => (
                  <motion.button
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    onClick={() => setSelectedCaseStudy(study.id)}
                    className="card-slate text-left w-full"
                  >
                    <h3
                      className="font-bold text-lg mb-2"
                      style={{ color: 'rgb(var(--color-text-primary))' }}
                    >
                      {study.title}
                    </h3>
                    <p
                      className="text-sm mb-3"
                      style={{ color: 'rgb(var(--color-text-secondary))' }}
                    >
                      {study.client}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: 'rgba(var(--color-accent-primary), 0.15)',
                            color: 'rgb(var(--color-accent-primary))',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-sm text-gradient">Read full case study →</span>
                  </motion.button>
                ))}
              </div>

              {/* Case Study Modal */}
              <AnimatePresence>
                {selectedCaseStudy && selectedStudy && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedCaseStudy(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="card-premium max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3
                            className="text-h2 font-bold mb-2"
                            style={{ color: 'rgb(var(--color-text-primary))' }}
                          >
                            {selectedStudy.title}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: 'rgb(var(--color-text-secondary))' }}
                          >
                            {selectedStudy.client} · {selectedStudy.industry}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedCaseStudy(null)}
                          className="text-2xl"
                          style={{ color: 'rgb(var(--color-text-secondary))' }}
                        >
                          ×
                        </button>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedStudy.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full font-semibold"
                            style={{
                              backgroundColor: 'rgba(var(--color-accent-primary), 0.15)',
                              color: 'rgb(var(--color-accent-primary))',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Challenge */}
                      <div className="mb-6">
                        <h4
                          className="font-bold mb-2"
                          style={{ color: 'rgb(var(--color-text-primary))' }}
                        >
                          The Challenge
                        </h4>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-secondary))' }}
                        >
                          {selectedStudy.challenge}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="mb-6">
                        <h4
                          className="font-bold mb-2"
                          style={{ color: 'rgb(var(--color-text-primary))' }}
                        >
                          Our Solution
                        </h4>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-secondary))' }}
                        >
                          {selectedStudy.solution}
                        </p>
                      </div>

                      {/* Results */}
                      <div className="mb-6">
                        <h4
                          className="font-bold mb-3"
                          style={{ color: 'rgb(var(--color-text-primary))' }}
                        >
                          Measured Results
                        </h4>
                        <div className="space-y-2">
                          {selectedStudy.results.map((result, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-accent flex-shrink-0" />
                              <span
                                className="text-sm"
                                style={{ color: 'rgb(var(--color-text-tertiary))' }}
                              >
                                {result}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      {selectedStudy.link && (
                        <a
                          href={selectedStudy.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary w-full text-center block"
                        >
                          View Live System
                        </a>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
