'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TerminalSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('subscribers').insert({ email });

    if (error) {
      setStatus('error');
      setErrorMsg(
        error.code === '23505'
          ? 'esse e-mail já está na lista.'
          : 'algo deu errado. tenta de novo em instantes.'
      );
      return;
    }

    setStatus('done');
  }

  if (status === 'done') {
    return (
      <div className="w-full max-w-lg font-mono text-sm rounded-md border border-mint/30 bg-mint/5 px-4 py-3 text-mint">
        <span className="mr-2">{'>'}</span>
        inscrito! avisamos assim que o primeiro tutorial sair.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex items-stretch rounded-md border border-line bg-surface focus-within:border-mint/60 transition-colors overflow-hidden">
        <span className="flex items-center pl-4 pr-1 font-mono text-sm text-mint select-none">
          $ inscrever --email
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          className="flex-1 bg-transparent px-2 py-3 font-mono text-sm text-text placeholder:text-muted outline-none min-w-0"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 font-mono text-sm font-medium bg-mint text-ink hover:bg-mint/90 transition-colors disabled:opacity-60 shrink-0"
        >
          {status === 'loading' ? 'enviando…' : 'avisar-me'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-2 text-xs font-mono text-coral">{'> erro: '}{errorMsg}</p>
      )}
      <p className="mt-2 text-xs font-mono text-muted">
        sem spam — só um e-mail quando o primeiro tutorial for publicado.
      </p>
    </form>
  );
}
