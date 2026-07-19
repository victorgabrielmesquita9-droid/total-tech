import Link from 'next/link';
import { categorias } from '@/lib/categorias';

export default function Header() {
  return (
    <header className="relative z-10">
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-6 flex items-center justify-between flex-wrap gap-4">
        <Link href="/" className="font-display font-semibold text-xl text-[#f4f3ef] tracking-tight">
          tutoriais<span className="text-[#7c5cff]">.</span>dev
        </Link>
        <nav className="flex items-center gap-6 flex-wrap">
          {categorias.map((c) => (
            <Link
              key={c.slug}
              href={`/tutoriais?categoria=${c.slug}`}
              className="text-[13px] uppercase tracking-wider text-[#8d8f97] hover:text-[#f4f3ef] transition-colors"
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
