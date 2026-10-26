# Triagem dos projetos — prioridades de revisão

Este documento é uma triagem inicial baseada nos READMEs e nas árvores de arquivos consultados. Não representa uma auditoria completa, nem confirma que todos os projetos executam corretamente.

## Prioridade 0 — segurança antes de divulgação
### [PositiveSenseWeb](https://github.com/Matheus904-12/PositiveSenseWeb)
- **Situação:** configurações atuais foram ajustadas para ler credenciais do ambiente; foram adicionados `.env.example` e `SECURITY-SETUP.md`.
- **Próximas ações obrigatórias:** rotacionar as credenciais que já foram publicadas, configurar o ambiente de hospedagem, testar login e banco e revisar o histórico Git.
- **Decisão:** não promover publicamente como projeto de portfólio até concluir rotação e testes.

### [ConectaTEA](https://github.com/Matheus904-12/ConectaTEA)
- **Situação:** removido do branch atual o arquivo `.env.production` com valores que não pareciam placeholders; o arquivo de documentação de senhas foi substituído por orientações seguras.
- **Próximas ações:** rotacionar credenciais; configurar variáveis no provedor; testar deploy; revisar histórico Git.
- **Decisão:** só marcar como pronto depois de testar configuração, autenticação e deploy.

### [EcommerceWeb](https://github.com/Matheus904-12/EcommerceWeb)
- **Situação:** removidos o endpoint `phpinfo.php` e um log de acessos com endereços IP; o `.gitignore` agora exclui esses arquivos de diagnóstico.
- **Próximas ações:** executar o projeto em ambiente local; verificar configuração de pagamento/frete; revisar tokens e histórico Git; confirmar testes.
- **Decisão:** projeto secundário, pois o foco profissional definido para estudos é Java/Spring Boot.

## Prioridade 1 — base técnica e projeto de backend
### [engineering-playground](https://github.com/Matheus904-12/engineering-playground)
- Laboratório Java-first organizado por tópicos, com Spring Boot, testes, SQL/JPA, JWT, Kafka, Redis, system design, HTTP/TLS, proxy reverso, load balancing, Docker e observabilidade.
- **Uso recomendado:** ambiente principal para exercícios técnicos pequenos, cada um com teste e explicação dos trade-offs. O super-repositório apenas aponta para ele para evitar duplicação.
- **Próxima ação:** escolher um tópico por vez, executar o experimento e marcar como verificado apenas após validar localmente.

### [WeatherAPI](https://github.com/Matheus904-12/WeatherAPI)
- README descreve backend e frontend, arquitetura hexagonal, scheduler, Redis, MongoDB, Docker e testes.
- **Uso recomendado:** candidato forte para demonstrar desenho de backend e infraestrutura, mas não substitui a prática principal em Java, pois o backend descrito é Python.
- **Próximas ações:** confirmar que os testes realmente passam; verificar segredos e variáveis; documentar execução do zero; distinguir funcionalidades implementadas de roadmap.

## Prioridade 2 — histórico de aprendizagem
### [Atividade-em-Java](https://github.com/Matheus904-12/Atividade-em-Java)
- README identifica exercícios da UMC em POO, listas e CRUD.
- **Uso recomendado:** preservar como histórico de evolução e consultar para revisar fundamentos. Não precisa ser vendido como aplicação de produção.

### [Implementa-oDeSoftware](https://github.com/Matheus904-12/Implementa-oDeSoftware)
- A árvore mostra projetos Java de aluno, cliente, produto e veículo, além de pastas `out` e arquivos de IDE.
- **Próximas ações:** confirmar quais fontes devem ser mantidas, excluir artefatos gerados se apropriado e adicionar um README com comandos que foram testados.

## Prioridade 3 — limpeza antes de divulgar
### [Dashboard-SCRUM](https://github.com/Matheus904-12/Dashboard-SCRUM)
- README descreve um dashboard de logística com Supabase e demonstração publicada.
- **Próximas ações:** revisar `app.js` e configuração do Supabase; remover `node_modules` versionado; verificar que a demo usa dados autorizados e fictícios.

### [PortfolioReact](https://github.com/Matheus904-12/PortfolioReact)
- A árvore contém `node_modules` versionado.
- **Próximas ações:** adicionar regras de ignore, remover dependências vendorizadas do Git se apropriado e confirmar `npm ci` + build.

### [Microservices-Books](https://github.com/Matheus904-12/Microservices-Books)
- A árvore contém PDFs de livros e o README referencia material de um repositório de terceiros.
- **Próximas ações:** confirmar licenças e autorização de distribuição. Não copiar os PDFs para o super-repositório nem republicar material protegido sem permissão.

## Critérios para considerar um projeto pronto para portfólio
- README com problema, público-alvo, arquitetura, stack e instruções reproduzíveis.
- Build/testes executados e resultados reais documentados.
- Nenhuma credencial, log pessoal, dump de banco ou dado de cliente.
- Dependências e arquivos gerados revisados.
- Screenshots/demo com dados fictícios e autorização para divulgar.
- Limitações e decisões técnicas descritas honestamente.
