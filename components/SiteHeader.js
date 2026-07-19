import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-bold tracking-tight text-text">
          tutoriais<span className="text-mint">.dev</span>
        </Link>
        <nav className="flex items-center gap-6 font-mono text-xs text-muted">
          <Link href="/tutoriais" className="hover:text-text transition-colors">
            tutoriais
          </Link>
        </nav>
      </div>
    </header>
  );
}
