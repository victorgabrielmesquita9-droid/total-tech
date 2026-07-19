import Link from 'next/link';
import { CATEGORY_LIST } from '@/lib/categories';

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
      {CATEGORY_LIST.map((cat, i) => (
        <Link
          key={cat.slug}
          href={`/tutoriais?categoria=${cat.slug}`}
          className="group relative rounded-lg border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-transparent animate-rise"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ boxShadow: `0 0 0 1px ${cat.color}55, 0 8px 24px -8px ${cat.color}33` }}
          />
          <span className="font-mono text-[11px] text-muted block mb-2">{cat.file}</span>
          <span className="block text-sm font-medium text-text mb-1">{cat.label}</span>
          <span className="block text-xs text-muted leading-snug">{cat.description}</span>
          <span
            className="absolute top-0 left-4 right-4 h-[2px] rounded-b"
            style={{ background: cat.color }}
          />
        </Link>
      ))}
    </div>
  );
}
