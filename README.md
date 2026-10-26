# Super Repositório de Estudos

> Monorepo de exercícios, experimentos pequenos e estudos técnicos a partir de 2025.

Este repositório **guarda os arquivos dos projetos selecionados**, organizados por ano e tema. Não é apenas um índice de links. Projetos grandes, aplicações relevantes e projetos ativos continuam em repositórios separados; exercícios pequenos e experimentos de baixo valor independente podem ser incorporados aqui.

## Organização

| Pasta | Conteúdo |
|---|---|
| [2025](2025/README.md) | Projetos e experimentos criados em 2025; projetos de 2026 ficam explicitamente fora desta seleção |
| [GitHub Copilot](github-copilot/README.md) | Guia de uso, prompts, exercícios e boas práticas |
| [Microsoft Learn](microsoft-learn/README.md) | Trilhas oficiais e acompanhamento dos estudos |
| [Catálogo de migração](catalogo/README.md) | Controle do que foi copiado, está pendente ou deve continuar fora |
| [Segurança](seguranca/checklist.md) | Checklist antes de publicar código |
| [Auditoria inicial](seguranca/auditoria-inicial.md) | Pendências de segurança identificadas nos repositórios |
| [Trilha Java e engenharia](trilha-java-backend/README.md) | Plano progressivo para Java, Spring Boot, SQL, testes, segurança e arquitetura |

## Regras de inclusão

1. **Data:** nesta rodada, incluir repositórios criados em 2025. Não importar conteúdo de 2026 nesta seleção.
2. **Escopo:** importar projetos pequenos, exercícios e experimentos sem valor suficiente para manter um repositório independente.
3. **Manter fora:** projetos grandes, aplicações relevantes, projetos ativos e produtos que mereçam histórico e ciclo de vida próprios.
4. **Conteúdo real:** quando um projeto for selecionado, copiar seus arquivos para esta árvore; um link isolado não conta como migração.
5. **Integridade:** preservar a estrutura de pastas e a atribuição de origem; nunca copiar segredos, arquivos privados, dependências geradas ou materiais sem direito de redistribuição.
6. **Validação:** marcar como completo somente depois de conferir os arquivos, a configuração e os testes.

## Estado atual

- [x] Criar a estrutura principal do monorepo.
- [x] Iniciar a importação dos arquivos do estudo `AccelerateDevGHCopilot` para [2025/estudos-github-copilot/AccelerateDevGHCopilot](2025/estudos-github-copilot/AccelerateDevGHCopilot/README.md).
- [ ] Completar a importação do projeto de estudo e validar build/testes.
- [ ] Triar os demais repositórios de 2025 por data, tamanho, utilidade e risco.
- [ ] Copiar os projetos pequenos aprovados e verificar cada importação.
- [ ] Manter fora os projetos grandes e ativos.
- [ ] Remover os repositórios de origem somente depois de confirmar a cópia completa e segura.

## Segurança

Leia o [checklist de segurança](seguranca/checklist.md). Remover um segredo do arquivo atual não o invalida nem o apaga do histórico Git: credenciais expostas precisam ser revogadas ou rotacionadas.

**Importante:** a importação inicial de `AccelerateDevGHCopilot` está parcial e ainda não foi testada. O repositório de origem não foi apagado.
