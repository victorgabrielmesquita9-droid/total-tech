import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { labelDaCategoria } from '@/lib/categorias';
import { tempoDeLeitura, formatarData } from '@/lib/formato';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

export const dynamic = 'force-dynamic';

export default async function Tutorial({ params }) {
  const { data: artigo } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!artigo) notFound();

  return (
    <div className="min-h-screen bg-[#07070a] flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-8 pb-20">
        <Link href="/tutoriais" className="text-[13px] text-[#5c5e66] hover:text-[#f4f3ef]">
          ← Todos os tutoriais
        </Link>

        <Reveal>
          <span className="block mt-6 text-[13px] uppercase tracking-wider text-[#7c5cff] font-medium">
            {labelDaCategoria(artigo.category)}
          </span>

          <h1 className="font-display font-semibold text-4xl text-[#f4f3ef] mt-3 mb-4 leading-[1.1]">
            {artigo.title}
          </h1>

          <p className="text-[13px] text-[#5c5e66] mb-10">
            {formatarData(artigo.created_at)} · {tempoDeLeitura(artigo.content)}
          </p>

          {artigo.image_url && (
            <img
              src={artigo.image_url}
              alt={artigo.title}
              className="w-full rounded-xl mb-10 border border-[rgba(255,255,255,0.08)]"
            />
          )}

          <div className="text-[#c7c8cd] text-[17px] leading-[1.85] whitespace-pre-wrap">
            {artigo.content}
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
