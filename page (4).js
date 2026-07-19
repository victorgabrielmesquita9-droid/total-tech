import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { categorias, labelDaCategoria } from '@/lib/categorias';
import { tempoDeLeitura } from '@/lib/formato';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';

export const dynamic = 'force-dynamic';

const POR_PAGINA = 9;

function resumo(texto, tamanho = 120) {
  if (!texto) return '';
  return texto.length > tamanho ? texto.slice(0, tamanho).trim() + '…' : texto;
}

export default async function Tutoriais({ searchParams }) {
  const categoriaAtiva = searchParams?.categoria || '';
  const busca = searchParams?.busca || '';
  const pagina = Math.max(1, parseInt(searchParams?.pagina || '1', 10));
  const inicio = (pagina - 1) * POR_PAGINA;
  const fim = inicio + POR_PAGINA - 1;

  let query = supabase
    .from('articles')
    .select('*', { count: 'exact' })
    .not('slug', 'is', null)
    .order('created_at', { ascending: false })
    .range(inicio, fim);

  if (categoriaAtiva) query = query.eq('category', categoriaAtiva);
  if (busca) query = query.ilike('title', `%${busca}%`);

  const { data: artigos, count } = await query;
  const totalPaginas = Math.max(1, Math.ceil((count || 0) / POR_PAGINA));

  function linkComParametros(params) {
    const p = new URLSearchParams();
    if (categoriaAtiva) p.set('categoria', categoriaAtiva);
    if (busca) p.set('busca', busca);
    Object.entries(params).forEach(([k, v]) => {
      if (v) p.set(k, v);
      else p.delete(k);
    });
    const qs = p.toString();
    return qs ? `/tutoriais?${qs}` : '/tutoriais';
  }

  return (
    <div className="min-h-screen bg-[#07070a] flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pt-8 pb-20">
        <h1 className="font-display font-semibold text-3xl text-[#f4f3ef] mb-1">
          {categoriaAtiva ? labelDaCategoria(categoriaAtiva) : 'Todos os tutoriais'}
        </h1>
        <p className="text-sm text-[#5c5e66] mb-8">
          {count || 0} tutorial{count === 1 ? '' : 'is'}{busca ? ` para "${busca}"` : ''}
        </p>

        <form action="/tutoriais" method="get" className="mb-6">
          {categoriaAtiva && <input type="hidden" name="categoria" value={categoriaAtiva} />}
          <input
            type="text"
            name="busca"
            defaultValue={busca}
            placeholder="Buscar por título..."
            className="w-full py-3 px-4 rounded-full bg-[#101014] border border-[rgba(255,255,255,0.1)] text-sm text-[#f4f3ef] placeholder-[#5c5e66] outline-none focus:border-[#7c5cff] transition-colors"
          />
        </form>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-10 text-[13px] uppercase tracking-wider">
          <Link
            href={busca ? `/tutoriais?busca=${busca}` : '/tutoriais'}
            className={!categoriaAtiva ? 'text-[#f4f3ef] font-medium' : 'text-[#5c5e66] hover:text-[#f4f3ef]'}
          >
            Todas
          </Link>
          {categorias.map((c) => (
            <Link
              key={c.slug}
              href={linkComParametros({ categoria: c.slug, pagina: null })}
              className={categoriaAtiva === c.slug ? 'text-[#f4f3ef] font-medium' : 'text-[#5c5e66] hover:text-[#f4f3ef]'}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {!artigos || artigos.length === 0 ? (
          <p className="text-sm text-[#5c5e66] py-10">
            Nenhum tutorial encontrado{busca ? ` para "${busca}"` : ''}.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {artigos.map((artigo, i) => (
              <Reveal key={artigo.id} delay={(i % 3) * 70}>
                <TiltCard>
                  <Link
                    href={`/tutoriais/${artigo.slug}`}
                    className="group block h-full bg-[#101014] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[#7c5cff] transition-colors"
                  >
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#7c5cff] mb-3">
                      {labelDaCategoria(artigo.category)}
                    </span>
                    <h2 className="font-display text-lg text-[#f4f3ef] mb-2 leading-snug group-hover:text-[#22d3ee] transition-colors">
                      {artigo.title}
                    </h2>
                    <p className="text-sm text-[#8d8f97] leading-relaxed mb-4">
                      {resumo(artigo.content)}
                    </p>
                    <p className="text-[12px] text-[#5c5e66]">{tempoDeLeitura(artigo.content)}</p>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        )}

        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12 text-sm">
            <Link
              href={linkComParametros({ pagina: pagina > 1 ? String(pagina - 1) : null })}
              className={pagina <= 1 ? 'pointer-events-none text-[#3f4048]' : 'text-[#f4f3ef] hover:text-[#7c5cff]'}
            >
              ← Anterior
            </Link>
            <span className="text-[#5c5e66]">
              Página {pagina} de {totalPaginas}
            </span>
            <Link
              href={linkComParametros({ pagina: String(pagina + 1) })}
              className={pagina >= totalPaginas ? 'pointer-events-none text-[#3f4048]' : 'text-[#f4f3ef] hover:text-[#7c5cff]'}
            >
              Próxima →
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
