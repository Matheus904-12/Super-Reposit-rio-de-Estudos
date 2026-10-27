# GoldLar

Aplicação web com integração ao Supabase/PostgreSQL.

## Configuração

A conexão com o banco utiliza variáveis de ambiente. Configure no servidor:

- `SUPABASE_DB_HOST`
- `SUPABASE_DB_PORT` (padrão: `5432`)
- `SUPABASE_DB_NAME`
- `SUPABASE_DB_USER`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

O arquivo `.env.example` lista os nomes das variáveis esperadas; ele é apenas um modelo e não carrega as variáveis automaticamente. Nunca versione senhas ou chaves reais.

## Segurança

Se credenciais anteriores já foram publicadas, revogue/renove-as no painel do provedor. Remover valores do arquivo atual não apaga versões antigas do histórico Git.
