import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { labelDaCategoria } from '@/lib/categorias';
import { tempoDeLeitura, formatarData } from '@/lib/formato';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import AuroraBackground from '@/components/AuroraBackground';
import KineticText from '@/components/KineticText';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';

export const dynamic = 'force-dynamic';

function resumo(texto, tamanho = 130) {
  if (!texto) return '';
  return texto.length > tamanho ? texto.slice(0, tamanho).trim() + '…' : texto;
}

export default async function Home() {
  const { data: artigos } = await supabase
    .from('articles')
    .select('*')
    .not('slug', 'is', null)
    .order('created_at', { ascending: false })
    .limit(9);

  return (
    <div className="min-h-screen bg-[#07070a] flex flex-col">
      {/* HERO — aurora + texto cinético */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-70">
          <AuroraBackground />
        </div>
        <div className="relative z-10">
          <Header />
          <div className="max-w-4xl mx-auto px-6 pt-16 pb-28 text-center">
            <h1 className="font-display font-semibold text-5xl sm:text-7xl text-[#f4f3ef] leading-[1.05] mb-7">
              <KineticText text="Tutoriais que resolvem" />
              <br />
              <KineticText text="de verdade." startDelay={0.5} />
            </h1>
            <p
              className="text-[#a9abb3] text-lg max-w-lg mx-auto mb-10 opacity-0"
              style={{ animation: 'kinetic-in 0.9s cubic-bezier(.16,1,.3,1) forwards 1.1s' }}
            >
              Programação, informática, Windows e celulares — guias diretos, sem enrolação.
            </p>
            <div
              className="opacity-0"
              style={{ animation: 'kinetic-in 0.9s cubic-bezier(.16,1,.3,1) forwards 1.3s' }}
            >
              <MagneticButton>
                <Link
                  href="/tutoriais"
                  className="inline-block text-sm font-semibold text-[#07070a] bg-[#f4f3ef] rounded-full px-7 py-3.5 hover:bg-white transition-colors"
                >
                  Explorar tutoriais →
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 relative z-10">
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <Reveal>
            <h2 className="font-display font-semibold text-2xl text-[#f4f3ef] mb-8">
              Últimos tutoriais
            </h2>
          </Reveal>

          {!artigos || artigos.length === 0 ? (
            <p className="text-sm text-[#5c5e66]">
              Ainda não há tutoriais publicados. Volte em breve.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {artigos.map((artigo, i) => (
                <Reveal key={artigo.id} delay={(i % 3) * 80}>
                  <Link
                    href={`/tutoriais/${artigo.slug}`}
                    className="group block h-full bg-[#101014] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[#7c5cff] transition-colors"
                  >
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#7c5cff] mb-3">
                      {labelDaCategoria(artigo.category)}
                    </span>
                    <h3 className="font-display text-lg text-[#f4f3ef] mb-2 leading-snug group-hover:text-[#22d3ee] transition-colors">
                      {artigo.title}
                    </h3>
                    <p className="text-sm text-[#8d8f97] leading-relaxed mb-4">
                      {resumo(artigo.content)}
                    </p>
                    <p className="text-[12px] text-[#5c5e66]">
                      {formatarData(artigo.created_at)} · {tempoDeLeitura(artigo.content)}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <section className="relative border-t border-[rgba(255,255,255,0.08)]">
          <Reveal className="max-w-2xl mx-auto px-6 py-20 text-center block">
            <h2 className="font-display font-semibold text-3xl text-[#f4f3ef] mb-3">
              Novos tutoriais no seu e-mail
            </h2>
            <p className="text-sm text-[#8d8f97] mb-8">
              Sem spam — só um aviso quando publicarmos algo novo.
            </p>
            <NewsletterForm />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
