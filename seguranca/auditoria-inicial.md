# Auditoria inicial — segurança dos repositórios públicos

**Data da revisão:** 26/10/2026  
**Escopo:** inspeção superficial de nomes de arquivos, configurações e sinais óbvios. Não é uma auditoria completa nem substitui testes locais.

## Ações já aplicadas

### ConectaTEA
- Removido do branch atual o arquivo `.env.production`, que continha valores não-placeholder para variáveis de banco, JWT, sessão e e-mail.
- Substituído o conteúdo de `MYSQL_PASSWORD.md` por instruções sem credenciais.
- A configuração de produção deve ser recriada no provedor de hospedagem, usando variáveis de ambiente.
- **Ação ainda necessária:** rotacionar/invalidar credenciais que já tenham sido publicadas. O histórico Git pode conservar os valores antigos.
- [Repositório ConectaTEA](https://github.com/Matheus904-12/ConectaTEA)

### EcommerceWeb
- Removido `phpinfo.php`, um endpoint de diagnóstico que não deve ficar exposto em produção.
- Removido `acessos_log.txt`, que continha endereços IP.
- Acrescentadas regras ao `.gitignore` para evitar o versionamento desses arquivos de diagnóstico/log.
- [Repositório EcommerceWeb](https://github.com/Matheus904-12/EcommerceWeb)

## Revisão urgente pendente

### PositiveSenseWeb
A inspeção identificou credenciais de banco e configuração OAuth hardcoded em arquivos de configuração, incluindo `config/database.php` e `config/google-oauth.php`. Não reproduzir os valores em documentação, issues ou prompts.

Próximas ações:
1. Rotacionar a senha do banco e o segredo OAuth no provedor correspondente.
2. Migrar os valores para variáveis de ambiente e manter apenas valores de exemplo não secretos no Git.
3. Adicionar `.env` e variantes locais ao `.gitignore`, preservando somente arquivos de exemplo.
4. Testar autenticação e conexão com banco após a alteração.
5. Revisar o histórico Git e decidir se será necessária a limpeza do histórico; a rotação de credenciais é prioritária mesmo que o histórico não seja reescrito.

- [Repositório PositiveSenseWeb](https://github.com/Matheus904-12/PositiveSenseWeb)

## Limitações importantes

- Apagar um arquivo do branch atual não remove o conteúdo dos commits antigos, forks ou clones.
- Credenciais que já foram publicadas devem ser consideradas comprometidas até serem rotacionadas.
- Esta revisão não executou os projetos, testes, análise de dependências ou varredura completa de histórico.
- Não publicar neste repositório central valores de segredos, logs com dados pessoais, arquivos `.env` reais ou dumps de banco.

## Ordem recomendada
1. Rotacionar as credenciais de PositiveSenseWeb e ConectaTEA.
2. Corrigir a configuração de PositiveSenseWeb para usar variáveis de ambiente.
3. Confirmar que os deploys continuam funcionando.
4. Fazer varredura de segredos no histórico e nos demais repositórios públicos.
5. Retomar a classificação de portfólio depois da revisão de segurança.


### PositiveSenseWeb — atualização

As configurações atuais foram ajustadas para carregar credenciais por variáveis de ambiente, e foram adicionados `.env.example` e `SECURITY-SETUP.md`. A rotação de credenciais e os testes de deploy/login ainda são obrigatórios, pois o histórico pode conservar os valores anteriores.
