# Portfólio Matheus Lucindo — Design 3

Data: 2026-10-01 · Status: aguardando revisão do Senhor Lucindo

## 1. Objetivo

Reconstruir o portfólio (`lucindoporto.netlify.app`) como o **design 3**, preservando os designs 1 e 2 em branches, e entregar um **currículo em PDF** gerado da mesma fonte de dados do site, atualizável a partir do LinkedIn.

**Público e objetivo:** recrutadores e gestores de tecnologia (decisão do Senhor). Isso define a hierarquia de ações:

| Ação | Onde |
|---|---|
| **Baixar currículo** | Sempre visível no menu, repetida na seção Currículo |
| **Ver projetos** | Botão primário do hero |
| **Contato** | Seção final e rodapé |

**Critério de sucesso:** um recrutador entende em 10 segundos quem é o Matheus, o que ele entrega e como contatá-lo; baixa um PDF correto; e nenhum número ou data do site contradiz o LinkedIn.

## 2. Decisões já tomadas

| Tema | Decisão |
|---|---|
| Stack | Next.js (App Router) com `output: 'export'`, TypeScript estrito, publicado no Netlify |
| Idioma | Português do Brasil. Estrutura pronta para inglês, sem traduzir agora |
| Contato público | E-mail, LinkedIn e GitHub. **Sem telefone, sem idade, sem endereço** no site e no PDF |
| Movimento | GSAP + ScrollTrigger + Lenis, com `prefers-reduced-motion` respeitado |
| Fonte de dados | Um único arquivo tipado alimenta site e PDF |

## 3. Fora de escopo (agora)

- Versão em inglês do site e do currículo.
- Blog, CMS e painel administrativo.
- Leitura automática do LinkedIn por URL: a plataforma exige login e proíbe raspagem. A atualização usa texto colado ou o export oficial de dados.

## 4. Crítica do design 2 que orienta o design 3

1. **Privacidade:** e-mail, telefone e idade estavam no HTML/JSON público → removidos.
2. **Imagens de projeto eram fotos de banco** (Unsplash, Wikimedia, blog de terceiros) → capturas reais dos deploys, hospedadas no próprio repositório.
3. **Dados incorretos:** BCR.CX com data errada, "3+ anos", "60+ projetos", seguidores defasados → só números verificáveis, datas do LinkedIn.
4. **Três botões disputando o mesmo peso** e nenhum currículo → hierarquia da seção 1.
5. **Prova depois da promessa:** "Especialidades" antes dos projetos → projetos primeiro, stack ligada a projetos.
6. **Higiene:** `node_modules/` e `.history/` versionados, foto de 3,5 MB → removidos e imagens otimizadas.
7. **Mobile com 19 mil px** de altura → conteúdo condensado (carrossel de depoimentos, FAQ removido).

## 5. Design visual

**Conceito:** editorial e cinematográfico, escuro. O amarelo do `©` de `LUCINDO©` vira a assinatura.

| Token | Valor |
|---|---|
| Fundo | grafite quente `hsl(30 8% 6%)` |
| Superfície | `hsl(30 7% 10%)` |
| Texto | off-white `hsl(40 20% 94%)`; secundário `hsl(35 8% 64%)` |
| Acento | amarelo elétrico `hsl(63 100% 62%)` (só em destaque, nunca em texto longo) |
| Tema claro | tokens redefinidos com contraste verificado; o amarelo vira fundo de selo com texto escuro |

- **Tipografia:** Instrument Serif (itálico nos destaques do nome), Geist (interface e texto), Geist Mono (rótulos, datas, números). Escala fluida com `clamp()`.
- **Foto:** duotone com parallax suave no hero. Arquivo original em AVIF/WebP, menos de 200 KB. Troca simples quando o Senhor enviar a nova.
- **Movimento (lente Emil Kowalski, com cenas pontuais de Jakub Krehel):** entrada de seção ao chegar, parallax no hero, linha do tempo "desenhada" pelo scroll, cartões com brilho que segue o cursor. Nada de hover-scale universal, blur em toda entrada ou stagger em tudo.
- **Detalhes:** relógio e cidade ao vivo no hero, cursor magnético só em ponteiro fino, barra de progresso de leitura.
- **Responsivo:** mobile primeiro; 320, 375, 390, 768, 1024 e 1440 px testados.

## 6. Estrutura (capítulos)

