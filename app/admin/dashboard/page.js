'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { categorias } from '@/lib/categorias';
import { gerarSlug } from '@/lib/slugify';

export default function AdminDashboard() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    category: categorias[0].slug,
    content: '',
    slug: '',
    image_url: '',
  });
  const [slugEditadoManualmente, setSlugEditadoManualmente] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/admin/login');
        return;
      }
      setCheckingAuth(false);
      loadArticles();
    }
    checkAuth();
  }, []);

  async function loadArticles() {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setArticles(data);
    setLoading(false);
  }

  function handleTitleChange(value) {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugEditadoManualmente ? f.slug : gerarSlug(value),
    }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.slug.trim()) return;

    setSaving(true);
    setErrorMsg('');

    const { error } = await supabase.from('articles').insert({
      title: form.title.trim(),
      category: form.category,
      content: form.content.trim(),
      slug: form.slug.trim(),
      image_url: form.image_url.trim() || null,
    });

    setSaving(false);

    if (error) {
      setErrorMsg(
        error.code === '23505'
          ? 'Já existe um artigo com esse endereço (slug). Mude o título ou o slug.'
          : 'Não foi possível publicar. Tente novamente.'
      );
      return;
    }

    setForm({ title: '', category: categorias[0].slug, content: '', slug: '', image_url: '' });
    setSlugEditadoManualmente(false);
    loadArticles();
  }

  async function handleDelete(id) {
    if (!confirm('Excluir este artigo?')) return;
    await supabase.from('articles').delete().eq('id', id);
    loadArticles();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  if (checkingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#eef4fb]">
        <p className="text-sm text-[#7b8794]">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef4fb] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-black text-2xl text-[#14213d]">Painel admin</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-[#7b8794] underline hover:text-[#14213d]"
          >
            Sair
          </button>
        </div>

        <form
          onSubmit={handleCreate}
          className="bg-white rounded-xl border border-[#e1e7ee] p-6 mb-8"
        >
          <h2 className="text-sm font-semibold text-[#14213d] mb-4">Novo artigo</h2>

          <label className="block text-xs font-medium text-[#4b5563] mb-1">Título</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full mb-4 py-2.5 px-3 rounded-lg border border-[#e1e7ee] text-sm outline-none focus:border-[#b7c3d1]"
          />

          <label className="block text-xs font-medium text-[#4b5563] mb-1">
            Endereço do artigo (slug)
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => {
              setSlugEditadoManualmente(true);
              setForm({ ...form, slug: e.target.value });
            }}
            required
            className="w-full mb-1 py-2.5 px-3 rounded-lg border border-[#e1e7ee] text-sm outline-none focus:border-[#b7c3d1] font-mono"
          />
          <p className="text-xs text-[#9aa4b0] mb-4">
            /tutoriais/{form.slug || 'exemplo-de-slug'}
          </p>

          <label className="block text-xs font-medium text-[#4b5563] mb-1">Categoria</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full mb-4 py-2.5 px-3 rounded-lg border border-[#e1e7ee] text-sm outline-none focus:border-[#b7c3d1] bg-white"
          >
            {categorias.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>

          <label className="block text-xs font-medium text-[#4b5563] mb-1">
            Imagem de capa (URL, opcional)
          </label>
          <input
            type="text"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            placeholder="https://..."
            className="w-full mb-4 py-2.5 px-3 rounded-lg border border-[#e1e7ee] text-sm outline-none focus:border-[#b7c3d1]"
          />

          <label className="block text-xs font-medium text-[#4b5563] mb-1">Conteúdo</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            rows={8}
            className="w-full mb-4 py-2.5 px-3 rounded-lg border border-[#e1e7ee] text-sm outline-none focus:border-[#b7c3d1]"
          />

          {errorMsg && <p className="text-sm text-red-500 mb-4">{errorMsg}</p>}

          <button
            type="submit"
            disabled={saving}
            className="py-2.5 px-5 rounded-lg bg-[#14213d] text-white text-sm font-semibold hover:bg-[#1d2c50] disabled:opacity-60"
          >
            {saving ? 'Publicando...' : 'Publicar'}
          </button>
        </form>

        <h2 className="text-sm font-semibold text-[#14213d] mb-3">
          Artigos publicados {!loading && `(${articles.length})`}
        </h2>

        {loading ? (
          <p className="text-sm text-[#7b8794]">Carregando artigos...</p>
        ) : articles.length === 0 ? (
          <p className="text-sm text-[#7b8794]">Nenhum artigo publicado ainda.</p>
        ) : (
          <ul className="space-y-3">
            {articles.map((article) => (
              <li
                key={article.id}
                className="bg-white rounded-xl border border-[#e1e7ee] p-4 flex items-start justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-semibold text-[#14213d]">{article.title}</p>
                  <p className="text-xs text-[#7b8794] mt-0.5">
                    {article.category} {article.slug ? `· /tutoriais/${article.slug}` : '· sem slug'}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="text-xs text-red-500 hover:underline shrink-0"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
