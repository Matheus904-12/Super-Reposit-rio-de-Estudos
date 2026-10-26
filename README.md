# Super Repositório de Estudos

> Monorepo de exercícios, experimentos pequenos e estudos técnicos de 2023 a 2025.

Este repositório **guarda os arquivos dos projetos selecionados**, organizados por ano e tema. Não é apenas um índice de links. Projetos grandes, aplicações relevantes e projetos ativos continuam em repositórios separados; exercícios pequenos e experimentos de baixo valor independente podem ser incorporados aqui.

## Organização

| Pasta | Conteúdo |
|---|---|
| [2023](2023/README.md) | Primeiros exercícios e projetos pessoais |
| [2024](2024/README.md) | Projetos técnicos e aplicações desenvolvidas em 2024 |
| [2025](2025/README.md) | Estudos e projetos de 2025; projetos de 2026 ficam fora desta seleção |
| [GitHub Copilot](github-copilot/README.md) | Guia de uso, prompts, exercícios e boas práticas |
| [Microsoft Learn](microsoft-learn/README.md) | Trilhas oficiais e acompanhamento dos estudos |
| [Catálogo de migração](catalogo/README.md) | Controle do que foi copiado, está pendente ou deve continuar fora |
| [Segurança](seguranca/checklist.md) | Checklist antes de publicar código |
| [Auditoria inicial](seguranca/auditoria-inicial.md) | Pendências de segurança identificadas nos repositórios |
| [Trilha Java e engenharia](trilha-java-backend/README.md) | Plano progressivo para Java, Spring Boot, SQL, testes, segurança e arquitetura |

## Regras de inclusão

1. **Período:** organizar projetos criados em 2023, 2024 e 2025 nas pastas correspondentes. Projetos criados em 2026 não entram nesta migração histórica.
2. **Escopo:** importar projetos pequenos, exercícios e experimentos sem valor suficiente para manter um repositório independente.
3. **Manter fora:** projetos grandes, aplicações relevantes, projetos ativos e produtos que mereçam histórico e ciclo de vida próprios.
4. **Conteúdo real:** quando um projeto for selecionado, copiar seus arquivos para esta árvore; um link isolado não conta como migração.
5. **Integridade:** preservar a estrutura de pastas e a atribuição de origem; nunca copiar segredos, arquivos privados, dependências geradas ou materiais sem direito de redistribuição.
6. **Validação:** marcar como completo somente depois de conferir os arquivos, a configuração e os testes.

## Estado atual

- [x] Criar as áreas de organização para 2023 e 2024.
- [ ] Completar a importação do projeto de estudo e validar build/testes.
- [ ] Triar os repositórios de 2023 e 2024 por tamanho, utilidade, risco e possibilidade de preservação.
- [ ] Triar os demais repositórios de 2025 por data, tamanho, utilidade e risco.
- [ ] Copiar os projetos pequenos aprovados e verificar cada importação.
- [ ] Manter fora os projetos grandes e ativos.
- [ ] Remover os repositórios de origem somente depois de confirmar a cópia completa e segura.

## Segurança

Leia o [checklist de segurança](seguranca/checklist.md). Remover um segredo do arquivo atual não o invalida nem o apaga do histórico Git: credenciais expostas precisam ser revogadas ou rotacionadas.

**Importante:** a importação inicial de `AccelerateDevGHCopilot` está parcial e ainda não foi testada. O repositório de origem não foi apagado.