1. **Hero:** nome gigante, cargo, selo de disponibilidade, "Ver projetos" (primário), foto, relógio.
2. **Stack em letreiro:** logos reais (simple-icons) das tecnologias que ele usa de fato.
3. **Sobre:** texto do LinkedIn revisado, em 3 parágrafos curtos, com números verificáveis (ver seção 8).
4. **Trajetória:** linha do tempo 2023 → jan/2027 (Senai, UMC, freelas, Rádio SAT FM, PIBIC, BCR.CX, Agendei, início do WEAVE).
5. **Projetos:** 3 em destaque com estudo de caso curto + grade dos demais. Cada card: captura real, papel dele, stack, links de código e demo.
6. **Certificações:** as de marca forte em destaque (ver seção 8). As 27 da trilha Microsoft Learning viram **um único card** com a contagem; ao clicar, abre um modal acessível com todas, agrupadas por trilha.
7. **Depoimentos:** recomendações recebidas no LinkedIn (com nome e cargo), em carrossel.
8. **Currículo:** prévia do PDF, botão de download e data da última atualização (vem dos dados).
9. **Contato:** e-mail com botão copiar, LinkedIn, GitHub e formulário (Netlify Forms, já existente).
10. **Rodapé:** assinatura, links, "Evolução do design" apontando para as versões 1 e 2.

## 7. Dados e currículo

### Fonte única
`src/content/profile.ts`, validado em tempo de build por um esquema (zod): pessoa, resumo, experiências, formação, projetos, certificações, competências agrupadas, idiomas, depoimentos, `updatedAt` e `source`. O site lê desse arquivo. O PDF também. Os dois não conseguem divergir.

### Geração do PDF
- `@react-pdf/renderer`, executado em `npm run cv`, que roda também no build do Netlify (antes do `next build`). Não depende de navegador e **nunca fica desatualizado em relação ao site**.
- Saída: `public/curriculo-matheus-lucindo.pdf`, A4, **no máximo 2 páginas**, texto real selecionável (bom para sistemas de triagem), metadados preenchidos (título, autor, idioma `pt-BR`), links clicáveis, fontes embutidas.
- Layout sóbrio de uma coluna: cabeçalho, resumo, experiência, formação, projetos, competências, certificações em destaque, idiomas. Mesmos tokens de cor e tipografia do site, com impressão em preto sobre branco.
- Sem foto, sem idade, sem telefone.

### Como atualizar
1. **Texto colado:** o Senhor cola o perfil do LinkedIn; eu mostro um *diff* do `profile.ts` e só aplico depois do "ok". Fica registrado como comando em `.claude/commands/atualizar-curriculo.md`.
2. **Export oficial:** `npm run cv:importar -- <zip>` lê os CSVs do arquivo de dados do LinkedIn (`Positions`, `Education`, `Skills`, `Certifications`, `Projects`) e gera o mesmo *diff*, sem depender de mim.
3. Em ambos os casos, `npm run cv` regenera o PDF e a prévia.

## 8. Conteúdo: o que entra e como

**Números permitidos (verificáveis):** 43 certificações no LinkedIn · desde jan/2026 na BCR.CX · integrações com Zendesk, Mercado Livre, Cnova e Reclame Aqui · seguidores no LinkedIn só com data da coleta. **Proibido:** "3+ anos de experiência", "60+ projetos", contadores de repositórios.

**Datas corrigidas:** BCR.CX jan/2026 → atual; PIBIC/UMC set/2025 → atual; Rádio SAT FM out–nov/2025; Gold Lar fev–ago/2025; Instituto Unidos para Transformar jul/2025; UMC ADS jan/2025–dez/2026; Senai jan/2023–dez/2024.

**Formação (3 itens do LinkedIn):** UMC, Análise e Desenvolvimento de Sistemas, jan/2025–dez/2026 · Senai São Paulo, Técnico Integrado em Desenvolvimento de Sistemas, jan/2023–dez/2024, representante de sala por 2 anos · Sesi São Paulo, Ensino Médio, mar/2022–dez/2024, média geral 9,5, Projeto Influencer Tecnologia.

**Certificações (43 no LinkedIn):**
- **Em destaque (marca forte):** Alura — Imersão IA (jun/2026) · Alura + Google — Imersão Dev Agentes de IA (set/2025; Python, LangChain) · FIAP — Semana Carreira Tech (mai/2026) e Connect Summit (out/2025) · EBAC — Jornada QA (out/2025; Cypress, automação de testes) · Microsoft — GitHub Copilot Challenge (jul/2025) · Cisco — Introduction to IoT (abr/2025) · Santander Open Academy — IA Generativa (mar/2025) · Senai SP — Power BI (set/2024).
- **Agrupadas em um card:** trilhas do Senai (Web 3.0, Blockchain, Indústria 4.0, Empreender SENAI, Segurança no Trabalho), Muralis (IA no comércio exterior) e Gigabyte (Informática, 2019).
- **Microsoft Learning (27):** um card só, com contagem e modal. Trilhas dentro do modal: GitHub (jan/2026), Microsoft 365 para educação (jul/2024) e IA / Copilot for Security (set/2024). O LinkedIn lista uma delas duas vezes ("Descrever as experiências integradas do Microsoft Copilot para Segurança"); o modal mostra as 27 entradas como estão lá, e o Senhor pode remover a duplicata no LinkedIn.
- **No PDF:** só as 6 a 8 de maior peso, mais uma linha "Microsoft Learning: 27 certificados (GitHub, IA, Copilot for Security)".

