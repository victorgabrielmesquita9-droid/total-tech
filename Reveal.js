'use client';

import { useMemo, useState } from 'react';

const CATEGORIAS = [
  {
    id: 'cpu',
    label: 'Processador',
    opcoes: [
      { nome: 'Intel Core i3 (13ª Ger)', preco: 780, watts: 65, tags: ['Vídeo integrado'], desc: 'Entrada — navegação, estudo e vídeo sem esforço.' },
      { nome: 'AMD Ryzen 5 5600G', preco: 850, watts: 65, tags: ['Vídeo integrado'], desc: 'Já vem com vídeo integrado, ótimo custo-benefício pro dia a dia.' },
      { nome: 'AMD Ryzen 5 7600', preco: 1100, watts: 65, tags: ['Sem vídeo integrado'], desc: 'Bom equilíbrio pra jogos atuais em 1080p/1440p com uma GPU dedicada.' },
      { nome: 'Intel Core i5-12400', preco: 1300, watts: 65, tags: ['Sem vídeo integrado'], desc: 'Forte em jogos e tarefas do dia a dia, plataforma bem estabelecida.' },
      { nome: 'AMD Ryzen 7 7700', preco: 1800, watts: 105, tags: ['Sem vídeo integrado'], desc: 'Pra multitarefa pesada, edição de vídeo e streaming ao mesmo tempo.' },
      { nome: 'Intel Core Ultra 5 250KF Plus', preco: 1480, watts: 125, tags: ['Sem vídeo integrado', '18 núcleos'], desc: '18 núcleos — ótimo pra quem roda muitos processos em paralelo.' },
      { nome: 'Intel Core Ultra 7 270K Plus', preco: 2700, watts: 125, tags: ['Vídeo integrado', '24 núcleos'], desc: 'Topo de linha Intel atual — 24 núcleos, ideal pra criação de conteúdo pesada.' },
    ],
  },
  {
    id: 'cooler',
    label: 'Cooler',
    opcoes: [
      { nome: 'Cooler Box (que acompanha o processador)', preco: 0, watts: 0, tags: ['Básico'], desc: 'Resolve, mas é o mais barulhento e menos eficiente das opções.' },
      { nome: 'Cooler a ar de 1 torre', preco: 150, watts: 0, tags: ['Silencioso'], desc: 'Bom custo-benefício — mais silencioso e eficiente que o cooler box.' },
      { nome: 'Water cooler 120mm', preco: 350, watts: 0, tags: ['Refrigeração líquida'], desc: 'Temperaturas mais baixas, indicado pra processadores que esquentam mais.' },
      { nome: 'Water cooler 240mm', preco: 550, watts: 0, tags: ['Alto desempenho'], desc: 'Pra overclock ou processadores de ponta — refrigeração máxima.' },
    ],
  },
  {
    id: 'placaMae',
    label: 'Placa-mãe',
    opcoes: [
      { nome: 'B450 / H610', preco: 550, watts: 0, tags: ['Entrada'], desc: 'Atende processadores de entrada, pouco espaço pra upgrades futuros.' },
      { nome: 'B650M', preco: 800, watts: 0, tags: ['Intermediária'], desc: 'Suporta processadores mais novos e permite evoluir o PC depois.' },
      { nome: 'B650 / X670', preco: 1200, watts: 0, tags: ['Alto desempenho'], desc: 'Mais slots e melhor entrega de energia pro processador.' },
    ],
  },
  {
    id: 'ram',
    label: 'Memória RAM',
    opcoes: [
      { nome: '16GB DDR5', preco: 340, watts: 0, tags: ['Padrão atual'], desc: 'Referência pra jogos e uso geral — abre vários programas sem travar.' },
      { nome: '32GB DDR5', preco: 750, watts: 0, tags: ['Multitarefa'], desc: 'Pra edição de vídeo/imagem, máquinas virtuais ou multitarefa pesada.' },
      { nome: '64GB DDR5', preco: 1400, watts: 0, tags: ['Estação de trabalho'], desc: 'Cargas bem específicas — a maioria das pessoas não precisa disso.' },
    ],
  },
  {
    id: 'gpu',
    label: 'Placa de vídeo',
    opcoes: [
      { nome: 'Integrada (sem placa dedicada)', preco: 0, watts: 0, tags: ['Uso comum'], desc: 'Usa o vídeo do processador — não serve pra jogos pesados.' },
      { nome: 'RTX 3050 (entrada dedicada)', preco: 1400, watts: 130, tags: ['Entrada gamer'], desc: 'Primeira placa dedicada — jogos leves e e-sports em 1080p.' },
      { nome: 'RTX 5060 / RX 9060', preco: 3200, watts: 170, tags: ['Intermediária'], desc: 'Ponto de equilíbrio 2026 — maioria dos jogos atuais em 1080p/1440p.' },
      { nome: 'RTX 5070 Ti ou superior', preco: 5500, watts: 285, tags: ['Alto desempenho'], desc: 'Jogos em 1440p/4K no máximo, ou IA e edição 3D pesada.' },
    ],
  },
  {
    id: 'storage',
    label: 'HD & SSD',
    opcoes: [
      { nome: 'SSD NVMe 512GB', preco: 320, watts: 0, tags: ['Essencial'], desc: 'Suficiente pro sistema, programas e alguns jogos.' },
      { nome: 'SSD NVMe 1TB', preco: 550, watts: 0, tags: ['Recomendado'], desc: 'Espaço confortável pra sistema + boa biblioteca de jogos.' },
      { nome: 'SSD NVMe 2TB', preco: 950, watts: 0, tags: ['Biblioteca grande'], desc: 'Pra quem tem muitos jogos, vídeos ou arquivos de trabalho.' },
      { nome: 'HD 1TB (armazenamento extra)', preco: 280, watts: 0, tags: ['Complemento barato'], desc: 'Bom como espaço extra pra arquivos que não precisam de velocidade.' },
    ],
  },
  {
    id: 'gabinete',
    label: 'Gabinete',
    opcoes: [
      { nome: 'Gabinete simples', preco: 200, watts: 0, tags: ['Básico'], desc: 'Sem frescura, cumpre o papel de acomodar e ventilar as peças.' },
      { nome: 'Gabinete com fans RGB', preco: 350, watts: 0, tags: ['Visual'], desc: 'Boa ventilação com iluminação — visual mais chamativo.' },
      { nome: 'Gabinete premium (vidro temperado)', preco: 550, watts: 0, tags: ['Premium'], desc: 'Lateral em vidro, melhor fluxo de ar e acabamento.' },
    ],
  },
  {
    id: 'fonte',
    label: 'Fonte',
    opcoes: [
      { nome: '450W 80 Plus', preco: 250, watts: 450, tags: ['Entrada'], desc: 'Atende builds sem placa de vídeo dedicada ou com GPU de entrada.' },
      { nome: '600W 80 Plus Bronze', preco: 400, watts: 600, tags: ['Intermediária'], desc: 'Boa margem pra builds com GPU intermediária.' },
      { nome: '750W 80 Plus Bronze/Gold', preco: 600, watts: 750, tags: ['Recomendada'], desc: 'Folga confortável pra maioria das configurações com GPU dedicada.' },
      { nome: '850W+ 80 Plus Gold', preco: 800, watts: 850, tags: ['Alto desempenho'], desc: 'Pra builds de ponta ou com espaço pra upgrades futuros de GPU.' },
    ],
  },
];

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export default function PCConfigurator() {
  const [abaAtiva, setAbaAtiva] = useState(CATEGORIAS[0].id);
  const [busca, setBusca] = useState('');
  const [selecao, setSelecao] = useState(
    Object.fromEntries(CATEGORIAS.map((c) => [c.id, null]))
  );

  const categoriaAtual = CATEGORIAS.find((c) => c.id === abaAtiva);
  const opcoesFiltradas = categoriaAtual.opcoes.filter((op) =>
    op.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const escolhidos = CATEGORIAS.map((c) => ({
    categoria: c,
    opcao: selecao[c.id] !== null ? c.opcoes[selecao[c.id]] : null,
  }));

  const totalCartao = escolhidos.reduce((s, e) => s + (e.opcao?.preco || 0), 0);
  const totalPix = totalCartao * 0.85;
  const numEscolhidos = escolhidos.filter((e) => e.opcao).length;
  const percentual = Math.round((numEscolhidos / CATEGORIAS.length) * 100);

  const consumo = useMemo(() => {
    const wattsComponentes = escolhidos.reduce((s, e) => s + (e.opcao?.watts && e.categoria.id !== 'fonte' ? e.opcao.watts : 0), 0);
    const recomendado = wattsComponentes > 0 ? wattsComponentes + 120 : null;
    const fonteEscolhida = selecao.fonte !== null ? CATEGORIAS.find((c) => c.id === 'fonte').opcoes[selecao.fonte] : null;
    return { recomendado, fonteWatts: fonteEscolhida?.watts || null };
  }, [selecao]);

  function selecionar(catId, idx) {
    setSelecao((s) => ({ ...s, [catId]: idx }));
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      {/* seletor por categorias */}
      <div>
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1">
          {CATEGORIAS.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setAbaAtiva(c.id);
                setBusca('');
              }}
              className={`shrink-0 text-[13px] px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
                abaAtiva === c.id
                  ? 'bg-[#7c5cff] border-[#7c5cff] text-white'
                  : 'border-[rgba(255,255,255,0.1)] text-[#8d8f97] hover:text-[#f4f3ef]'
              }`}
            >
              {c.label}
              {selecao[c.id] !== null && ' ✓'}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder={`Buscar em ${categoriaAtual.label.toLowerCase()}...`}
          className="w-full py-2.5 px-4 rounded-full bg-[#101014] border border-[rgba(255,255,255,0.1)] text-sm text-[#f4f3ef] placeholder-[#5c5e66] outline-none focus:border-[#7c5cff] transition-colors mb-4"
        />

        <div className="space-y-2">
          {opcoesFiltradas.length === 0 && (
            <p className="text-sm text-[#5c5e66] py-4">Nenhum item encontrado.</p>
          )}
          {opcoesFiltradas.map((op) => {
            const idxReal = categoriaAtual.opcoes.indexOf(op);
            const ativo = selecao[abaAtiva] === idxReal;
            return (
              <button
                key={op.nome}
                onClick={() => selecionar(abaAtiva, idxReal)}
                className={`w-full text-left rounded-xl border p-4 flex items-center justify-between gap-4 transition-colors ${
                  ativo
                    ? 'border-[#7c5cff] bg-[#7c5cff]/10'
                    : 'border-[rgba(255,255,255,0.08)] bg-[#101014] hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-[#f4f3ef] mb-1">{op.nome}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {op.tags.map((t) => (
                      <span key={t} className="text-[11px] text-[#8d8f97] bg-white/5 rounded px-1.5 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-[#22d3ee]">
                    {op.preco === 0 ? 'Incluso' : formatarPreco(op.preco * 0.85)}
                  </p>
                  {op.preco > 0 && <p className="text-[11px] text-[#5c5e66]">no PIX</p>}
                </div>
              </button>
            );
          })}
        </div>

        {selecao[abaAtiva] !== null && (
          <p className="text-[13px] text-[#8d8f97] leading-relaxed mt-4 px-1">
            {categoriaAtual.opcoes[selecao[abaAtiva]].desc}
          </p>
        )}
      </div>

      {/* resumo fixo */}
      <div className="space-y-4 lg:sticky lg:top-6 h-fit">
        <div className="bg-[#101014] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5">
          <p className="text-[13px] text-[#8d8f97] mb-1">Total no PIX (15% de desconto)</p>
          <p className="font-display font-semibold text-2xl text-[#f4f3ef] mb-1">
            {formatarPreco(totalPix)}
          </p>
          <p className="text-[12px] text-[#5c5e66]">
            ou {formatarPreco(totalCartao)} no cartão, em até 10x sem juros
          </p>
        </div>

        <div className="bg-[#101014] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[13px] font-semibold text-[#f4f3ef]">Status da montagem</p>
            <span className="text-[13px] text-[#8d8f97]">{numEscolhidos} de {CATEGORIAS.length}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-[#7c5cff] transition-all duration-500"
              style={{ width: `${percentual}%` }}
            />
          </div>
        </div>

        <div className="bg-[#101014] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5">
          <p className="text-[13px] font-semibold text-[#f4f3ef] mb-2">Consumo de energia</p>
          {!consumo.recomendado ? (
            <p className="text-[13px] text-[#5c5e66]">Escolha processador e placa de vídeo pra estimar.</p>
          ) : (
            <>
              <p className="text-[13px] text-[#8d8f97] mb-1">
                Recomendado: <span className="text-[#f4f3ef]">~{consumo.recomendado}W</span>
              </p>
              {consumo.fonteWatts ? (
                <p className={`text-[13px] ${consumo.fonteWatts >= consumo.recomendado ? 'text-[#22d3ee]' : 'text-[#ff6f91]'}`}>
                  {consumo.fonteWatts >= consumo.recomendado
                    ? `Sua fonte de ${consumo.fonteWatts}W aguenta com folga.`
                    : `Sua fonte de ${consumo.fonteWatts}W pode ser insuficiente.`}
                </p>
              ) : (
                <p className="text-[13px] text-[#5c5e66]">Escolha uma fonte pra comparar.</p>
              )}
            </>
          )}
        </div>

        <p className="text-[11px] text-[#5c5e66] leading-relaxed px-1">
          Ferramenta educativa — valores são estimativas de mercado (2026) e essa montagem não é enviada nem processada como pedido real.
        </p>
      </div>
    </div>
  );
}
