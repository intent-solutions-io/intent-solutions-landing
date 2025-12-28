import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const encodeFormData = (data: Record<string, string>) =>
  Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value ?? '')}`
    )
    .join('&');

const contactSchema = z.object({
  teamSize: z.enum(['solo', 'small-team', 'department', 'enterprise'], {
    required_error: 'please select your team size',
  }),
  email: z.string().email('invalid email address'),
  discord: z.string().optional(),
  whatsapp: z.string().optional(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  xHandle: z.string().optional(),
  businessName: z.string().optional(),
}).refine(
  (data) => data.discord || data.whatsapp || data.phone || data.linkedin || data.xHandle,
  {
    message: 'please provide at least one additional contact method',
    path: ['discord'], // Show error on first additional field
  }
);

type ContactForm = z.infer<typeof contactSchema>;

const teamSizeOptions = [
  { value: 'solo', label: 'Solo' },
  { value: 'small-team', label: 'Small Team' },
  { value: 'department', label: 'Department' },
  { value: 'enterprise', label: 'Enterprise' },
] as const;

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
    watch,
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
          teamSize: data.teamSize,
          email: data.email,
          discord: data.discord || '',
          whatsapp: data.whatsapp || '',
          phone: data.phone || '',
          linkedin: data.linkedin || '',
          xHandle: data.xHandle || '',
          businessName: data.businessName || '',
        }),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
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
    <section id="contact" className="py-24 bg-zinc-900" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h1 font-bold text-zinc-50 mb-4 text-center">
            let's build your system
          </h2>
          <p className="text-zinc-400 text-center mb-12">
            Tell me about your team and how to reach you—I'll be in touch within one business day.
          </p>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            {/* Team Size - Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                team size
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {teamSizeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="relative flex items-center justify-center"
                  >
                    <input
                      {...register('teamSize')}
                      type="radio"
                      value={option.value}
                      className="peer sr-only"
                    />
                    <div className="w-full py-3 px-4 bg-zinc-800/50 border border-zinc-700 rounded-lg text-center text-zinc-300 cursor-pointer transition-smooth peer-checked:border-zinc-200 peer-checked:bg-zinc-800 peer-checked:text-zinc-50 hover:border-zinc-500">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
              {errors.teamSize && (
                <p className="mt-2 text-sm text-red-400">{errors.teamSize.message}</p>
              )}
            </div>

            {/* Email - Required */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                email <span className="text-zinc-500">(required)</span>
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

            {/* Additional Contact Methods */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                additional contact <span className="text-zinc-500">(at least one)</span>
              </label>
              <p className="text-xs text-zinc-500 mb-4">
                How else can I reach you? Pick your preferred method(s).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="discord" className="block text-xs text-zinc-400 mb-1">
                    Discord
                  </label>
                  <input
                    {...register('discord')}
                    type="text"
                    id="discord"
                    className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-smooth text-sm"
                    placeholder="username#1234"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-xs text-zinc-400 mb-1">
                    WhatsApp
                  </label>
                  <input
                    {...register('whatsapp')}
                    type="text"
                    id="whatsapp"
                    className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-smooth text-sm"
                    placeholder="+1 555 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs text-zinc-400 mb-1">
                    Phone
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-smooth text-sm"
                    placeholder="+1 555 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-xs text-zinc-400 mb-1">
                    LinkedIn
                  </label>
                  <input
                    {...register('linkedin')}
                    type="text"
                    id="linkedin"
                    className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-smooth text-sm"
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="xHandle" className="block text-xs text-zinc-400 mb-1">
                    X / Twitter
                  </label>
                  <input
                    {...register('xHandle')}
                    type="text"
                    id="xHandle"
                    className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-smooth text-sm"
                    placeholder="@yourhandle"
                  />
                </div>
              </div>

              {errors.discord && (
                <p className="mt-2 text-sm text-red-400">{errors.discord.message}</p>
              )}
            </div>

            {/* Business Name - Optional */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-zinc-300 mb-2">
                business name <span className="text-zinc-500">(optional)</span>
              </label>
              <input
                {...register('businessName')}
                type="text"
                id="businessName"
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-smooth"
                placeholder="Your Company"
              />
            </div>

            {submitError && (
              <p className="text-sm text-red-400 text-center">{submitError}</p>
            )}
            {submitted && !submitError && (
              <p className="text-sm text-zinc-300 text-center">
                Thanks for reaching out—I'll be in touch within one business day.
              </p>
            )}

            <button
              type="submit"
              className="w-full btn-primary"
              disabled={submitted}
            >
              {submitted ? 'sent!' : 'get started'}
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
