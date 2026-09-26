# Portfólio Joel Silva

Next.js 15 + TypeORM + PostgreSQL. Site público, páginas de projecto, formulário de contacto e painel de administração em `/admin`.

## Configuração

1. Copie `.env.example` para `.env.local` e preencha `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL` e `ADMIN_PASSWORD`.
2. Prepare a base de dados (cria a BD, as tabelas, o admin e os projectos iniciais):

   ```bash
   npm run db:setup
   ```

3. Arranque o projecto:

   ```bash
   npm run dev
   ```

- Site: http://localhost:3000
- Painel: http://localhost:3000/admin

## Estrutura

- `src/server/db` — entidades TypeORM (`EntitySchema`) e ligação à BD
- `src/server/actions` — server actions (auth, projectos, mensagens)
- `src/app/(landing)` — site público (`/`, `/projectos`, `/projectos/[slug]`)
- `src/app/admin` — painel (projectos, mensagens, definições)
- `src/app/**/opengraph-image.tsx` — imagens de partilha geradas dinamicamente

## Uploads

Os ficheiros enviados no painel ficam em `storage/uploads` (ou `UPLOAD_DIR`) e são servidos em `/media/...`.
Numa plataforma serverless (ex.: Vercel) o disco não é persistente: use um servidor com disco próprio
ou cole URLs de um armazenamento externo (ex.: Cloudflare R2) nos campos de imagem.
