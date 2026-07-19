'use client';

import { useState } from 'react';
import TiltCard from '@/components/TiltCard';

const PECAS = [
  {
    id: 'cpu',
    label: 'Processador (CPU)',
    x: 50,
    y: 40,
    texto:
      'O processador é o "cérebro" do computador — executa as instruções dos programas. Quanto mais núcleos e mais alta a frequência (GHz), mais tarefas ele processa ao mesmo tempo.',
  },
  {
    id: 'ram',
    label: 'Memória RAM',
    x: 76,
    y: 38,
    texto:
      'A RAM guarda temporariamente os dados que o computador está usando no momento. Mais RAM significa rodar mais programas ao mesmo tempo sem travar.',
  },
  {
    id: 'placa',
    label: 'Placa-mãe',
    x: 38,
    y: 68,
    texto:
      'A placa-mãe conecta todos os componentes entre si — processador, memória, armazenamento e placas de expansão — e permite que eles conversem.',
  },
  {
    id: 'energia',
    label: 'Alimentação de energia',
    x: 24,
    y: 16,
    texto:
      'Essa área distribui e regula a energia que chega até o processador, garantindo voltagem estável mesmo quando ele está sob carga pesada.',
  },
];

export default function PCBuilder() {
  const [ativo, setAtivo] = useState(null);
  const peca = PECAS.find((p) => p.id === ativo);

  return (
    <div className="max-w-2xl mx-auto">
      <TiltCard>
        <div className="relative w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
          <img
            src="https://images.pexels.com/photos/18338405/pexels-photo-18338405.jpeg"
            alt="Processador montado em uma placa-mãe"
            className="w-full h-auto block"
          />

          {PECAS.map((p) => (
            <button
              key={p.id}
              onClick={() => setAtivo(p.id === ativo ? null : p.id)}
              aria-label={p.label}
              aria-pressed={ativo === p.id}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
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

      <div className="min-h-[92px] mt-6 bg-[#101014] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
        {peca ? (
          <>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7c5cff]">
              {peca.label}
            </span>
            <p className="text-sm text-[#c7c8cd] leading-relaxed mt-2">{peca.texto}</p>
          </>
        ) : (
          <p className="text-sm text-[#5c5e66]">
            Clique em um dos pontos na imagem pra saber o que é cada peça.
          </p>
        )}
      </div>
    </div>
  );
}
