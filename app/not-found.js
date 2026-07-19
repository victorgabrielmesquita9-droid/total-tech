import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen dot-grid flex items-center justify-center px-6">
      <div className="text-center font-mono">
        <p className="text-muted text-sm mb-2">{'// erro 404'}</p>
        <h1 className="text-2xl font-bold text-text mb-4">esse arquivo não existe.</h1>
        <Link href="/" className="text-mint hover:underline text-sm">
          voltar para tutoriais.dev
        </Link>
      </div>
    </main>
  );
}
