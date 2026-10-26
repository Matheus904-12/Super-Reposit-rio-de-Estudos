# Controle de migração do monorepo

Este catálogo **não substitui os arquivos dos projetos**. Ele registra quais projetos de 2025+ foram selecionados para migração, quais precisam de avaliação e quais devem continuar como repositórios independentes.

O arquivo [repositorios.csv](repositorios.csv) foi reduzido à seleção inicial de 2025+ e não inclui projetos de 2026.

## Significado dos estados

- **IMPORTAR / Importação parcial:** arquivos já estão sendo copiados para dentro do monorepo, mas a migração ainda precisa ser concluída e validada.
- **AVALIAR / Pendente:** verificar se é realmente um projeto pequeno e de baixo valor independente e se todos os arquivos podem ser copiados com segurança.
- **MANTER FORA / Projeto independente:** projeto grande, relevante ou ativo que deve conservar seu próprio histórico e ciclo de vida.

## Critérios

1. Confirmar o ano de criação pelos metadados do GitHub.
2. Não incluir nenhum repositório criado em 2026 nesta seleção.
3. Copiar o conteúdo dos projetos selecionados para pastas reais dentro do monorepo; links de origem servem somente para atribuição e conferência.
4. Não importar segredos, arquivos privados, dependências geradas, dados sensíveis ou material sem autorização de redistribuição.
5. Confirmar que os arquivos foram copiados e testar build/testes antes de declarar a migração completa.
6. Só remover uma origem após validação integral. A integração conectada não oferece uma ação para excluir repositórios inteiros; portanto, as origens não foram apagadas.

## Estado atual

A importação de `AccelerateDevGHCopilot` está parcial. `DHCP-LAN` depende da possibilidade de preservar os arquivos binários Packet Tracer. Os demais candidatos ainda precisam ser avaliados.
