export const categorias = [
  { label: 'Programação', slug: 'programacao' },
  { label: 'Informática', slug: 'informatica' },
  { label: 'Windows', slug: 'windows' },
  { label: 'Celulares', slug: 'celulares' },
];

export function labelDaCategoria(slug) {
  const encontrada = categorias.find((c) => c.slug === slug);
  return encontrada ? encontrada.label : slug;
}
