import EditorHero from '@/components/EditorHero';
import TerminalSubscribe from '@/components/TerminalSubscribe';
import CategoryGrid from '@/components/CategoryGrid';

export default function HomePage() {
  return (
    <main className="relative z-10 min-h-screen dot-grid">
      <div className="mx-auto max-w-5xl px-6 pt-8 pb-24 sm:pt-12">
        {/* top bar */}
        <header className="flex items-center justify-between mb-16 sm:mb-24">
          <span className="font-mono text-sm font-bold tracking-tight text-text">
            tutoriais<span className="text-mint">.dev</span>
          </span>
          <span className="flex items-center gap-2 font-mono text-xs text-muted border border-line rounded-full px-3 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-mint" />
            </span>
            em breve
          </span>
        </header>

        {/* hero copy */}
        <section className="flex flex-col items-start gap-6 mb-12">
          <h1 className="font-mono text-4xl sm:text-6xl font-bold tracking-tight text-text leading-[1.05]">
            Tutoriais que explicam
            <br />
            de <span className="text-mint">verdade</span>.
          </h1>
          <p className="max-w-xl text-base sm:text-lg text-muted leading-relaxed">
            Programação, informática, Windows e celular — em passo a passo
            direto, sem enrolação, escrito em português. Estamos preparando
            os primeiros tutoriais agora mesmo.
          </p>
        </section>

        {/* signature element */}
        <section className="mb-12">
          <EditorHero />
        </section>

        {/* subscribe */}
        <section className="mb-20">
          <TerminalSubscribe />
        </section>

        {/* categories */}
        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs text-muted">{'// o que vem por aí'}</span>
          <CategoryGrid />
        </section>
      </div>

      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} tutoriais.dev
          </span>
          <span className="font-mono text-xs text-muted">feito para quem quer aprender de verdade</span>
        </div>
      </footer>
    </main>
  );
}
