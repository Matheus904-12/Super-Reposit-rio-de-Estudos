# Super Repositório de Estudos

> Repositório único dos projetos e estudos de 2023 a 2025, com código e arquivos organizados por ano.

Este repositório é o destino central dos projetos migrados: os arquivos devem ficar nas pastas locais, organizados por ano e tema. **Não deve funcionar como um catálogo de links para outros repositórios GitHub.** Quando um projeto tiver uma demonstração publicada, o README da pasta poderá conter o link do Netlify, Vercel ou serviço equivalente.

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
2. **Escopo:** migrar os projetos de 2023, 2024 e 2025 que fazem parte desta organização, inclusive aplicações maiores, preservando a estrutura e os arquivos necessários.
3. **Organização:** cada projeto deve ter sua própria pasta dentro do ano correspondente; evitar links para repositórios GitHub antigos. Links externos só devem ser usados para demonstrações publicadas, documentação ou dependências.
4. **Conteúdo real:** quando um projeto for selecionado, copiar seus arquivos para esta árvore; um link isolado não conta como migração.
5. **Integridade:** preservar a estrutura de pastas e a atribuição de origem; nunca copiar segredos, arquivos privados, dependências geradas ou materiais sem direito de redistribuição.
6. **Validação:** marcar como completo somente depois de conferir os arquivos, a configuração e os testes.

## Estado atual

- [x] Criar as áreas de organização para 2023 e 2024.
- [ ] Completar a importação do projeto de estudo e validar build/testes.
- [ ] Triar os repositórios de 2023 e 2024 por tamanho, utilidade, risco e possibilidade de preservação.
- [ ] Triar os demais repositórios de 2025 por data, tamanho, utilidade e risco.
- [ ] Copiar os projetos pequenos aprovados e verificar cada importação.
- [ ] Conferir se cada projeto foi migrado integralmente, inclusive configurações e assets binários.
- [ ] Excluir os repositórios de origem somente depois de confirmar a cópia completa, validar os arquivos e registrar os links de demonstração.

## Segurança

Leia o [checklist de segurança](seguranca/checklist.md). Remover um segredo do arquivo atual não o invalida nem o apaga do histórico Git: credenciais expostas precisam ser revogadas ou rotacionadas.

**Importante:** a importação inicial de `AccelerateDevGHCopilot` está parcial e ainda não foi testada. O repositório de origem não foi apagado.
