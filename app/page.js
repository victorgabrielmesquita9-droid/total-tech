import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { categorias, labelDaCategoria } from '@/lib/categorias';
import { tempoDeLeitura, formatarData } from '@/lib/formato';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import AuroraBackground from '@/components/AuroraBackground';
import KineticText from '@/components/KineticText';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';
import OpenLaptop from '@/components/OpenLaptop';
import PCBuilder from '@/components/PCBuilder';
import PCConfigurator from '@/components/PCConfigurator';
import TiltCard from '@/components/TiltCard';

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
      {/* HERO — foto real + texto em camadas + aurora sutil */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <AuroraBackground />
        </div>

        <div className="relative z-10">
          <Header />

          <div className="relative max-w-6xl mx-auto px-6 pt-6 pb-8 sm:pt-10">
            {/* título, atrás da imagem */}
            <h1 className="relative font-display font-semibold text-[15vw] sm:text-[7.2rem] leading-[0.86] text-[#f4f3ef] select-none">
              <span className="block">
                <KineticText text="Aprenda" />
              </span>
              <span className="block text-[#3a3a42]">
                <KineticText text="de verdade" startDelay={0.4} />
              </span>
            </h1>

            {/* imagem real, bordas dissolvendo no fundo */}
            <div
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[62%] sm:w-[48%] max-w-lg z-20 hero-image-float"
              style={{
                maskImage:
                  'radial-gradient(ellipse 65% 65% at 50% 50%, black 45%, transparent 78%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 65% 65% at 50% 50%, black 45%, transparent 78%)',
              }}
            >
              <img
                src="https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg"
                alt=""
                className="w-full h-auto rounded-2xl"
              />
            </div>

            <p
              className="relative z-30 text-[#a9abb3] text-lg max-w-md mt-8 mb-8 opacity-0"
              style={{ animation: 'kinetic-in 0.9s cubic-bezier(.16,1,.3,1) forwards 1.1s' }}
            >
              Programação, informática, Windows e celulares — guias diretos, sem enrolação.
            </p>
            <div
              className="relative z-30 opacity-0"
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
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <Reveal>
            <h2 className="font-display font-semibold text-2xl text-[#f4f3ef] mb-8">
              Explore por categoria
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categorias.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <TiltCard>
                  <Link
                    href={`/tutoriais?categoria=${c.slug}`}
                    className="group relative block h-40 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]"
                  >
                    <img
                      src={c.imagem}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/30 to-transparent" />
                    <span className="absolute bottom-3 left-4 font-display text-[#f4f3ef] text-base">
                      {c.label}
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-y border-[rgba(255,255,255,0.08)] py-20">
          <Reveal className="max-w-lg mx-auto px-6 text-center block mb-10">
            <h2 className="font-display font-semibold text-2xl text-[#f4f3ef] mb-2">
              Dá um clique
            </h2>
            <p className="text-sm text-[#8d8f97]">Abra o notebook e veja.</p>
          </Reveal>
          <Reveal className="block px-6">
            <OpenLaptop />
          </Reveal>
        </section>

        <section className="py-20">
          <Reveal className="max-w-lg mx-auto px-6 text-center block mb-10">
            <h2 className="font-display font-semibold text-2xl text-[#f4f3ef] mb-2">
              Monte seu PC
            </h2>
            <p className="text-sm text-[#8d8f97]">
              Clique nas peças da imagem e aprenda o que cada uma faz.
            </p>
          </Reveal>
          <Reveal className="block px-6">
            <PCBuilder />
          </Reveal>
        </section>

        <section className="border-y border-[rgba(255,255,255,0.08)] py-20">
          <Reveal className="max-w-lg mx-auto px-6 text-center block mb-10">
            <h2 className="font-display font-semibold text-2xl text-[#f4f3ef] mb-2">
              Monte seu PC personalizado
            </h2>
            <p className="text-sm text-[#8d8f97]">
              Escolha cada peça e veja o preço estimado da sua montagem.
            </p>
          </Reveal>
          <Reveal className="block px-6">
            <PCConfigurator />
          </Reveal>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-20">
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
                  <TiltCard>
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
                  </TiltCard>
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
