import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated mesh gradient blobs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(91, 141, 239, 0.4) 0%, rgba(91, 141, 239, 0) 70%)',
          filter: 'blur(60px)',
          top: '20%',
          left: '10%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(167, 139, 250, 0) 70%)',
          filter: 'blur(60px)',
          top: '60%',
          right: '15%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, rgba(0, 217, 255, 0) 70%)',
          filter: 'blur(60px)',
          bottom: '15%',
          left: '20%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Subtle grid animation */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(91, 141, 239, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91, 141, 239, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gradient-accent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
