import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { CATEGORIES, CATEGORY_LIST } from '@/lib/categories';
import SiteHeader from '@/components/SiteHeader';

export const revalidate = 0;

async function getArticles(categoria) {
  let query = supabase
    .from('articles')
    .select('title, slug, category, excerpt, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (categoria && CATEGORIES[categoria]) {
    query = query.eq('category', categoria);
  }

  const { data, error } = await query;
  if (error) return [];
  return data;
}

export default async function TutoriaisPage({ searchParams }) {
  const categoria = searchParams?.categoria;
  const articles = await getArticles(categoria);
  const activeCat = categoria && CATEGORIES[categoria] ? CATEGORIES[categoria] : null;

  return (
    <main className="min-h-screen dot-grid">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-mono text-2xl sm:text-3xl font-bold text-text mb-2">
          {activeCat ? activeCat.label : 'Todos os tutoriais'}
        </h1>
        <p className="text-muted mb-8 text-sm">
          {activeCat ? activeCat.description : 'Tudo o que já publicamos, mais recente primeiro.'}
        </p>

        {/* filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/tutoriais"
            className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-colors ${
              !activeCat
                ? 'border-mint text-mint'
                : 'border-line text-muted hover:text-text'
            }`}
          >
            todos
          </Link>
          {CATEGORY_LIST.map((cat) => (
            <Link
              key={cat.slug}
              href={`/tutoriais?categoria=${cat.slug}`}
              className="font-mono text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={{
                borderColor: categoria === cat.slug ? cat.color : '#2A3350',
                color: categoria === cat.slug ? cat.color : '#8593AD',
              }}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {articles.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line p-10 text-center">
            <p className="font-mono text-sm text-muted mb-1">{'// nada por aqui ainda'}</p>
            <p className="text-sm text-muted">
              Estamos escrevendo os primeiros tutoriais. Volte em breve.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-line rounded-lg border border-line overflow-hidden">
            {articles.map((article) => {
              const cat = CATEGORIES[article.category];
              return (
                <li key={article.slug}>
                  <Link
                    href={`/tutoriais/${article.slug}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-5 py-4 bg-surface hover:bg-surface2 transition-colors"
                  >
                    <span
                      className="font-mono text-[11px] px-2 py-0.5 rounded shrink-0 w-fit"
                      style={{ background: `${cat?.color}1a`, color: cat?.color }}
                    >
                      {cat?.label}
                    </span>
                    <span className="flex-1 text-sm font-medium text-text">{article.title}</span>
                    <span className="font-mono text-xs text-muted shrink-0">
                      {new Date(article.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
