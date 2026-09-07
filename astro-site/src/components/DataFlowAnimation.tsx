import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const paths = [
  'M10 50 Q 30 10, 50 50 T 90 50',
  'M10 30 Q 40 70, 70 30 T 90 30',
  'M10 70 Q 25 40, 50 70 T 90 70',
];

const nodes = [
  { cx: 10, cy: 50 },
  { cx: 50, cy: 50 },
  { cx: 90, cy: 50 },
  { cx: 30, cy: 30 },
  { cx: 70, cy: 70 },
];

export default function DataFlowAnimation() {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setAnimate(false);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30" aria-hidden="true">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(34,211,238,0)" />
            <stop offset="50%"  stopColor="rgba(34,211,238,0.6)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
          <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(6,182,212,0)" />
            <stop offset="50%"  stopColor="rgba(6,182,212,0.5)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </linearGradient>
        </defs>

        {paths.map((path, i) => (
          <g key={i}>
            {/* Static track */}
            <path d={path} fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5" />

            {/* Animated flow */}
            {animate ? (
              <motion.path
                d={path}
                fill="none"
                stroke={`url(#flowGrad${(i % 2) + 1})`}
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={{ pathLength: [0, 0.3, 0], pathOffset: [0, 1, 1] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
              />
            ) : (
              <path d={path} fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="0.8" strokeLinecap="round" />
            )}
          </g>
        ))}

        {/* Connection nodes */}
        {nodes.map((node, i) => (
          animate ? (
            <motion.circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r="2"
              fill="rgba(34,211,238,0.45)"
              animate={{ scale: [1, 1.5, 1], opacity: [0.45, 0.85, 0.45] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: 'drop-shadow(0 0 3px rgba(34,211,238,0.6))' }}
            />
          ) : (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r="2"
              fill="rgba(34,211,238,0.45)"
            />
          )
        ))}
      </svg>
    </div>
  );
}
