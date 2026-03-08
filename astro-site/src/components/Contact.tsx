import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const encodeFormData = (data: Record<string, string>) =>
  Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value ?? '')}`
    )
    .join('&');

const contactSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters'),
  email: z.string().email('invalid email address'),
  projectType: z.string().min(1, 'please select a project type'),
  message: z.string().min(10, 'message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

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
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      setSubmitError(null);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({
          'form-name': 'contact',
          'bot-field': '',
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error(`Netlify form submission failed with status ${response.status}`);
      }

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to submit contact form', error);
      setSubmitError('Something went wrong. Please email jeremy@intentsolutions.io directly.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'rgb(var(--color-bg-primary))' }} ref={ref}>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h1 font-bold text-zinc-50 mb-4 text-center">
            ready to build something?
          </h2>
          <p className="text-zinc-400 text-center mb-12">
            whether you need automation, rapid prototyping, or a full product built from scratch - let's talk.
          </p>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Netlify Forms requires a hidden input with form name */}
            <input type="hidden" name="form-name" value="contact" />
            {/* Honeypot spam protection */}
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                name
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-smooth"
                placeholder="your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                email
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

            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-zinc-300 mb-2">
                project type
              </label>
              <select
                {...register('projectType')}
                id="projectType"
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-zinc-400 transition-smooth"
              >
                <option value="">select type</option>
                <option value="automation">automation</option>
                <option value="prototyping">prototyping</option>
                <option value="ai-agent">ai agent</option>
                <option value="data-platform">data platform</option>
                <option value="not-sure">not sure</option>
              </select>
              {errors.projectType && (
                <p className="mt-1 text-sm text-red-400">{errors.projectType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                message
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-smooth resize-none"
                placeholder="tell me about your project..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-red-400 text-center">{submitError}</p>
            )}
            {submitted && !submitError && (
              <p className="text-sm text-zinc-300 text-center">
                Thanks for reaching out—expect a reply within one business day.
              </p>
            )}

            <button
              type="submit"
              className="w-full btn-primary"
              disabled={submitted}
            >
              {submitted ? 'sent!' : 'send message'}
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-zinc-800 text-center space-y-2">
            <p className="text-zinc-400 text-sm">or reach out directly:</p>
            <a
              href="mailto:jeremy@intentsolutions.io"
              className="block text-zinc-200 hover:text-zinc-50 transition-smooth"
            >
              jeremy@intentsolutions.io
            </a>
            <p className="text-zinc-500 text-sm">gulf shores, alabama</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
