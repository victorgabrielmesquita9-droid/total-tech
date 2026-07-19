'use client';

export default function KineticText({ text, className = '', startDelay = 0.1 }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="kinetic-word"
          style={{ animationDelay: `${startDelay + i * 0.06}s` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}
