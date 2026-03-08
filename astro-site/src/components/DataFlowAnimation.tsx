import { motion } from 'framer-motion';

export default function DataFlowAnimation() {
  const paths = [
    'M10 50 Q 30 10, 50 50 T 90 50',
    'M10 30 Q 40 70, 70 30 T 90 30',
    'M10 70 Q 25 40, 50 70 T 90 70',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(91, 141, 239, 0)" />
            <stop offset="50%" stopColor="rgba(91, 141, 239, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 217, 255, 0)" />
          </linearGradient>
          <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(167, 139, 250, 0)" />
            <stop offset="50%" stopColor="rgba(167, 139, 250, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 217, 255, 0)" />
          </linearGradient>
        </defs>

        {paths.map((path, index) => (
          <g key={index}>
            {/* Static path */}
            <path
              d={path}
              fill="none"
              stroke="rgba(91, 141, 239, 0.1)"
              strokeWidth="0.5"
            />

            {/* Animated flow */}
            <motion.path
              d={path}
              fill="none"
              stroke={`url(#flowGradient${index % 2 + 1})`}
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathLength: [0, 0.3, 0],
                pathOffset: [0, 1, 1],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.5,
              }}
            />

            {/* Data particles */}
            <motion.circle
              r="1"
              fill="rgba(91, 141, 239, 0.8)"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.5,
              }}
              style={{
                offsetPath: `path('${path}')`,
                filter: 'drop-shadow(0 0 2px rgba(91, 141, 239, 0.8))',
              }}
            />
          </g>
        ))}

        {/* Connection nodes */}
        {[
          { cx: 10, cy: 50 },
          { cx: 50, cy: 50 },
          { cx: 90, cy: 50 },
          { cx: 30, cy: 30 },
          { cx: 70, cy: 70 },
        ].map((node, index) => (
          <motion.circle
            key={`node-${index}`}
            cx={node.cx}
            cy={node.cy}
            r="2"
            fill="rgba(91, 141, 239, 0.4)"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
            style={{
              filter: 'drop-shadow(0 0 3px rgba(91, 141, 239, 0.6))',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
