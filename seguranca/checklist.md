# Checklist de segurança antes de publicar

- [ ] Não há arquivos de ambiente reais, tokens, senhas, chaves privadas ou credenciais de banco.
- [ ] Configurações usam variáveis de ambiente e existe apenas um exemplo sem segredos.
- [ ] Não há dados pessoais, dumps, arquivos de clientes ou informações internas de empresa.
- [ ] Dependências e scripts foram revisados antes de executar.
- [ ] Licenças e autoria de código externo estão identificadas.
- [ ] README explica como configurar o projeto sem expor credenciais.
- [ ] O diff foi revisado antes do commit.
- [ ] Testes e verificações aplicáveis foram executados.
- [ ] O repositório foi revisado para conteúdo sensível no histórico Git.

## Importante

Excluir uma senha do arquivo atual não a remove do histórico de commits. Se um token, senha ou chave foi exposto, revogue-o ou rotacione-o no serviço correspondente primeiro; depois avalie a limpeza do histórico. Nunca copie credenciais para este repositório.
