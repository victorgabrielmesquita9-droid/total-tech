'use client';

import { useRef } from 'react';

export default function MagneticButton({ children, className = '' }) {
  const ref = useRef(null);

  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }

  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </span>
  );
}
