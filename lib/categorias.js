export const categorias = [
  {
    label: 'Programação',
    slug: 'programacao',
    imagem: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg',
  },
  {
    label: 'Informática',
    slug: 'informatica',
    imagem: 'https://images.pexels.com/photos/18338405/pexels-photo-18338405.jpeg',
  },
  {
    label: 'Windows',
    slug: 'windows',
    imagem: 'https://images.pexels.com/photos/30469968/pexels-photo-30469968.jpeg',
  },
  {
    label: 'Celulares',
    slug: 'celulares',
    imagem: 'https://images.pexels.com/photos/12879428/pexels-photo-12879428.jpeg',
  },
];

export function labelDaCategoria(slug) {
  const encontrada = categorias.find((c) => c.slug === slug);
  return encontrada ? encontrada.label : slug;
}
