export const CATEGORIES = {
  programacao: {
    label: 'Programação',
    file: 'programacao.md',
    color: '#5EE6C7',
    className: 'mint',
    description: 'Linguagens, frameworks e boas práticas de código.',
  },
  informatica: {
    label: 'Informática',
    file: 'informatica.md',
    color: '#F5A94E',
    className: 'amber',
    description: 'Hardware, redes e fundamentos de computação.',
  },
  windows: {
    label: 'Windows',
    file: 'windows.md',
    color: '#6FA8FF',
    className: 'blue',
    description: 'Configuração, atalhos e resolução de problemas no Windows.',
  },
  celular: {
    label: 'Celular',
    file: 'celular.md',
    color: '#FF7E9E',
    className: 'coral',
    description: 'Android, iOS e o dia a dia com o smartphone.',
  },
};

export const CATEGORY_LIST = Object.entries(CATEGORIES).map(([slug, value]) => ({
  slug,
  ...value,
}));
