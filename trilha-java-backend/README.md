# Trilha principal — Java e engenharia de software

Objetivo: construir uma base demonstrável para vagas de Desenvolvedor/Engenheiro de Software Júnior, priorizando Java, Spring Boot, SQL, testes e fundamentos de arquitetura.

> Regra: avance por evidência. Cada etapa termina com código executável, testes e um README curto. Não marque um tópico como concluído só por ter lido sobre ele.

## Etapa 0 — Preparar ambiente e rotina
- [ ] JDK LTS instalado e versão registrada (java -version)
- [ ] Maven ou Gradle; começar com Maven
- [ ] Git: branches, commits pequenos, merge e resolução de conflitos
- [ ] IDE configurada e projeto mínimo executando
- [ ] README com objetivo, requisitos e como executar

**Entrega:** repositório Java mínimo reproduzível.

## Etapa 1 — Java essencial
- [ ] Tipos, operadores, condicionais e laços
- [ ] Métodos, parâmetros, retorno e escopo
- [ ] Arrays, List, Set, Map e generics
- [ ] Classes, objetos, construtores e encapsulamento
- [ ] Herança, composição, interfaces e polimorfismo
- [ ] Exceções e validação de entrada
- [ ] equals, hashCode, toString e enums
- [ ] Datas, Optional e Streams sem exagerar no uso
- [ ] Organização por pacotes e princípios SOLID básicos

**Entrega:** aplicação de domínio em memória (ex.: catálogo de tarefas) com validações e testes.

## Etapa 2 — SQL e persistência
- [ ] Modelagem relacional, PK, FK e restrições
- [ ] SELECT, INSERT, UPDATE, DELETE
- [ ] JOIN, agregações, GROUP BY, ordenação e paginação
- [ ] Índices e noções de plano de execução
- [ ] JDBC: conexão, PreparedStatement, ResultSet e fechamento seguro
- [ ] Transações e tratamento de falhas
- [ ] ORM/JPA: entidades, relacionamentos e ciclo de vida

**Entrega:** persistência relacional com consultas parametrizadas e testes.

## Etapa 3 — HTTP e APIs REST com Spring Boot
- [ ] Maven, dependências e configuração por ambiente
- [ ] Controllers, services e repositories
- [ ] DTOs; não expor entidades diretamente como contrato público
- [ ] Verbos HTTP, status codes, headers e JSON
- [ ] Validação com Bean Validation
- [ ] Tratamento centralizado de erros
- [ ] Paginação, filtros e ordenação
- [ ] Configuração externa e variáveis de ambiente
- [ ] Documentação OpenAPI/Swagger
- [ ] CORS e noções de segurança web

**Entrega:** API CRUD de um domínio realista, documentada e com dados persistidos.

## Etapa 4 — Testes e qualidade
- [ ] JUnit 5 e assertions
- [ ] Mockito: mockar somente dependências externas relevantes
- [ ] Testes unitários de regras de negócio
- [ ] Testes de integração da API e persistência
- [ ] Testes de controller e validação
- [ ] Cobrir caminhos de sucesso, erro e limites
- [ ] Formatação, análise estática e revisão de warnings
- [ ] CI executando testes em pull request

**Entrega:** pipeline que falha quando os testes falham.

## Etapa 5 — Segurança
- [ ] Senhas com hash apropriado; nunca armazenar senha em texto puro
- [ ] Autenticação vs. autorização
- [ ] Spring Security e JWT: emissão, validação, expiração e roles
- [ ] Segredos somente em variáveis de ambiente/secret manager
- [ ] SQL injection, validação de entrada e controle de acesso
- [ ] Princípio do menor privilégio
- [ ] Dependências vulneráveis e atualização segura

**Entrega:** API com rotas públicas e protegidas e testes de autorização.

## Etapa 6 — Engenharia e arquitetura
- [ ] MVC e separação de responsabilidades
- [ ] Camadas vs. arquitetura hexagonal (motivação e trade-offs)
- [ ] SOLID, coesão, acoplamento e refatoração incremental
- [ ] Diagramas simples de contexto e sequência
- [ ] Idempotência, paginação e consistência de API
- [ ] Cache: quando ajuda e quando prejudica
- [ ] Monólito modular vs. microsserviços; não dividir sem necessidade

**Entrega:** ADR curto explicando uma decisão técnica e seus trade-offs.

## Etapa 7 — Sistemas distribuídos e infraestrutura
- [ ] DNS, TCP, TLS e ciclo de uma requisição HTTP
- [ ] Proxy reverso e load balancer: papel e diferenças
- [ ] Health checks, timeouts, retries e circuit breaker
- [ ] Cache e rate limiting
- [ ] Mensageria: conceitos de fila, tópico, consumer e entrega
- [ ] Kafka: partitions, consumer groups, offsets e ordem
- [ ] Idempotência e tratamento de mensagens duplicadas
- [ ] Docker e Docker Compose
- [ ] Variáveis de ambiente e configuração por ambiente

**Entrega:** dois componentes pequenos comunicando-se por HTTP ou mensagem, com falhas documentadas.

## Etapa 8 — Observabilidade
- [ ] Logs estruturados e níveis de log
- [ ] Métricas, traces e correlação de requisições
- [ ] Health/readiness checks
- [ ] Métricas de latência, erro e volume
- [ ] Diagnóstico de falha reproduzível

**Entrega:** aplicação com logs úteis, health endpoint e instruções de diagnóstico.

## Etapa 9 — Projeto de portfólio
Criar um único projeto incremental, por exemplo Pontual API ou um sistema de chamados:
- [ ] Regras de negócio e escopo escritos
- [ ] Diagrama de domínio e modelo SQL
- [ ] API REST Java/Spring Boot
- [ ] Banco relacional e migrações
- [ ] Autenticação/autorização
- [ ] Testes unitários e integração
- [ ] Docker Compose
- [ ] CI, documentação OpenAPI e README
- [ ] Logs, health checks e decisão arquitetural documentada
- [ ] Demonstração com dados fictícios e sem segredos

## Como usar Copilot durante os estudos
1. Primeiro escreva o que você espera que o código faça.
2. Peça uma explicação ou plano antes de pedir implementação.
3. Faça uma alteração pequena por vez.
4. Peça testes para casos válidos, inválidos e limites.
5. Leia cada diff; não aceite código que não consegue explicar.
6. Rode testes e comandos localmente; registre o resultado.
7. Registre no [diário de exercícios do Copilot](../github-copilot/exercicios/diario.md) o prompt, o que aceitou/rejeitou e o aprendizado.

## Critério de conclusão de cada etapa
- [ ] Consigo explicar o conceito sem consultar a resposta
- [ ] Consigo implementar uma versão pequena sem copiar
- [ ] Tenho testes ou uma verificação reproduzível
- [ ] Documentei como executar e quais limitações existem

## Recursos oficiais
- [Java documentation](https://docs.oracle.com/en/java/)
- [Spring Guides](https://spring.io/guides)
- [Spring Boot reference](https://docs.spring.io/spring-boot/index.html)
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [GitHub Skills](https://skills.github.com/)
