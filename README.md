# tutoriais.dev

Site de tutoriais (programação, informática, Windows, celulares) com landing
"em breve", listagem/leitura de tutoriais e painel de administração para
publicar/excluir artigos.

**Stack:** Next.js (App Router) + Tailwind CSS + Supabase (banco de dados +
autenticação) + Vercel (hospedagem)

## Direção visual

O design se inspira no universo de quem programa: abas de editor de código,
terminal e syntax highlighting. Fundo azul-tinta (não preto puro), tipografia
`JetBrains Mono` para títulos e `Inter` para o corpo do texto, e cada
categoria tem sua própria cor (como tags de editor): Programação (menta),
Informática (âmbar), Windows (azul), Celular (coral).

O elemento central da home é o "editor" no hero: abas por categoria e uma
linha que digita, em tempo real, os próximos títulos de tutoriais sendo
escritos — reforçando a mensagem de "em breve" sem usar um contador genérico.

## 1. Criar o projeto no Supabase

1. Acesse https://supabase.com e crie uma conta (grátis).
2. Clique em **New Project**, escolha um nome e uma senha para o banco.
3. Aguarde o projeto ser criado (leva ~1-2 min).

## 2. Criar as tabelas

1. No painel do Supabase, vá em **SQL Editor > New query**.
2. Copie todo o conteúdo do arquivo `schema.sql` (nesta pasta) e cole lá.
3. Clique em **Run**. Isso cria as tabelas `articles` e `subscribers`,
   as políticas de acesso e os índices usados pela listagem.

## 3. Criar seu usuário de admin

1. No painel do Supabase, vá em **Authentication > Users**.
2. Clique em **Add user > Create new user**.
3. Coloque seu e-mail e uma senha — esse é o login que você vai usar em
   `/admin/login`.

## 4. Pegar as chaves da API

1. No painel do Supabase, vá em **Project Settings > API**.
2. Copie a **Project URL** e a chave **anon public**.
3. Nesta pasta do projeto, renomeie `.env.local.example` para `.env.local`.
4. Cole a URL e a chave nos campos correspondentes.

## 5. Instalar e rodar localmente

Você vai precisar do [Node.js](https://nodejs.org) instalado (versão 18 ou
superior).

```bash
npm install
npm run dev
```

Acesse:
- **http://localhost:3000** → landing "em breve"
- **http://localhost:3000/tutoriais** → listagem de tutoriais publicados
- **http://localhost:3000/tutoriais/[slug]** → leitura de um tutorial
- **http://localhost:3000/admin/login** → login do admin
- **http://localhost:3000/admin/dashboard** → painel para publicar/excluir artigos

## 6. Colocar no ar (deploy)

1. Suba esta pasta para um repositório no GitHub.
2. Acesse https://vercel.com, crie uma conta e clique em **Add New > Project**.
3. Selecione o repositório.
4. Em **Environment Variables**, adicione as mesmas duas variáveis do
   `.env.local`.
5. Clique em **Deploy**.

Pronto — o site fica no ar em um endereço `.vercel.app`, e depois dá pra
apontar um domínio próprio (ex: tutoriais.dev) nas configurações do projeto
na Vercel.

## Estrutura do projeto

```
app/
  layout.js                    → fontes, metadata, wrapper global
  globals.css                  → estilos base, grão de fundo, utilitários
  page.js                      → landing "em breve" (hero + inscrição)
  tutoriais/page.js            → listagem de tutoriais (com filtro por categoria)
  tutoriais/[slug]/page.js     → leitura de um tutorial
  admin/login/page.js          → login do admin
  admin/dashboard/page.js      → publicar e excluir artigos
components/
  EditorHero.js                → hero com abas de editor + digitação animada
  TerminalSubscribe.js         → captura de e-mail em estilo terminal
  CategoryGrid.js               → cartões de categoria da home
  SiteHeader.js                → cabeçalho das páginas internas
lib/
  supabaseClient.js            → conexão com o Supabase
  categories.js                → cores e rótulos das 4 categorias
schema.sql                     → tabelas, políticas e índices do banco
```

## Próximos passos sugeridos

- Editor de texto rico (Markdown) no painel admin — hoje o conteúdo é texto simples
- Upload de imagem de capa por artigo (Supabase Storage)
- Busca por título na listagem de tutoriais
- Página de erro/estado vazio ilustrada para categorias sem conteúdo ainda
