'use client';

import { useEffect, useRef } from 'react';

const BLOBS = [
  { color: '124,92,255', r: 0.5, speed: 0.00021, phase: 0 },
  { color: '34,211,238', r: 0.42, speed: 0.00017, phase: 2.1 },
  { color: '255,111,145', r: 0.38, speed: 0.00024, phase: 4.2 },
];

export default function AuroraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    let w = 0;
    let h = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
    }
    resize();
    window.addEventListener('resize', resize);

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      BLOBS.forEach((b) => {
        const cx = w / 2 + Math.sin(t * b.speed + b.phase) * w * 0.32;
        const cy = h / 2 + Math.cos(t * b.speed * 1.3 + b.phase) * h * 0.28;
        const radius = Math.min(w, h) * b.r;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${b.color}, 0.55)`);
        grad.addColorStop(1, `rgba(${b.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }

    frame(0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
