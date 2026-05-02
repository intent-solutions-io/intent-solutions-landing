import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CYAN     = 'rgb(34 211 238)';
const CYAN_DIM = 'rgba(34,211,238,0.18)';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  result: string;
  tags: string[];
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
    challenge: "Needed AI-powered clinical documentation assistant but couldn't use cloud AI due to HIPAA requirements.",
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
    title: 'Workflow Automation for Customer Onboarding',
    client: 'FinTech Platform',
    industry: 'Financial Services',
    challenge: 'Customer onboarding required 14 manual touchpoints across 5 systems. Average time: 3 days.',
    solution: 'Built integration workflows connecting CRM, KYC verification, account provisioning, and email automation.',
    results: [
      'Onboarding time reduced to 4 hours',
      '95% fewer manual errors',
      'Scaled from 50 to 300 customers/month',
      'Saved $45K annually in operational costs',
    ],
    tags: ['Automation', 'Integration', 'Workflows'],
  },
];

const cardStyle: React.CSSProperties = {
  background: 'rgba(18,18,20,0.85)',
  border: '1px solid rgba(39,39,42,0.7)',
  borderRadius: '0.875rem',
  padding: '1.5rem',
  backdropFilter: 'blur(8px)',
};

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<'testimonials' | 'case-studies'>('testimonials');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

  const selectedStudy = caseStudies.find((cs) => cs.id === selectedCaseStudy);

  return (
    <section
      ref={ref}
      style={{
        padding: '6rem 0',
        background: 'rgb(9 9 11)',
        borderTop:    '1px solid rgba(39,39,42,0.5)',
        borderBottom: '1px solid rgba(39,39,42,0.5)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
            <span style={{ display: 'block', height: 1, width: '3.5rem', background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.2))' }} />
            <span style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: CYAN }}>
              Proven Results
            </span>
            <span style={{ display: 'block', height: 1, width: '3.5rem', background: 'linear-gradient(to left, transparent, rgba(34,211,238,0.2))' }} />
          </div>

          <h2 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: 'rgb(250 250 250)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
            proven results in production
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgb(113 113 122)', maxWidth: '36rem', margin: '0 auto' }}>
            Real systems, real outcomes — from automation that saves 20hrs/week to AI infrastructure serving thousands of users.
          </p>
        </motion.div>

        {/* Tab toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}
        >
          <div style={{ display: 'inline-flex', padding: '0.25rem', borderRadius: '0.5rem', background: 'rgba(9,9,11,0.7)', border: '1px solid rgba(39,39,42,0.6)' }}>
            {(['testimonials', 'case-studies'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s ease',
                  background:  activeTab === tab ? CYAN : 'transparent',
                  color:       activeTab === tab ? 'rgb(9 9 11)' : 'rgb(113 113 122)',
                }}
              >
                {tab === 'testimonials' ? 'Client Testimonials' : 'Case Studies'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'testimonials' ? (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * i }}
                  style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}
                >
                  {/* Quote */}
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgb(161 161 170)', marginBottom: '1rem', flex: 1 }}>
                    "{t.quote}"
                  </p>

                  {/* Result */}
                  <div style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '2rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: 'rgba(34,211,238,0.08)',
                    border: '1px solid rgba(34,211,238,0.2)',
                    color: CYAN,
                    marginBottom: '1.25rem',
                  }}>
                    {t.result}
                  </div>

                  {/* Author */}
                  <div style={{ borderTop: '1px solid rgba(39,39,42,0.6)', paddingTop: '1rem' }}>
                    <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '0.85rem', fontWeight: 600, color: 'rgb(228 228 231)', margin: '0 0 0.2rem' }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'rgb(82 82 91)', margin: '0 0 0.75rem' }}>
                      {t.role}, {t.company}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {t.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.18rem 0.5rem', borderRadius: '3px', background: 'rgba(39,39,42,0.5)', border: '1px solid rgba(63,63,70,0.5)', color: 'rgb(113 113 122)' }}>
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                {caseStudies.map((study, i) => (
                  <motion.button
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    onClick={() => setSelectedCaseStudy(study.id)}
                    style={{ ...cardStyle, textAlign: 'left', width: '100%', cursor: 'pointer', transition: 'border-color 0.25s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = CYAN_DIM)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(39,39,42,0.7)')}
                  >
                    <h3 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, color: 'rgb(228 228 231)', marginBottom: '0.4rem' }}>
                      {study.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'rgb(82 82 91)', marginBottom: '1rem' }}>
                      {study.client} · {study.industry}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                      {study.tags.slice(0, 2).map((tag) => (
                        <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.2rem 0.55rem', borderRadius: '3px', background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.18)', color: CYAN }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: CYAN, fontWeight: 600 }}>Read full case study →</span>
                  </motion.button>
                ))}
              </div>

              {/* Case study modal */}
              <AnimatePresence>
                {selectedCaseStudy && selectedStudy && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                    onClick={() => setSelectedCaseStudy(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.92, y: 16 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.92, y: 16 }}
                      onClick={(e) => e.stopPropagation()}
                      style={{ ...cardStyle, maxWidth: '42rem', width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid rgba(34,211,238,0.2)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                        <div>
                          <h3 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '1.25rem', fontWeight: 700, color: 'rgb(250 250 250)', marginBottom: '0.35rem' }}>
                            {selectedStudy.title}
                          </h3>
                          <p style={{ fontSize: '0.8rem', color: 'rgb(82 82 91)' }}>
                            {selectedStudy.client} · {selectedStudy.industry}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedCaseStudy(null)}
                          style={{ background: 'none', border: 'none', color: 'rgb(113 113 122)', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1, padding: '0.25rem' }}
                          aria-label="Close"
                        >
                          ×
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                        {selectedStudy.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '2rem', background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.18)', color: CYAN }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {[
                        { heading: 'The Challenge', content: selectedStudy.challenge },
                        { heading: 'Our Solution',  content: selectedStudy.solution },
                      ].map(({ heading, content }) => (
                        <div key={heading} style={{ marginBottom: '1.5rem' }}>
                          <h4 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '0.85rem', fontWeight: 700, color: 'rgb(228 228 231)', marginBottom: '0.5rem' }}>
                            {heading}
                          </h4>
                          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgb(161 161 170)', margin: 0 }}>
                            {content}
                          </p>
                        </div>
                      ))}

                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '0.85rem', fontWeight: 700, color: 'rgb(228 228 231)', marginBottom: '0.75rem' }}>
                          Measured Results
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {selectedStudy.results.map((result, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: CYAN, boxShadow: '0 0 6px rgba(34,211,238,0.55)', flexShrink: 0, marginTop: 7 }} />
                              <span style={{ fontSize: '0.875rem', color: 'rgb(161 161 170)' }}>{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedStudy.link && (
                        <a
                          href={selectedStudy.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'block', textAlign: 'center', padding: '0.875rem', background: CYAN, color: 'rgb(9 9 11)', borderRadius: '0.5rem', fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
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
