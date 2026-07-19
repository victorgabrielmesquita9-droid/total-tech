'use client';

import { useState } from 'react';
import TiltCard from '@/components/TiltCard';

const PARTES = [
  {
    id: 'tela',
    label: 'Tela',
    x: 50,
    y: 28,
    texto:
      'É onde as imagens são exibidas. A qualidade é medida pela resolução (quantos pixels) e pela taxa de atualização, em Hz — quantas vezes a imagem é redesenhada por segundo.',
  },
  {
    id: 'webcam',
    label: 'Webcam',
    x: 50,
    y: 9,
    texto:
      'Fica geralmente na borda de cima da tela e captura vídeo — usada em chamadas, videoconferências e reconhecimento facial.',
  },
  {
    id: 'teclado',
    label: 'Teclado',
    x: 50,
    y: 76,
    texto:
      'Cada tecla é um interruptor que avisa ao computador qual caractere ou comando foi pressionado. Um bom teclado tem curso de tecla confortável e resposta rápida.',
  },
  {
    id: 'touchpad',
    label: 'Touchpad',
    x: 50,
    y: 92,
    texto:
      'Substitui o mouse em notebooks — sente o movimento e a pressão dos dedos pra mover o cursor e simular cliques.',
  },
];

export default function OpenLaptop() {
  const [open, setOpen] = useState(false);
  const [ativo, setAtivo] = useState(null);
  const parte = PARTES.find((p) => p.id === ativo);

  function toggleAberto() {
    setOpen((o) => !o);
    setAtivo(null);
  }

  return (
    <div className="max-w-md mx-auto flex flex-col items-center">
      <TiltCard className="w-full">
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]"
          style={{ aspectRatio: '4 / 3' }}
        >
          <button
            type="button"
            onClick={toggleAberto}
            aria-pressed={open}
            aria-label={open ? 'Fechar o notebook' : 'Abrir o notebook'}
            className="absolute inset-0 z-10"
          >
            <img
              src="https://images.pexels.com/photos/13073600/pexels-photo-13073600.jpeg"
              alt="Notebook fechado"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: open ? 0 : 1 }}
            />
            <img
              src="https://images.pexels.com/photos/6424589/pexels-photo-6424589.jpeg"
              alt="Notebook aberto, mostrando código na tela"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: open ? 1 : 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </button>

          {open &&
            PARTES.map((p) => (
              <button
                key={p.id}
                onClick={() => setAtivo(p.id === ativo ? null : p.id)}
                aria-label={p.label}
                aria-pressed={ativo === p.id}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
              >
                <span
                  className={`absolute inset-0 rounded-full bg-[#7c5cff] ${
                    ativo === p.id ? 'opacity-30' : 'opacity-25 animate-ping'
                  }`}
                />
                <span
                  className={`relative w-3 h-3 rounded-full border-2 border-white transition-colors ${
                    ativo === p.id ? 'bg-[#7c5cff]' : 'bg-[#22d3ee]'
                  }`}
                />
              </button>
            ))}
        </div>
      </TiltCard>

      <p className="text-[13px] text-[#5c5e66] mt-6">
        {open ? 'Clique na foto pra fechar' : 'Clique na foto pra abrir'}
      </p>

      {open && (
        <div className="w-full min-h-[92px] mt-4 bg-[#101014] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
          {parte ? (
            <>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7c5cff]">
                {parte.label}
              </span>
              <p className="text-sm text-[#c7c8cd] leading-relaxed mt-2">{parte.texto}</p>
            </>
          ) : (
            <p className="text-sm text-[#5c5e66]">
              Clique em um dos pontos na foto pra saber o que é cada parte.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
