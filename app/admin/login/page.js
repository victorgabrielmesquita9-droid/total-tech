'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError('E-mail ou senha inválidos.');
      return;
    }

    router.push('/admin/dashboard');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#eef4fb] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-[#e1e7ee] p-8"
      >
        <h1 className="font-display font-black text-2xl text-[#14213d] mb-1">Admin</h1>
        <p className="text-sm text-[#7b8794] mb-6">Entre para gerenciar o site.</p>

        <label className="block text-xs font-medium text-[#4b5563] mb-1">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 py-2.5 px-3 rounded-lg border border-[#e1e7ee] text-sm outline-none focus:border-[#b7c3d1]"
        />

        <label className="block text-xs font-medium text-[#4b5563] mb-1">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-5 py-2.5 px-3 rounded-lg border border-[#e1e7ee] text-sm outline-none focus:border-[#b7c3d1]"
        />

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-[#14213d] text-white text-sm font-semibold hover:bg-[#1d2c50] disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}
