# Configuração segura do ambiente

Este projeto deve receber credenciais por variáveis de ambiente. Não adicione senhas, tokens ou segredos reais a arquivos versionados.

## Variáveis

Configure no provedor de hospedagem ou no ambiente local:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`
- `SSL_CA_CONTENT`, se a conexão exigir certificado CA
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`

O arquivo [.env.example](.env.example) lista os nomes sem conter credenciais. O `.gitignore` exclui arquivos de ambiente locais, exceto exemplos.

## Após uma exposição anterior

1. Troque a senha do banco diretamente no provedor e atualize o ambiente de hospedagem.
2. Gere um novo segredo OAuth no console do provedor, se o segredo real tiver sido publicado.
3. Confirme que as variáveis estão configuradas no deploy.
4. Teste conexão ao banco e o fluxo de login OAuth.
5. Revise o histórico Git: os commits antigos podem continuar contendo os valores anteriores. A rotação é obrigatória mesmo se o histórico não for reescrito.

**Importante:** as alterações de configuração precisam ser testadas no ambiente de execução antes de considerar o projeto pronto para divulgação.
