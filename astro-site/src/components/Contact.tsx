import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

const contactSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  interest: z.enum(['consulting', 'learn', 'colab', 'other'], {
    required_error: 'please select what you\'re interested in',
  }),
  projectType: z.enum(['ai-ml', 'workflow-automation', 'gcp', 'strategy']).optional(),
  budget: z.enum(['under-5k', '5k-15k', '15k-50k', '50k-plus', 'discuss']).optional(),
  timeline: z.enum(['immediate', 'this-month', 'this-quarter', 'exploring']).optional(),
  message: z.string().min(10, 'please tell us a bit more about your project'),
  website: z.string().max(0).optional(), // Honeypot
});

type ContactForm = z.infer<typeof contactSchema>;

const interestOptions = [
  { value: 'consulting', label: 'Consulting / Custom Build' },
  { value: 'learn', label: 'Learn with Jeremy' },
  { value: 'colab', label: 'Colab with Jeremy' },
  { value: 'other', label: 'Other' },
] as const;

const projectTypeOptions = [
  { value: 'ai-ml', label: 'AI / Machine Learning' },
  { value: 'workflow-automation', label: 'Workflow Automation' },
  { value: 'gcp', label: 'GCP / Cloud Infrastructure' },
  { value: 'strategy', label: 'AI Strategy Consulting' },
] as const;

const budgetOptions = [
  { value: 'under-5k', label: 'Under $5K' },
  { value: '5k-15k', label: '$5K - $15K' },
  { value: '15k-50k', label: '$15K - $50K' },
  { value: '50k-plus', label: '$50K+' },
  { value: 'discuss', label: "Let's Discuss" },
] as const;

const timelineOptions = [
  { value: 'immediate', label: 'Immediate (this week)' },
  { value: 'this-month', label: 'This Month' },
  { value: 'this-quarter', label: 'This Quarter' },
  { value: 'exploring', label: 'Just Exploring' },
] as const;

const steps = [
  { number: 1, title: 'You reach out', description: 'Tell me about your project and goals' },
  { number: 2, title: 'We connect', description: 'Quick call to understand your needs' },
  { number: 3, title: 'We ship', description: 'Build, train, and deploy together' },
];

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const selectedInterest = watch('interest');

  const onSubmit = async (data: ContactForm) => {
    try {
      setSubmitError(null);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || undefined,
          phone: data.phone || undefined,
          interest: data.interest,
          projectType: data.projectType || undefined,
          budget: data.budget || undefined,
          timeline: data.timeline || undefined,
          message: data.message,
          website: data.website || undefined, // Honeypot
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Form submission failed with status ${response.status}`);
      }

      // Track conversion in Firebase Analytics
      window.gtag?.('event', 'form_submit', {
        form_name: 'enhanced_contact',
        interest: data.interest,
        budget: data.budget,
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
    <section id="contact" className="py-24 bg-zinc-900" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Trust Header */}
          <div className="text-center mb-8">
            <h2 className="text-h1 font-bold text-zinc-50 mb-4">
              Let's Build Something That Ships to Production
            </h2>
            <p className="text-zinc-400 text-lg">
              Tired of AI demos that never make it past the POC phase?
            </p>
          </div>

          {/* What Happens Next - 3 Steps */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="card-slate text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-semibold text-zinc-200">
                  {step.number}
                </div>
                <h3 className="text-sm font-semibold text-zinc-50 mb-1">{step.title}</h3>
                <p className="text-xs text-zinc-500">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Response commitment */}
          <p className="text-center text-sm text-zinc-500 mb-8">
            We respond within 24 hours
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name & Email - Side by side on desktop */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                  Name <span className="text-zinc-500">*</span>
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-smooth"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email <span className="text-zinc-500">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-smooth"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Company & Phone - Side by side */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-2">
                  Company / Organization <span className="text-zinc-500">(optional)</span>
                </label>
                <input
                  {...register('company')}
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-smooth"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
                  Phone <span className="text-zinc-500">(optional)</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-smooth"
                  placeholder="+1 555 123 4567"
                />
              </div>
            </div>

            {/* Interest Dropdown */}
            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-zinc-300 mb-2">
                What are you interested in? <span className="text-zinc-500">*</span>
              </label>
              <select
                {...register('interest')}
                id="interest"
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-zinc-400 transition-smooth"
              >
                <option value="">Select an option...</option>
                {interestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.interest && (
                <p className="mt-1 text-sm text-red-400">{errors.interest.message}</p>
              )}
            </div>

            {/* Project Type - Conditional, only shows if consulting selected */}
            {selectedInterest === 'consulting' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="projectType" className="block text-sm font-medium text-zinc-300 mb-2">
                  Project Type <span className="text-zinc-500">(optional)</span>
                </label>
                <select
                  {...register('projectType')}
                  id="projectType"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-zinc-400 transition-smooth"
                >
                  <option value="">Select project type...</option>
                  {projectTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* Budget & Timeline - Side by side */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-zinc-300 mb-2">
                  Budget Range <span className="text-zinc-500">(optional)</span>
                </label>
                <select
                  {...register('budget')}
                  id="budget"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-zinc-400 transition-smooth"
                >
                  <option value="">Select budget...</option>
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-zinc-300 mb-2">
                  Timeline <span className="text-zinc-500">(optional)</span>
                </label>
                <select
                  {...register('timeline')}
                  id="timeline"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-zinc-400 transition-smooth"
                >
                  <option value="">Select timeline...</option>
                  {timelineOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                Project Details <span className="text-zinc-500">*</span>
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-smooth resize-none"
                placeholder="Tell me about your project, goals, and any specific challenges..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>

            {/* Honeypot - Hidden field for spam protection */}
            <input
              {...register('website')}
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {submitError && (
              <p className="text-sm text-red-400 text-center">{submitError}</p>
            )}
            {submitted && !submitError && (
              <p className="text-sm text-zinc-300 text-center">
                Thanks for reaching out! I'll be in touch within 24 hours.
              </p>
            )}

            <button
              type="submit"
              className="w-full btn-primary"
              disabled={isSubmitting || submitted}
            >
              {isSubmitting ? 'Sending...' : submitted ? 'Sent!' : 'Get Started'}
            </button>
          </form>

          {/* Direct contact footer */}
          <div className="mt-12 pt-12 border-t border-zinc-800 text-center space-y-4">
            <p className="text-zinc-400 text-sm">or reach out directly:</p>
            <a
              href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
              target="_blank"
              rel="noopener"
              className="inline-block px-6 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 hover:bg-zinc-700 hover:text-zinc-50 transition-smooth font-medium"
            >
              Book a Call
            </a>
            <div className="space-y-1">
              <a
                href="mailto:jeremy@intentsolutions.io"
                className="block text-zinc-200 hover:text-zinc-50 transition-smooth"
              >
                jeremy@intentsolutions.io
              </a>
              <p className="text-zinc-500 text-sm">gulf shores, alabama</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
