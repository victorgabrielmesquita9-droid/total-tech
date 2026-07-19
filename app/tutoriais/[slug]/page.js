import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { CATEGORIES } from '@/lib/categories';
import SiteHeader from '@/components/SiteHeader';

export const revalidate = 0;

async function getArticle(slug) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const cat = CATEGORIES[article.category];

  return (
    <main className="min-h-screen dot-grid">
      <SiteHeader />
      <article className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href={`/tutoriais?categoria=${article.category}`}
          className="font-mono text-xs px-2 py-0.5 rounded inline-block mb-4"
          style={{ background: `${cat?.color}1a`, color: cat?.color }}
        >
          {cat?.label}
        </Link>
        <h1 className="font-mono text-2xl sm:text-3xl font-bold text-text leading-tight mb-3">
          {article.title}
        </h1>
        <p className="font-mono text-xs text-muted mb-10">
          {new Date(article.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <div className="prose-content text-[15px] leading-7 text-text/90 whitespace-pre-wrap">
          {article.content}
        </div>
      </article>
    </main>
  );
}
