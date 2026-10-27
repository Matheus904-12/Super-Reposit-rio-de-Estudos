# Controle de migração do monorepo

Este catálogo registra projetos de 2023, 2024 e 2025 avaliados para organização no monorepo. Os links apontam para os repositórios de origem para atribuição e inspeção; **link no catálogo não significa que o código já foi copiado**.

## Significado dos estados

- **IMPORTAR / Importação parcial:** arquivos já estão sendo copiados para dentro do monorepo, mas a migração ainda precisa ser concluída e validada.
- **AVALIAR / Pendente:** inspecionar conteúdo, tamanho, dependências, utilidade e riscos antes de decidir.
- **MANTER FORA / Projeto independente:** projeto grande, relevante ou ativo que deve conservar seu próprio histórico e ciclo de vida.

## Critérios

1. Confirmar o ano de criação pelos metadados do GitHub e organizar em pasta correspondente.
2. Copiar o conteúdo dos projetos selecionados para pastas reais dentro do monorepo; links de origem servem somente para atribuição e conferência.
3. Não importar segredos, arquivos privados, dependências geradas, dados sensíveis ou material sem autorização de redistribuição.
4. Confirmar que os arquivos foram copiados e testar build/testes antes de declarar a migração completa.
5. Só remover uma origem após validação integral. A integração conectada não oferece uma ação para excluir repositórios inteiros; portanto, as origens não foram apagadas.

## Estado atual

A pasta de 2023 e a pasta de 2024 já têm listas iniciais de candidatos. Os projetos listados nelas ainda precisam de triagem e cópia real. A importação de `AccelerateDevGHCopilot` (2025) está parcial. `DHCP-LAN` depende da possibilidade de preservar os arquivos binários Packet Tracer.

## Importação por clone completo (etapa 2)

Os repositórios públicos de 2023–2025 foram clonados por inteiro (incluindo imagens, fontes e áudios que faltavam na cópia arquivo a arquivo) e mesclados nas pastas por ano, sem sobrescrever os arquivos já existentes. Ficaram de fora: `node_modules`, `vendor`, `.history`, `.env`, chaves e builds.

**Segurança:** chaves de API do Google/Firebase encontradas em `CadFirestore`, `Firestore-SQL`, `IAgenerativa` e `Projects-Part` foram substituídas por `REMOVIDA_CHAVE_API`. **Revogue/restrinja essas chaves no console do Google**, pois continuam no histórico dos repositórios de origem.

**Não importados, aguardando decisão:**

| Projeto | Motivo |
|---|---|
| Template-PHP | Contém senha de banco e host de produção de um site real; rotacionar a senha antes de qualquer cópia. |
| PositiveSenseWeb, EcommerceWeb, Suburban | Projetos ativos/recentes; provavelmente devem continuar soltos. |
| Repositórios privados (≈30) | Fora do escopo de acesso da sessão; precisam ser anexados e triados. |
| Repositórios de 2026 | Fora do período histórico. |
| ProjetoFerias | Imagem de 22 MB (`colorful-wallpaper...jpg`) omitida. |

**Exclusão dos repositórios de origem:** não realizada. A integração disponível não tem ação de apagar repositórios, e a exclusão é irreversível.

### Etapa 3

Importados também os demais públicos de 2023–2025 (incluindo `dowcode`, `Demais.com`, `Setup`, `Projeto-Semestral-Oficial`, `EcommerceMontink`, apps React Native e exercícios Node/PHP). Itens ainda fora: `Projeto-Semestral` e `nota-mil` (ativos), `engineering-playground` e demais de 2026.

**Segurança adicional:** removidas chaves OpenAI (`OpenAI---1`, `SmartKitchen`), Google/Firebase (`Notifire`, `LuizNoti`, `Youtube-API`) e a **senha/host do Supabase em `EcommerceMontink/config/config.php`**. Revogue as chaves OpenAI e Google e **troque a senha do banco Supabase**; todas continuam no histórico dos repositórios de origem. Arquivos `.zip` foram omitidos.

**Discord:** token de bot removido de `2023/Bot/old/bot.js`; regenere o token no Discord Developer Portal.
