# Checklist de segurança antes de importar ou publicar

- [ ] Nenhum token, senha, API key, client secret ou chave privada.
- [ ] Nenhum `.env`, dump de banco, backup ou arquivo local com dados reais.
- [ ] Nenhum dado pessoal de colegas, clientes ou usuários.
- [ ] Nenhum código de empregador/cliente sem autorização explícita.
- [ ] Licenças e autoria de trabalhos em grupo respeitadas.
- [ ] Credenciais que já foram expostas foram revogadas/rotacionadas.
- [ ] Histórico Git foi avaliado quando houve segredo commitado.
- [ ] README informa se é exercício, protótipo ou projeto completo.
- [ ] O projeto foi testado depois de qualquer alteração.
- [ ] Dependências e comandos de instalação foram revisados.

Remover um segredo do arquivo atual não apaga suas versões antigas do histórico Git. Se um segredo real foi publicado, revogue-o primeiro e avalie a limpeza do histórico.
