'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    const { error } = await supabase.from('subscribers').insert({ email: email.trim() });

    if (error) {
      // e-mail duplicado ou outro erro do Supabase
      setStatus('error');
      setErrorMsg(
        error.code === '23505'
          ? 'Esse e-mail já está inscrito.'
          : 'Não foi possível inscrever agora. Tente novamente.'
      );
      return;
    }

    setStatus('success');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#eef4fb] px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="font-display font-black text-4xl mb-4 text-[#14213d]">
          Em breve!
        </h1>
        <p className="text-sm text-[#7b8794] mb-7">
          Seja o primeiro a saber quando lançarmos.
        </p>

        {status !== 'success' && (
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              autoComplete="email"
              aria-label="Seu e-mail"
              className="w-full py-3.5 pl-4 pr-12 rounded-[10px] border border-[#e1e7ee] bg-white text-sm text-[#14213d] placeholder-[#9aa4b0] outline-none shadow-sm focus:border-[#b7c3d1] focus-visible:ring-2 focus-visible:ring-[#14213d]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-label="Enviar"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-[#f1f4f8] focus-visible:ring-2 focus-visible:ring-[#14213d]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>
        )}

        {status === 'success' && (
          <p className="text-sm text-green-600 mt-2">Obrigado por se inscrever!</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-500 mt-2">{errorMsg}</p>
        )}

        <p className="mt-6 text-[13px] text-[#7b8794]">
          Você é o dono do site?{' '}
          <a href="/admin/login" className="font-semibold text-[#14213d] underline">
            Faça login aqui
          </a>
        </p>
      </div>
    </main>
  );
}
