-- Rode este script no Supabase: Project > SQL Editor > New query

-- Tabela de artigos/tutoriais
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'geral',
  content text not null,
  slug text,
  image_url text,
  created_at timestamptz not null default now()
);

create unique index if not exists articles_slug_unique
  on articles (slug)
  where slug is not null;

-- Tabela de inscritos (captura de e-mail da página "em breve")
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Ativa Row Level Security (obrigatório no Supabase)
alter table articles enable row level security;
alter table subscribers enable row level security;

-- Qualquer pessoa pode ler os artigos (site público)
create policy "Artigos são públicos para leitura"
  on articles for select
  using (true);

-- Só usuários autenticados (você, no admin) podem criar/editar/excluir artigos
create policy "Só admin pode inserir artigos"
  on articles for insert
  to authenticated
  with check (true);

create policy "Só admin pode editar artigos"
  on articles for update
  to authenticated
  using (true);

create policy "Só admin pode excluir artigos"
  on articles for delete
  to authenticated
  using (true);

-- Qualquer pessoa pode se inscrever (formulário da página "em breve")
create policy "Qualquer um pode se inscrever"
  on subscribers for insert
  to anon, authenticated
  with check (true);

-- Só admin pode ver a lista de inscritos
create policy "Só admin vê os inscritos"
  on subscribers for select
  to authenticated
  using (true);
