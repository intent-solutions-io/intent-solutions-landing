import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

const ORANGE      = 'rgb(251 146 60)';
const ORANGE_GLOW = '0 0 6px rgba(249,115,22,0.5)';

/* Marker-highlight for the heading keyword */
const HIGHLIGHT: React.CSSProperties = {
  background: 'linear-gradient(120deg, #FF8A2A, #F26205)',
  color: 'rgb(9 9 11)',
  padding: '0.02em 0.22em 0.06em',
  borderRadius: '8px',
  boxDecorationBreak: 'clone',
  WebkitBoxDecorationBreak: 'clone',
};

const contactSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  interest: z.enum(['consulting', 'learn', 'colab', 'other'], {
    required_error: 'please select a request type',
  }),
  message: z.string().min(10, 'please describe the outcome you need'),
  website: z.string().max(0).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const interestOptions = [
  { value: 'consulting', label: 'Request an outcome' },
  { value: 'learn',      label: 'Ask about the Learn practice' },
  { value: 'colab',      label: 'Discuss a partnership' },
  { value: 'other',      label: 'Something else' },
] as const;

const steps = [
  { number: '01', title: 'Name the outcome', description: 'Tell us what must change and why it matters' },
  { number: '02', title: 'Define done',       description: 'We write the constraints and proof before work starts' },
  { number: '03', title: 'Build and prove',   description: 'The system ships with evidence and an operating handoff' },
];

/* ── Shared input style (inline) ── */
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(9, 9, 11, 0.55)',
  border: '1px solid rgba(39, 39, 42, 0.8)',
  borderRadius: '0.5rem',
  color: 'rgb(250 250 250)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.25s ease',
};

