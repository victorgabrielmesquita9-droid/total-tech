'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import MagneticButton from '@/components/MagneticButton';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    const { error } = await supabase.from('subscribers').insert({ email: email.trim() });

    if (error) {
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

  if (status === 'success') {
    return <p className="text-sm text-[#22d3ee]">Inscrição confirmada — obrigado.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-sm mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        required
        autoComplete="email"
        aria-label="Seu e-mail"
        className="flex-1 py-3 px-4 rounded-full bg-[#101014] border border-[rgba(255,255,255,0.1)] text-sm text-[#f4f3ef] placeholder-[#5c5e66] outline-none focus:border-[#7c5cff] transition-colors"
      />
      <MagneticButton>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="text-sm font-medium text-[#07070a] bg-[#f4f3ef] rounded-full px-5 py-3 hover:bg-white transition-colors whitespace-nowrap"
        >
          Inscrever
        </button>
      </MagneticButton>
      {status === 'error' && <p className="text-xs text-red-400 mt-2">{errorMsg}</p>}
    </form>
  );
}
