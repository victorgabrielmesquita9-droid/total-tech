'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus('error');
      setErrorMsg('e-mail ou senha incorretos.');
      return;
    }

    router.push('/admin/dashboard');
  }

  return (
    <main className="min-h-screen dot-grid flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-tight text-text mb-8 block text-center"
        >
          tutoriais<span className="text-mint">.dev</span>
        </Link>

        <div className="rounded-lg border border-line bg-surface overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-surface2/60">
            <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
            <span className="ml-3 text-xs text-muted font-mono">admin/login.sh</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-muted">e-mail</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-ink border border-line rounded px-3 py-2 text-sm text-text outline-none focus:border-mint/60 transition-colors font-mono"
                placeholder="voce@email.com"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-muted">senha</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-ink border border-line rounded px-3 py-2 text-sm text-text outline-none focus:border-mint/60 transition-colors font-mono"
                placeholder="••••••••"
              />
            </label>

            {status === 'error' && (
              <p className="font-mono text-xs text-coral">{'> erro: '}{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 bg-mint text-ink font-mono text-sm font-medium rounded px-4 py-2.5 hover:bg-mint/90 transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'entrando…' : 'entrar'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
