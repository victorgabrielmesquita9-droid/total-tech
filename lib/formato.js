export function tempoDeLeitura(texto) {
  if (!texto) return '1 min';
  const palavras = texto.trim().split(/\s+/).length;
  const minutos = Math.max(1, Math.round(palavras / 200));
  return `${minutos} min de leitura`;
}

export function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
