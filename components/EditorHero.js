'use client';

import { useEffect, useState } from 'react';
import { CATEGORY_LIST } from '@/lib/categories';

const DRAFTS = {
  programacao: [
    'Como entender closures em JavaScript de vez',
    'Git para quem trava toda vez que dá conflito',
    'APIs REST explicadas com um exemplo real',
  ],
  informatica: [
    'Por que seu PC trava: um guia de diagnóstico',
    'SSD vs HD: o que muda na prática',
    'Redes domésticas sem mistério',
  ],
  windows: [
    'Atalhos do Windows que economizam horas',
    'Limpando a inicialização do jeito certo',
    'Resolvendo o erro de atualização mais comum',
  ],
  celular: [
    'Liberando espaço no Android sem apagar fotos',
    'Ajustes de bateria que realmente funcionam',
    'Transferindo tudo pro celular novo sem perrengue',
  ],
};

export default function EditorHero() {
  const [active, setActive] = useState('programacao');
  const [draftIndex, setDraftIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState('typing');

  const drafts = DRAFTS[active];
  const fullText = drafts[draftIndex % drafts.length];

  useEffect(() => {
    setTyped('');
    setPhase('typing');
  }, [active]);

  useEffect(() => {
    let timeout;
    if (phase === 'typing') {
      if (typed.length < fullText.length) {
        timeout = setTimeout(() => {
          setTyped(fullText.slice(0, typed.length + 1));
        }, 28);
      } else {
        timeout = setTimeout(() => setPhase('holding'), 1400);
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('deleting'), 200);
    } else if (phase === 'deleting') {
      if (typed.length > 0) {
        timeout = setTimeout(() => {
          setTyped(typed.slice(0, -1));
        }, 14);
      } else {
        timeout = setTimeout(() => {
          setDraftIndex((i) => i + 1);
          setPhase('typing');
        }, 200);
      }
    }
    return () => clearTimeout(timeout);
  }, [typed, phase, fullText]);

  const activeCat = CATEGORY_LIST.find((c) => c.slug === active);

  return (
    <div className="w-full max-w-3xl rounded-lg border border-line bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.02)] overflow-hidden animate-rise">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-surface2/60">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
        <span className="ml-3 text-xs text-muted font-mono">~/tutoriais.dev/rascunhos</span>
      </div>

      {/* tabs */}
      <div className="flex overflow-x-auto border-b border-line bg-ink/40">
        {CATEGORY_LIST.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={`shrink-0 px-4 py-2.5 text-xs font-mono border-r border-line transition-colors ${
              active === cat.slug
                ? 'text-text bg-surface'
                : 'text-muted hover:text-text bg-transparent'
            }`}
            style={{
              borderTop:
                active === cat.slug ? `2px solid ${cat.color}` : '2px solid transparent',
            }}
          >
            {cat.file}
          </button>
        ))}
      </div>

      {/* editor body */}
      <div className="p-6 sm:p-8 font-mono text-sm leading-relaxed">
        <p className="text-muted">
          <span className="text-line select-none mr-3">01</span>
          <span className="text-muted">{'// domine tecnologia, um tutorial de cada vez'}</span>
        </p>
        <p className="mt-1">
          <span className="text-line select-none mr-3">02</span>
          <span className="text-muted">{'// próxima publicação:'}</span>
        </p>
        <p className="mt-1 min-h-[1.5em]">
          <span className="text-line select-none mr-3">03</span>
          <span
            className="text-xs px-1.5 py-0.5 rounded mr-2 align-middle"
            style={{ background: `${activeCat.color}1a`, color: activeCat.color }}
          >
            {activeCat.label}
          </span>
          <span className="text-text align-middle">{typed}</span>
          <span className="caret text-mint align-middle" aria-hidden="true" />
        </p>
        <p className="mt-3">
          <span className="text-line select-none mr-3">04</span>
          <span className="text-muted">{'// status: '}</span>
          <span className="text-amber">em construção</span>
        </p>
      </div>
    </div>
  );
}
