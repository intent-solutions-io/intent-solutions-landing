import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CYAN = 'rgba(34,211,238,';

interface Particle {
  left: string;
  top: string;
  duration: number;
  delay: number;
}

export default function AnimatedBackground() {
  // Generate random values client-side only to avoid SSR/hydration mismatch
  const [particles, setParticles] = useState<Particle[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    if (!mq.matches) {
      setParticles(
        Array.from({ length: 20 }, () => ({
          left:     `${Math.random() * 100}%`,
          top:      `${Math.random() * 100}%`,
          duration: Math.random() * 10 + 10,
          delay:    Math.random() * 5,
        }))
      );
    }
  }, []);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            width: 384, height: 384,
            borderRadius: '50%',
            opacity: 0.15,
            background: `radial-gradient(circle, ${CYAN}0.3) 0%, ${CYAN}0) 70%)`,
            filter: 'blur(60px)',
            top: '20%', left: '10%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 320, height: 320,
            borderRadius: '50%',
            opacity: 0.1,
            background: `radial-gradient(circle, ${CYAN}0.25) 0%, ${CYAN}0) 70%)`,
            filter: 'blur(60px)',
            bottom: '15%', right: '15%',
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Blob 1 */}
      <motion.div
        style={{
          position: 'absolute',
          width: 384, height: 384,
          borderRadius: '50%',
          opacity: 0.25,
          background: `radial-gradient(circle, ${CYAN}0.35) 0%, ${CYAN}0) 70%)`,
          filter: 'blur(60px)',
          top: '20%', left: '10%',
        }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob 2 */}
      <motion.div
        style={{
          position: 'absolute',
          width: 320, height: 320,
          borderRadius: '50%',
          opacity: 0.15,
          background: `radial-gradient(circle, ${CYAN}0.2) 0%, ${CYAN}0) 70%)`,
          filter: 'blur(60px)',
          top: '60%', right: '15%',
        }}
        animate={{ x: [0, -40, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Blob 3 */}
      <motion.div
        style={{
          position: 'absolute',
          width: 288, height: 288,
          borderRadius: '50%',
          opacity: 0.18,
          background: `radial-gradient(circle, ${CYAN}0.22) 0%, ${CYAN}0) 70%)`,
          filter: 'blur(60px)',
          bottom: '15%', left: '20%',
        }}
        animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Grid */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${CYAN}0.03) 1px, transparent 1px),
            linear-gradient(90deg, ${CYAN}0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 3, height: 3,
            borderRadius: '50%',
            background: `rgb(34 211 238)`,
            left: p.left,
            top: p.top,
          }}
          animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
}
