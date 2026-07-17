# tutoriais.dev

Site de tutoriais (programação, informática, Windows, celulares) com página "Em breve" e painel de administração para publicar/excluir artigos.

**Stack:** Next.js + Supabase (banco de dados + autenticação) + Vercel (hospedagem)

## 1. Criar o projeto no Supabase

1. Acesse https://supabase.com e crie uma conta (grátis).
2. Clique em **New Project**, escolha um nome e uma senha para o banco.
3. Aguarde o projeto ser criado (leva ~1-2 min).

## 2. Criar as tabelas

1. No painel do Supabase, vá em **SQL Editor > New query**.
2. Copie todo o conteúdo do arquivo `schema.sql` (nesta pasta) e cole lá.
3. Clique em **Run**. Isso cria as tabelas `articles` e `subscribers` e configura as permissões.

## 3. Criar seu usuário de admin

1. No painel do Supabase, vá em **Authentication > Users**.
2. Clique em **Add user > Create new user**.
3. Coloque seu e-mail e uma senha — esse é o login que você vai usar em `/admin/login`.

## 4. Pegar as chaves da API

1. No painel do Supabase, vá em **Project Settings > API**.
2. Copie a **Project URL** e a chave **anon public**.
3. Nesta pasta do projeto, renomeie `.env.local.example` para `.env.local`.
4. Cole a URL e a chave nos campos correspondentes.

## 5. Instalar e rodar localmente

Você vai precisar do [Node.js](https://nodejs.org) instalado (versão 18 ou superior).

```bash
npm install
npm run dev
```

Acesse:
- **http://localhost:3000** → página "Em breve"
- **http://localhost:3000/admin/login** → login do admin
- **http://localhost:3000/admin/dashboard** → painel para publicar/excluir artigos

## 6. Colocar no ar (deploy)

1. Suba esta pasta para um repositório no GitHub.
2. Acesse https://vercel.com, crie uma conta e clique em **Add New > Project**.
3. Selecione o repositório.
4. Em **Environment Variables**, adicione as mesmas duas variáveis do `.env.local`.
5. Clique em **Deploy**.

Pronto — o site fica no ar em um endereço `.vercel.app`, e depois dá pra apontar um domínio próprio (ex: tutoriais.dev) nas configurações do projeto na Vercel.

## Estrutura do projeto

```
app/
  page.js                 → página pública "Em breve" (captura e-mail)
  admin/login/page.js      → login do admin
  admin/dashboard/page.js  → publicar e excluir artigos
lib/
  supabaseClient.js        → conexão com o Supabase
schema.sql                 → tabelas e permissões do banco
```

## Próximos passos sugeridos

- Criar as páginas públicas de listagem e leitura dos artigos (`/tutoriais`, `/tutoriais/[slug]`)
- Adicionar upload de imagens nos artigos (Supabase Storage)
- Editor de texto rico no painel admin (hoje é texto simples)
- Trocar a home de "Em breve" para o site completo quando estiver pronto
