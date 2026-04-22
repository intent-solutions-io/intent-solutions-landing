import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion — render static snapshot instead
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const nodeCount = 30;
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const maxDistance = 150;
    let animationId: number;

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        if (!prefersReduced) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > canvas.width)  node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height)  node.vy *= -1;
        }

        // Connections
        nodes.forEach((other, j) => {
          if (i >= j) return;
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Node dot
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(34,211,238,0.7)';
        ctx.fillStyle = 'rgba(34,211,238,0.55)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    if (prefersReduced) {
      // Static single frame
      drawFrame();
    } else {
      const animate = () => {
        drawFrame();
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full opacity-55" />
    </motion.div>
  );
}