**Projetos candidatos** (a confirmar pelo Senhor; só entram os que ele reconhece como autoria dele):
`claude-cortex` · `cx-integration-lab` · `Dashboard-SCRUM` · `WeatherAPI` · `backstage-site` · `PositiveSenseWeb` · `Painel-de-Gastos` · `Suburban` · `nota-mil` · `Agendei.` (link a informar) · `Prodmais` (link a informar). Repositórios privados e trabalho de cliente (como o Conciex Monitor) **não** entram com código.
**WEAVE:** card "Em construção — início da produção em janeiro de 2027", com link para o protótipo no ar.

**Imagens dos projetos:** capturas feitas por script (Playwright) a partir dos deploys, em 1440 px e 390 px, convertidas para WebP/AVIF com `width`/`height` definidos (sem salto de layout).

## 9. Repositório, branches e Netlify

0. **Dados pessoais no histórico (bloqueia o resto).** O repositório é público e a pasta `PDF/` (no `main` e em todo o histórico) contém um currículo antigo com documentos pessoais, endereço residencial, telefone e idade, além de declarações com dados pessoais. O JSON do design 2 também publica telefone e idade. **Antes de criar qualquer branch de arquivo**, o histórico é reescrito (`git filter-repo`) para remover `PDF/` e esses campos, e só então as branches são criadas. Reescrever histórico e fazer *force push* é destrutivo e exige confirmação explícita do Senhor. Isso não recolhe cópias que já existam fora do GitHub; o plano registra essa limitação e as providências recomendadas (pedir a limpeza do cache ao suporte do GitHub; alertas de crédito para o CPF).
1. `arquivo/design-1-2024-2025` ← commit `ca569a2` (12/12/2025), o último antes do "Version 2.0". É o design da raiz do repositório (`index.html`, `CSS/`, `JS/`) e ainda não tem a pasta `v2/`.
2. `arquivo/design-2-2026` ← `main` atual, `dda0d8c` (24/01/2026). É o design da pasta `v2/`, que o Netlify publica hoje.
3. `feat/design-3-portfolio` ← onde este trabalho acontece; entra na `main` ao final.
4. Limpeza: remover `node_modules/`, `.history/` e arquivos soltos do versionamento; `.gitignore` correto; `README` profissional. A pasta `PDF/` da raiz (provável currículo antigo) é inspecionada antes: se for currículo desatualizado, sai do design 3 e fica só nas branches de arquivo.
5. Netlify: `build.command = npm run cv && npm run build`, `publish = out`. O Netlify é conectado ao repositório; mudar a `main` publica. Branch deploys das duas branches de arquivo podem manter o design 1 e o 2 no ar em endereços próprios (decisão do Senhor, opcional).
6. Nenhum *push* nem mudança no Netlify acontece sem confirmação.

## 10. Qualidade e verificação

| Verificação | Meta |
|---|---|
| Lighthouse (mobile) | Desempenho ≥ 90, Acessibilidade 100, Boas práticas ≥ 95, SEO 100 |
| Web Vitals | LCP < 2,5 s, CLS < 0,1 |
| Estouro horizontal | Nenhum em 320, 360, 390, 768, 1024, 1440 px |
| Acessibilidade | axe sem violações sérias; foco visível; contraste 4,5:1 nos dois temas; navegação por teclado |
| Movimento | `prefers-reduced-motion`: conteúdo estático e legível |
| PDF | ≤ 2 páginas; `pdftotext` contém nome, cargo atual e e-mail; **não** contém telefone nem idade; fontes embutidas; renderizado para imagem e conferido |
| Dados | Teste que falha se o site e o PDF divergirem em cargo, datas ou lista de projetos |
| Privacidade | Teste que falha se o HTML publicado contiver telefone ou idade |

## 11. Riscos e dependências

- **Foto:** o Senhor enviará uma nova. Até lá, a atual (`v2/assets/images/profile.jpg`).
- **Resolvido pelo Senhor em 01/10/2026:** a terceira formação (Sesi) e a lista completa das 43 certificações. Os links de verificação das credenciais não vieram no texto; o card usa o código da credencial quando existe e aponta para o perfil do Credly.
- **Currículo antigo e documentos na pasta `PDF/`:** ver seção 9, item 0. Nada deles entra no design 3.
- **Links de Agendei e Prodmais:** a apresentação do Agendei está num link curto do LinkedIn; o repositório não aparece na conta pessoal.
- **Depoimentos antigos** do site (gerente da Rádio, professor, programa de influencer) não aparecem como recomendações do LinkedIn. Só entram com autorização e identificação reais.
- **E-mail público:** confirmar qual endereço usar.