function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgb(161 161 170)',
          marginBottom: '0.5rem',
          fontFamily: "'Syne', system-ui, sans-serif",
        }}
      >
        {label}
        {required && <span style={{ color: ORANGE, marginLeft: '0.2rem' }}>*</span>}
        {optional && <span style={{ color: 'rgb(82 82 91)', marginLeft: '0.3rem', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>}
      </label>
      {children}
      {error && (
        <p style={{ marginTop: '0.375rem', fontSize: '0.78rem', color: 'rgb(248 113 113)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  useEffect(() => {
    const door = new URLSearchParams(window.location.search).get('door');
    if (door === 'outcome') setValue('interest', 'consulting');
    if (door === 'partner') setValue('interest', 'colab');
  }, [setValue]);

  const onSubmit = async (data: ContactForm) => {
    try {
      setSubmitError(null);

      const response = await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        data.name,
          email:       data.email,
          company:     data.company     || undefined,
          phone:       data.phone       || undefined,
          interest:    data.interest,
          message:     data.message,
          website:     data.website     || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Form submission failed with status ${response.status}`);
      }

      window.gtag?.('event', 'form_submit', {
        form_name: 'enhanced_contact',
        interest:  data.interest,
      });

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to submit contact form', error);
      setSubmitError('Something went wrong. Please email jeremy@intentsolutions.io directly.');
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '7rem 0',
        background: 'rgb(9 9 11)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Astronaut video backdrop */}
      <video
        autoPlay muted loop playsInline
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      >
        <source src="/astronaut.mp4" type="video/mp4" />
      </video>

      {/* Light overlay — the Mars footage stays visible, like the old hero */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(9, 9, 11, 0.38)',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom blend into the next section + ember grade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0) 25%, rgba(9,9,11,0) 78%, rgb(9 9 11) 100%), ' +
            'radial-gradient(circle at 82% 10%, rgba(249,115,22,0.08), transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 600, height: 600,
          top: '-10%', right: '-15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
            <span style={{ display: 'block', height: 1, width: '3.5rem', background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.2))' }} />
            <span
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase' as const,
                color: ORANGE,
              }}
            >
              Request an outcome
            </span>
            <span style={{ display: 'block', height: 1, width: '3.5rem', background: 'linear-gradient(to left, transparent, rgba(249,115,22,0.2))' }} />
          </div>

          <h2
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: 'rgb(250 250 250)',
              letterSpacing: '-0.02em',
              lineHeight: 1.18,
              marginBottom: '0.85rem',
              textShadow: '0 2px 30px rgba(0,0,0,0.6)',
            }}
          >
            Start with what must change.{' '}
            <span style={HIGHLIGHT}>Define done before the build.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgb(228 228 231)', textShadow: '0 1px 14px rgba(0,0,0,0.6)' }}>
            Bring us the outcome, the operating constraints, and the evidence you will trust.
          </p>
        </motion.div>

        {/* ── Glass panel: steps + form + direct contact ── */}
        <div
          style={{
            background: 'rgba(9, 9, 11, 0.72)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1.25rem',
            padding: '2.5rem 2.25rem',
            boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
          }}
        >

        {/* ── 3-step process ── */}
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem', marginBottom: '2.5rem' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              style={{
                padding: '1.25rem 1rem',
                background: 'rgba(18, 18, 20, 0.7)',
                border: '1px solid rgba(39,39,42,0.7)',
                borderRadius: '0.75rem',
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  border: `1px solid rgba(249,115,22,0.3)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem',
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: ORANGE,
                  boxShadow: ORANGE_GLOW,
                }}
              >
                {step.number}
              </div>
              <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'rgb(228 228 231)', margin: '0 0 0.3rem' }}>
                {step.title}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgb(82 82 91)', margin: 0 }}>
                {step.description}
              </p>
            </div>
          ))}
        </motion.div>

        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgb(82 82 91)', marginBottom: '2.5rem' }}>
          We read every request and answer whether it is a fit.
        </p>

        {/* ── Form ── */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          {/* Name & Email */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <Field label="Name" required error={errors.name?.message}>
              <input
                {...register('name')}
                type="text"
                id="name"
                style={inputStyle}
                placeholder="Your name"
                onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.35)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
              />
            </Field>
            <Field label="Email" required error={errors.email?.message}>
              <input
                {...register('email')}
                type="email"
                id="email"
                style={inputStyle}
                placeholder="you@example.com"
                onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.35)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
              />
            </Field>
          </div>

          {/* Company & Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <Field label="Company" optional>
              <input
                {...register('company')}
                type="text"
                id="company"
                style={inputStyle}
                placeholder="Your company"
                onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.35)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
              />
            </Field>
            <Field label="Phone" optional>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                style={inputStyle}
                placeholder="+1 555 123 4567"
                onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.35)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
              />
            </Field>
          </div>

          {/* Interest */}
          <Field label="What kind of request is this?" required error={errors.interest?.message}>
            <select
              {...register('interest')}
              id="interest"
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.35)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
            >
              <option value="">Select a request...</option>
              {interestOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>

          {/* Message */}
          <Field label="What outcome do you need, and how will you know it worked?" required error={errors.message?.message}>
            <textarea
              {...register('message')}
              id="message"
              rows={4}
              style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
              placeholder="Describe the change you need, where it must run, and the evidence that would make you trust it."
              onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.35)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
            />
          </Field>

          {/* Honeypot */}
          <input {...register('website')} type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          {/* Status messages */}
          {submitError && (
            <p style={{ fontSize: '0.85rem', color: 'rgb(248 113 113)', textAlign: 'center' }}>{submitError}</p>
          )}
          {submitted && !submitError && (
            <p style={{ fontSize: '0.85rem', color: ORANGE, textAlign: 'center' }}>
              Request received. We will answer whether it is a fit.
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || submitted}
            className="btn-primary"
            style={{
              width: '100%',
              fontFamily: "'Syne', system-ui, sans-serif",
              letterSpacing: '0.05em',
              fontSize: '0.9rem',
              opacity: isSubmitting || submitted ? 0.7 : 1,
              cursor: isSubmitting || submitted ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Sending...' : submitted ? 'Sent' : 'Send request'}
          </button>
        </motion.form>

        {/* ── Direct contact footer ── */}
        <motion.div
          style={{
            marginTop: '3rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(39,39,42,0.5)',
            textAlign: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p style={{ fontSize: '0.85rem', color: 'rgb(82 82 91)', marginBottom: '1.25rem' }}>
            Prefer email?
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <a
              href="mailto:jeremy@intentsolutions.io"
              style={{
                fontSize: '0.875rem',
                color: 'rgb(113 113 122)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = ORANGE)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgb(113 113 122)')}
            >
              jeremy@intentsolutions.io
            </a>
          </div>
          <p style={{ fontSize: '0.775rem', color: 'rgb(63 63 70)' }}>gulf shores, alabama</p>
        </motion.div>

        </div>{/* /glass panel */}

      </div>
    </section>
  );
}
