import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const focusAreas = [
    'automation programs that eliminate manual reporting',
    'ai agents and rag systems grounded in your data',
    'production-ready astro, react, and n8n launches',
  ];

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Floating orbs
    const orbs = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 150 + 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: i % 3 === 0 ? 'rgba(91, 141, 239, 0.08)' : i % 3 === 1 ? 'rgba(167, 139, 250, 0.06)' : 'rgba(0, 217, 255, 0.05)',
    }));

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) orb.vx *= -1;
        if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) orb.vy *= -1;

        // Draw orb with gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center bg-gradient-main relative overflow-hidden">
      {/* Animated gradient canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ filter: 'blur(80px)' }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Additional accent glows */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(91, 141, 239, 0.15) 0%, transparent 70%)',
          top: '10%',
          right: '10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.12) 0%, transparent 70%)',
          bottom: '10%',
          left: '10%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <div className="container mx-auto px-8 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl"
        >
          <motion.p
            className="uppercase tracking-[0.3em] text-xs font-semibold text-gradient mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            ai systems that ship to production
          </motion.p>

          <motion.h1
            className="text-hero font-extrabold mb-6"
            style={{ color: 'rgb(248, 250, 252)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            creating industries<br />that don't exist
          </motion.h1>

          <motion.p
            className="text-lg text-zinc-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a
              href="https://jeremylongshore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              jeremy_longshore
            </a>{' '}
            · independent ai consultant
          </motion.p>

          <motion.p
            className="text-body-lg text-zinc-400 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I build measurable automation, data, and agent workflows for operators who need real
            outcomes—faster onboarding, fewer spreadsheets, and launch-ready customer experiences.
          </motion.p>

          <motion.ul
            className="mb-10 space-y-3"
            style={{ color: 'rgb(203, 213, 225)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {focusAreas.map((area) => (
              <li key={area} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-accent flex-shrink-0" />
                <span>{area}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#contact" className="btn-primary">
              start a project
            </a>
            <a
              href="/survey"
              className="inline-flex items-center transition-smooth"
              style={{ color: 'rgb(203, 213, 225)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(248, 250, 252)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(203, 213, 225)'}
            >
              view the hustle research survey →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
