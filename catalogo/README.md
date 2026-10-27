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
5. Só remover uma origem após validação integral. As origens ainda não foram apagadas (a exclusão deve ser feita pelo autor, com `gh repo delete` ou pela interface do GitHub).

## Estado atual

A importação de 2023, 2024 e 2025 está concluída (veja as etapas abaixo). Os índices por ano estão em [2023](../2023/README.md), [2024](../2024/README.md) e [2025](../2025/README.md). Pendências: validar build/testes, trocar credenciais expostas e decidir o destino dos repositórios de origem.

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

### Etapa 4 — repositórios privados de estudo

Importados 34 repositórios que eram privados (exercícios de HTML/CSS/JS, PHP, C# e Copilot de 2023–2025). Como este repositório é público, esse conteúdo agora está público (decisão do autor). `Rock`, `Testes`, `Verificador-de-Senhas` e `WarHammer` estão vazios na origem. Um `.pptx` de 18 MB de terceiros foi omitido de `GitHub-Copilot-Global-Bootcamp`.

### Etapa 5 — projetos restantes (privados, comerciais e ativos)

Importados por decisão do autor: `GoldLar`, `GoldLarAdmin`, `GoldLarCristais`, `melhorenvio-proxy`, `melhorenvio-proxy-vercel`, `TCC-Helo-Ana`, `Lucindo.`, `PortLucindo`, `LookHolder`, `ADS-Nick`, `gms-test`, `PD1`, `PD2`, `PD3`, `PDD`, `PDD2`, `veran-base`, `VF-Mercado`, `Auxilio-Mercado`, `Projeto-Semestral`, `nota-mil`, `PositiveSenseWeb`, `EcommerceWeb`, `Suburban` e `Template-PHP`.

Vazios na origem (sem pasta): `Versions-ZIP`, `Meu-PenDrive`.

**Omitido da cópia:** dumps SQL com dados reais (`GoldLar`, `EcommerceWeb`), pastas `uploads/` de clientes, `db.sqlite3`, arquivos `bling_*.json` com tokens, `site_link.txt` (token na URL), `.apk`, `.bin`, `ngrok.exe`, GIFs/vídeos e demais arquivos >10 MB, `.zip`/`.rar`.

**Credenciais removidas da cópia — revogue/troque todas, pois seguem no histórico dos repositórios de origem:**
- Senha, usuário e host do MySQL de produção (`goldlar_2025`, hospedagem dbaas) em `GoldLar`/`EcommerceWeb`/`Template-PHP`
- Bling: client id/secret e access/refresh tokens
- Melhor Envio: client secret
- Senhas fixas `admin123` em `EcommerceWeb`
- Chave Google OAuth (client id e secret) em `GoldLar`; chave Google/Firebase em `veran-base`/`Auxilio-Mercado`
- Chave OMDb em `gms-test`

**Atenção:** `GoldLar`, `EcommerceWeb` e `Template-PHP` são trabalho de cliente (Cristais Gold Lar) e agora estão públicos; confirme que você pode publicá-los. O link do `Template-PHP` fica apenas como código.

### Retirados do super repositório (voltam a ser repositórios independentes)

Por decisão do autor, ficam como repositórios próprios no GitHub, sem cópia aqui: `Suburban`, `PositiveSenseWeb`, `PositiveSensePage`, `PortLucindo` (portfólio), `Painel-de-Gastos` e `EcommerceMontink`. Os repositórios de origem nunca foram apagados e não devem ser. Eles continuam existindo e não entram na lista de exclusão.
