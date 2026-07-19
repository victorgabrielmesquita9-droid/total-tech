'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { CATEGORY_LIST } from '@/lib/categories';

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const emptyForm = {
  title: '',
  category: CATEGORY_LIST[0].slug,
  excerpt: '',
  content: '',
  published: true,
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/admin/login');
        return;
      }
      setChecking(false);
      loadArticles();
    });
  }, [router]);

  async function loadArticles() {
    const { data } = await supabase
      .from('articles')
      .select('id, title, category, slug, published, created_at')
      .order('created_at', { ascending: false });
    setArticles(data || []);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const { error: insertError } = await supabase.from('articles').insert({
      title: form.title,
      category: form.category,
      excerpt: form.excerpt || null,
      content: form.content,
      slug: slugify(form.title),
      published: form.published,
    });

    setSaving(false);

    if (insertError) {
      setError(
        insertError.code === '23505'
          ? 'já existe um tutorial com esse título/slug.'
          : 'algo deu errado ao salvar.'
      );
      return;
    }

    setForm(emptyForm);
    loadArticles();
  }

  async function handleDelete(id) {
    if (!confirm('excluir este tutorial? essa ação não pode ser desfeita.')) return;
    await supabase.from('articles').delete().eq('id', id);
    loadArticles();
  }

  if (checking) {
    return (
      <main className="min-h-screen dot-grid flex items-center justify-center">
        <p className="font-mono text-sm text-muted">carregando…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen dot-grid">
      <header className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-bold tracking-tight text-text">
            tutoriais<span className="text-mint">.dev</span>{' '}
            <span className="text-muted font-normal">/ admin</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="font-mono text-xs text-muted hover:text-coral transition-colors"
          >
            sair
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 grid lg:grid-cols-[1fr_1.2fr] gap-8">
        {/* list */}
        <section>
          <h2 className="font-mono text-sm text-muted mb-4">{'// artigos publicados'}</h2>
          {articles.length === 0 ? (
            <p className="font-mono text-sm text-muted">nenhum artigo ainda.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-line rounded-lg border border-line overflow-hidden">
              {articles.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 px-4 py-3 bg-surface">
                  <div className="min-w-0">
                    <p className="text-sm text-text truncate">{a.title}</p>
                    <p className="font-mono text-[11px] text-muted">
                      {a.category} · {a.published ? 'publicado' : 'rascunho'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="font-mono text-xs text-coral hover:underline shrink-0"
                  >
                    excluir
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* create form */}
        <section>
          <h2 className="font-mono text-sm text-muted mb-4">{'// novo tutorial'}</h2>
          <form
            onSubmit={handleCreate}
            className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5"
          >
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-muted">título</span>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-ink border border-line rounded px-3 py-2 text-sm text-text outline-none focus:border-mint/60 transition-colors"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-muted">categoria</span>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="bg-ink border border-line rounded px-3 py-2 text-sm text-text outline-none focus:border-mint/60 transition-colors"
              >
                {CATEGORY_LIST.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-muted">resumo (opcional)</span>
              <input
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="bg-ink border border-line rounded px-3 py-2 text-sm text-text outline-none focus:border-mint/60 transition-colors"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-muted">conteúdo</span>
              <textarea
                required
                rows={8}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="bg-ink border border-line rounded px-3 py-2 text-sm text-text outline-none focus:border-mint/60 transition-colors resize-y"
              />
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="accent-mint"
              />
              <span className="font-mono text-xs text-muted">publicar imediatamente</span>
            </label>

            {error && <p className="font-mono text-xs text-coral">{'> erro: '}{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="bg-mint text-ink font-mono text-sm font-medium rounded px-4 py-2.5 hover:bg-mint/90 transition-colors disabled:opacity-60"
            >
              {saving ? 'salvando…' : 'salvar tutorial'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
