'use client';

import { useState } from 'react';

const CATEGORIAS = [
  {
    id: 'processador',
    label: 'Processador',
    opcoes: [
      {
        nome: 'Entrada — Ryzen 5 5600G',
        preco: 850,
        desc: 'Já vem com vídeo integrado — ótimo pra tarefas do dia a dia, estudo e vídeo, sem precisar de placa de vídeo separada.',
      },
      {
        nome: 'Intermediário — Ryzen 5 7600',
        preco: 1100,
        desc: 'Bom equilíbrio entre preço e desempenho — ideal pra jogos atuais em 1080p/1440p com uma placa de vídeo dedicada.',
      },
      {
        nome: 'Alto desempenho — Ryzen 7 / Core i7',
        preco: 1800,
        desc: 'Pra quem edita vídeo, roda várias tarefas pesadas ao mesmo tempo ou quer o máximo de taxa de quadros em jogos.',
      },
    ],
  },
  {
    id: 'placaMae',
    label: 'Placa-mãe',
    opcoes: [
      {
        nome: 'Entrada — B450 / H610',
        preco: 550,
        desc: 'Atende bem processadores de entrada, com pouco espaço pra upgrades futuros.',
      },
      {
        nome: 'Intermediária — B650M',
        preco: 800,
        desc: 'Suporta processadores mais novos e dá espaço pra evoluir o PC depois.',
      },
      {
        nome: 'Alto desempenho — B650 / X670',
        preco: 1200,
        desc: 'Mais slots, melhor entrega de energia pro processador e recursos extras de conectividade.',
      },
    ],
  },
  {
    id: 'ram',
    label: 'Memória RAM',
    opcoes: [
      { nome: '16GB DDR5', preco: 340, desc: 'Referência atual pra jogos e uso geral — abre vários programas sem travar.' },
      { nome: '32GB DDR5', preco: 750, desc: 'Ideal pra quem edita vídeo/imagem, roda máquinas virtuais ou faz multitarefa pesada.' },
      { nome: '64GB DDR5', preco: 1400, desc: 'Pra estações de trabalho e cargas bem específicas — a maioria não precisa disso.' },
    ],
  },
  {
    id: 'armazenamento',
    label: 'Armazenamento',
    opcoes: [
      { nome: 'SSD NVMe 512GB', preco: 320, desc: 'Suficiente pro sistema, programas e alguns jogos.' },
      { nome: 'SSD NVMe 1TB', preco: 550, desc: 'Espaço confortável pra sistema + uma boa biblioteca de jogos e arquivos.' },
      { nome: 'SSD NVMe 2TB', preco: 950, desc: 'Pra quem tem biblioteca grande de jogos, vídeos ou arquivos de trabalho.' },
    ],
  },
  {
    id: 'gpu',
    label: 'Placa de vídeo',
    opcoes: [
      {
        nome: 'Integrada (sem placa dedicada)',
        preco: 0,
        desc: 'Usa o vídeo já embutido no processador — funciona bem pra uso comum, não pra jogos pesados.',
      },
      {
        nome: 'Intermediária — RTX 5060 / RX 9060',
        preco: 3200,
        desc: 'O ponto de equilíbrio de 2026: roda a maioria dos jogos atuais em 1080p/1440p com boa qualidade.',
      },
      {
        nome: 'Alto desempenho — RTX 5070 Ti ou superior',
        preco: 5500,
        desc: 'Pra jogos em 1440p/4K no máximo, ou trabalho pesado com IA e edição 3D.',
      },
    ],
  },
];

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export default function PCConfigurator() {
  const [selecao, setSelecao] = useState(
    Object.fromEntries(CATEGORIAS.map((c) => [c.id, 0]))
  );

  const total = CATEGORIAS.reduce(
    (soma, c) => soma + c.opcoes[selecao[c.id]].preco,
    0
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-8">
        {CATEGORIAS.map((cat) => {
          const idx = selecao[cat.id];
          return (
            <div key={cat.id}>
              <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[#8d8f97] mb-3">
                {cat.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {cat.opcoes.map((op, i) => (
                  <button
                    key={op.nome}
                    onClick={() => setSelecao((s) => ({ ...s, [cat.id]: i }))}
                    aria-pressed={idx === i}
                    className={`text-left rounded-xl border p-3.5 transition-colors ${
                      idx === i
                        ? 'border-[#7c5cff] bg-[#7c5cff]/10'
                        : 'border-[rgba(255,255,255,0.08)] bg-[#101014] hover:border-[rgba(255,255,255,0.2)]'
                    }`}
                  >
                    <p className="text-sm font-medium text-[#f4f3ef] leading-snug mb-1">{op.nome}</p>
                    <p className="text-[13px] text-[#7c5cff] font-semibold">
                      {op.preco === 0 ? 'Incluso' : `+ ${formatarPreco(op.preco)}`}
                    </p>
                  </button>
                ))}
              </div>
              <p className="text-[13px] text-[#8d8f97] leading-relaxed mt-2.5">
                {cat.opcoes[idx].desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 bg-[#101014] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[13px] text-[#8d8f97] mb-1">Total estimado da sua montagem</p>
          <p className="font-display font-semibold text-3xl text-[#f4f3ef]">
            {formatarPreco(total)}
          </p>
        </div>
        <p className="text-[12px] text-[#5c5e66] max-w-[200px]">
          Valores aproximados de mercado (2026), só como referência — preços reais variam por loja, promoção e região.
        </p>
      </div>
    </div>
  );
}
