# Portfólio Design 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar o portfólio "design 3" (Next.js estático no Netlify) com currículo em PDF gerado da mesma fonte de dados, preservando os designs 1 e 2 em branches e removendo do histórico público os dados pessoais.

**Architecture:** Um único arquivo tipado (`src/content/profile.ts`, validado por zod) alimenta o site e o PDF. O site é um export estático do Next.js (App Router) com animações de scroll em GSAP/Lenis. O PDF é gerado em Node por `@react-pdf/renderer` em `npm run cv`, que também roda no build do Netlify. Testes (vitest) travam privacidade, consistência site↔PDF e limites do PDF.

**Tech Stack:** Next.js 16 (`output: 'export'`), React 19, TypeScript estrito, GSAP 3.15 + ScrollTrigger, Lenis 1.3, zod 4, `@react-pdf/renderer` 4.9, vitest 5, Playwright (captura de telas e verificação), `@fontsource/{geist,geist-mono,instrument-serif}`, `simple-icons`, `sharp`, Netlify.

**Spec:** `docs/superpowers/specs/2026-10-01-portfolio-design-3-design.md`

## Global Constraints

- Next.js App Router com `output: 'export'`; TypeScript `strict`; **sem `any`**; funções de 4 a 20 linhas; arquivos < 500 linhas.
- Idioma: português do Brasil. Estrutura pronta para inglês, **sem traduzir agora**.
- **Sem telefone, sem idade, sem endereço, sem CPF/RG** no site, no PDF e no repositório. E-mail só no PDF e codificado no site (nunca em texto puro no HTML/JS publicado).
- Movimento: GSAP + ScrollTrigger + Lenis; tudo dentro de `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`; conteúdo nasce visível (sem JS ele continua legível).
- Tokens: fundo `hsl(30 8% 6%)`, superfície `hsl(30 7% 10%)`, texto `hsl(40 20% 94%)`, texto secundário `hsl(35 8% 64%)`, acento `hsl(63 100% 62%)` só em destaque. Tema claro com contraste ≥ 4,5:1.
- Tipografia: Instrument Serif (destaques em itálico), Geist (texto), Geist Mono (rótulos).
- PDF: A4, **no máximo 2 páginas**, texto selecionável, fontes embutidas, metadados e idioma `pt-BR`, sem foto.
- Metas: Lighthouse mobile Desempenho ≥ 90, Acessibilidade 100, Boas práticas ≥ 95, SEO 100; LCP < 2,5 s; CLS < 0,1; sem estouro horizontal em 320/360/390/768/1024/1440 px.
- Git: branches e commits em português (Conventional Commits com escopo); trailer `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`; **nenhum push, force push ou mudança no Netlify sem confirmação do Senhor**.
- Números proibidos no site: "3+ anos", "60+ projetos", contadores de repositórios. Datas só as do LinkedIn.

## Review Focus

1. **E-mail, telefone ou idade em texto puro no HTML/JS publicado** → esperado: o teste de privacidade em `out/` falha o build.
2. **Projeto sem captura (deploy fora do ar)** → esperado: card com imagem de reserva do mesmo tamanho, sem salto de layout.
3. **Nome, cargo ou título de projeto muito longo em 320 px** → esperado: quebra de linha, nunca estouro horizontal.
4. **Lista de certificações/projetos que cresce e empurra o PDF para a 3ª página** → esperado: o teste de páginas falha e o gerador corta os itens de menor prioridade.
5. **JS atrasado ou desativado** → esperado: nenhum bloco permanece invisível; o conteúdo continua legível.

## File Structure

```
PortLucindo/
├─ netlify.toml                      build = "npm run cv && npm run build", publish = "out"
├─ next.config.ts                    output export, imagens sem otimizador
├─ package.json  tsconfig.json  vitest.config.ts  eslint.config.mjs
├─ public/
│  ├─ forms.html                     formulário oculto para o Netlify Forms detectar
│  ├─ curriculo-matheus-lucindo.pdf  GERADO por npm run cv
│  └─ images/{matheus.jpg, projetos/*.webp, certificados/*.svg}
├─ scripts/
│  ├─ gerar-curriculo.tsx            renderiza o PDF
│  ├─ capturar-projetos.mjs          Playwright → public/images/projetos
│  └─ importar-linkedin.ts           CSVs do export oficial → diff do profile.ts
├─ src/
│  ├─ app/{layout.tsx, page.tsx, globals.css}
│  ├─ content/{schema.ts, profile.ts, contact.ts}
│  ├─ lib/{scroll.ts, pdf-document.tsx, linkedin-csv.ts}
│  ├─ components/{Nav, Hero, StackMarquee, About, Timeline, Projects,
│  │              Certifications, CertificationsModal, Testimonials,
│  │              CvSection, Contact, Footer, Reveal}.tsx
│  └─ hooks/useScrollAnimations.ts
├─ tests/{profile.test.ts, cv.test.ts, privacy.test.ts, linkedin-csv.test.ts}
└─ .claude/commands/atualizar-curriculo.md
```

---

### Task 0: Remover dados pessoais do histórico público (BLOQUEIA O RESTANTE)

**Files:**
- Nenhum arquivo do projeto muda neste task. Trabalha num clone espelho em `~/Projetos/PortLucindo-limpo.git` e num arquivo **fora do repositório**: `~/Projetos/.pii-padroes.txt`.

**Interfaces:**
- Produces: histórico do GitHub sem `PDF/` e sem os campos `phone`/`age` do JSON do design 2; SHAs novos. Os tasks 1+ procuram commits **por mensagem**, nunca por SHA antigo.

- [ ] **Step 1: Instalar a ferramenta e fazer cópia de segurança local**

```bash
pip install --user git-filter-repo
git filter-repo --version
git clone --mirror https://github.com/Matheus904-12/PortLucindo.git ~/Projetos/PortLucindo-backup.git
```
Expected: versão impressa; clone espelho criado. **O backup contém os dados pessoais**: fica só no disco local e é apagado no Step 8.

- [ ] **Step 2: Montar o arquivo de padrões (fora do repositório, nunca commitado)**

Criar `~/Projetos/.pii-padroes.txt` no formato do `--replace-text` (`literal==>substituto`), com **cada telefone, CPF, RG, CEP e linha de endereço** que aparecem no currículo antigo e no `v2/data/portfolio-data*.json`, e as frases de idade ("19", "18 anos", "Aos 19 anos"). Os valores são lidos do próprio material do Senhor e **não são escritos neste plano**.

```text
<TELEFONE>==>[removido]
<CPF>==>[removido]
<RG>==>[removido]
<ENDERECO>==>[removido]
Aos 19 anos, ==>
```
Run: `chmod 600 ~/Projetos/.pii-padroes.txt`

- [ ] **Step 3: Reescrever o histórico num clone novo**

```bash
git clone https://github.com/Matheus904-12/PortLucindo.git ~/Projetos/PortLucindo-limpo
cd ~/Projetos/PortLucindo-limpo
git filter-repo --force --path PDF --path-glob '**/node_modules/**' --invert-paths --replace-text ~/Projetos/.pii-padroes.txt
```
Expected: "Completely finished". O `--invert-paths` vale para todos os `--path*` da mesma execução (remove `PDF/` e `node_modules/` de todo o histórico) e a troca de texto roda no mesmo passe.

- [ ] **Step 4: Provar que sumiu (esperado: tudo 0)**

```bash
cd ~/Projetos/PortLucindo-limpo
echo "PDFs no histórico: $(git log --all --name-only --format= | grep -ci '\.pdf$')"
echo "CPF/RG/telefone no histórico: $(git log --all -p | grep -cE '[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}|\+55 ?\(?[0-9]{2}\)? ?9?[0-9]{4}-?[0-9]{4}')"
echo "Aos N anos: $(git log --all -p | grep -ciE 'aos (18|19) anos|tenho 18 anos')"
git ls-tree -r --name-only main | grep -c '^PDF/' || true
```
Expected: `0` em todas as linhas. Se alguma não for 0, voltar ao Step 2 e completar os padrões.

- [ ] **Step 5: PEDIR CONFIRMAÇÃO EXPLÍCITA DO SENHOR antes do force push**

Mostrar: o que será apagado (pasta `PDF/` inteira, 6 arquivos), os SHAs novos, e avisar que **forks/clones antigos e caches continuam com os dados**. Só seguir com um "sim".

- [ ] **Step 6: Force push (após o "sim")**

```bash
cd ~/Projetos/PortLucindo-limpo
git remote add origin https://github.com/Matheus904-12/PortLucindo.git
git push --force --all origin
```
Expected: `main` atualizada. O GitHub guarda commits órfãos acessíveis por SHA por um tempo.

- [ ] **Step 7: Providências que o código não resolve (entregar ao Senhor)**

1. Abrir pedido ao Suporte do GitHub para remover visualizações em cache e commits órfãos do repositório.
2. Considerar alertas de crédito/identidade para o CPF e RG (ficaram públicos desde 12/12/2025).
3. Conferir se o repositório tem forks (hoje 0) e se o Wayback Machine arquivou a página.

- [ ] **Step 8: Trocar o clone de trabalho e apagar o backup**

```bash
cd ~/Projetos && mv PortLucindo PortLucindo-antigo
git clone https://github.com/Matheus904-12/PortLucindo.git PortLucindo
cp -r PortLucindo-antigo/docs PortLucindo/ 2>/dev/null
rm -rf ~/Projetos/PortLucindo-backup.git ~/Projetos/PortLucindo-antigo ~/Projetos/PortLucindo-limpo
shred -u ~/Projetos/.pii-padroes.txt
cd PortLucindo && git checkout -b feat/design-3-portfolio && git add docs && git commit -m "docs(spec): especificação e plano do design 3 do portfólio"
```

---

### Task 1: Branches de arquivo dos designs 1 e 2

**Files:** nenhum arquivo muda; criam-se branches.

**Interfaces:**
- Consumes: histórico limpo do Task 0.
- Produces: `arquivo/design-1-2024-2025` e `arquivo/design-2-2026`.

- [ ] **Step 1: Localizar os commits por mensagem (SHAs mudaram no Task 0)**

```bash
cd ~/Projetos/PortLucindo
D1=$(git log main --format=%h --grep='adiciona seção de depoimentos' | head -1)
D2=$(git rev-parse --short main)
echo "design 1 termina em: $D1 | design 2 é a main: $D2"
git ls-tree --name-only "$D1" | grep -c '^v2$'
```
Expected: dois SHAs; a última linha imprime `0` (o design 1 ainda não tem `v2/`).

- [ ] **Step 2: Criar as branches**

```bash
git branch arquivo/design-1-2024-2025 "$D1"
git branch arquivo/design-2-2026 "$D2"
git branch --list 'arquivo/*'
```

- [ ] **Step 3: Marcar cada branch como arquivo (README curto em cada uma)**

Em cada branch, um commit `docs(arquivo): identifica a versão` adicionando `ARQUIVO.md` com período, o que é e "branch congelada". Voltar à `feat/design-3-portfolio` ao final.

- [ ] **Step 4: Publicar as branches só com confirmação**

Perguntar ao Senhor; então `git push origin arquivo/design-1-2024-2025 arquivo/design-2-2026`.

---

### Task 2: Esqueleto Next.js, tokens e servidor local

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `netlify.toml`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Delete: `v2/`, `CSS/`, `JS/`, `IMAGE/`, `index.html`, `node_modules/` e `.history/` do versionamento (continuam nas branches de arquivo)

**Interfaces:**
- Produces: `npm run dev` (porta 3000), `npm run build` (gera `out/`), `npm test`, classes de tokens CSS usadas pelos demais tasks.

- [ ] **Step 1: Copiar a foto atual antes de apagar o design 2**

```bash
mkdir -p public/images && git show arquivo/design-2-2026:v2/assets/images/profile.jpg > public/images/matheus.jpg
```

- [ ] **Step 2: Remover o design antigo do `feat/design-3-portfolio`**

```bash
git rm -r -q --cached node_modules .history 2>/dev/null; rm -rf node_modules .history
git rm -r -q v2 CSS JS IMAGE index.html package.json package-lock.json .vscode .gitattributes 2>/dev/null; true
```

- [ ] **Step 3: `package.json`**

```json
{
  "name": "portlucindo",
  "private": true,
  "version": "3.0.0",
  "type": "module",
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "cv": "tsx scripts/gerar-curriculo.tsx",
    "cv:importar": "tsx scripts/importar-linkedin.ts",
    "capturar": "node scripts/capturar-projetos.mjs",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@fontsource/geist": "^5.3.0",
    "@fontsource/geist-mono": "^5.3.0",
    "@fontsource/instrument-serif": "^5.3.0",
    "gsap": "^3.15.0",
    "lenis": "^1.3.26",
    "next": "^16.3.8",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "simple-icons": "^16.33.0",
    "zod": "^4.6.5"
  },
  "devDependencies": {
    "@react-pdf/renderer": "^4.9.0",
    "@types/node": "^24.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "playwright-core": "^1.63.0",
    "sharp": "^0.35.5",
    "tsx": "^4.23.15",
    "typescript": "^5.9.0",
    "vitest": "^5.0.3"
  }
}
```
Run: `npm install`

- [ ] **Step 4: `next.config.ts`, `tsconfig.json`, `netlify.toml`, `.gitignore`**

```ts
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }, // export estático: as imagens já são otimizadas por sharp no script
}
export default config
```
```json
{ "compilerOptions": { "target": "ES2022", "lib": ["dom", "dom.iterable", "esnext"], "strict": true, "noUncheckedIndexedAccess": true, "module": "esnext", "moduleResolution": "bundler", "jsx": "preserve", "incremental": true, "skipLibCheck": true, "noEmit": true, "resolveJsonModule": true, "isolatedModules": true, "paths": { "@/*": ["./src/*"] }, "plugins": [{ "name": "next" }] }, "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"], "exclude": ["node_modules"] }
```
```toml
# netlify.toml
[build]
  command = "npm run cv && npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "22"
```
```gitignore
node_modules
.next
out
.env*
.history
*.log
```

- [ ] **Step 5: Tokens e layout base**

`src/app/globals.css` com os tokens do spec (`--bg`, `--surface`, `--text`, `--text-soft`, `--accent`, `--line`, `--font-display`, `--font-body`, `--font-mono`, `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`) e a redefinição para `[data-theme='light']`. `src/app/layout.tsx` importa as fontes (`@fontsource/geist/latin-400.css`, `latin-500.css`, `latin-600.css`, `@fontsource/geist-mono/latin-400.css`, `@fontsource/instrument-serif/latin-400.css`, `latin-400-italic.css`), define `<html lang="pt-BR" data-theme="dark">`, metadados (título, descrição, Open Graph) e um script inline que lê `localStorage` antes da pintura.

- [ ] **Step 6: Página mínima e verificação**

```tsx
// src/app/page.tsx
export default function Home() {
  return <main><h1>Matheus Lucindo</h1></main>
}
```
Run: `npm run build && ls out/index.html`
Expected: build verde e o arquivo existe.

- [ ] **Step 7: Subir o servidor local e avisar o Senhor**

Run (em segundo plano): `npm run dev` → `http://localhost:3000`. Informar a URL ao Senhor; ele acompanha cada task daqui em diante.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore(site): esqueleto Next.js estático com tokens do design 3" -m "Remove node_modules, .history e os designs antigos do versionamento; eles seguem nas branches de arquivo." -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Fonte única de dados (schema, perfil e testes)

**Files:**
- Create: `src/content/schema.ts`, `src/content/profile.ts`, `src/content/contact.ts`, `tests/profile.test.ts`

**Interfaces:**
- Produces: `profileSchema`, `type Profile`, `profile: Profile`, `publicProfile` (sem e-mail), `emailEncoded: string`. Consumidos por TODOS os tasks seguintes.

- [ ] **Step 1: Teste que falha (privacidade e consistência dos dados)**

```ts
// tests/profile.test.ts
import { describe, expect, it } from 'vitest'
import { profile, publicProfile } from '../src/content/profile'
import { profileSchema } from '../src/content/schema'

describe('profile', () => {
  it('passa no schema', () => {
    expect(() => profileSchema.parse(profile)).not.toThrow()
  })
  it('não tem campos de dados pessoais proibidos', () => {
    const chaves = JSON.stringify(profile).toLowerCase()
    for (const proibido of ['"phone"', '"telefone"', '"cpf"', '"rg"', '"age"', '"idade"', '"endereco"']) {
      expect(chaves).not.toContain(proibido)
    }
  })
  it('publicProfile não carrega o e-mail', () => {
    expect(JSON.stringify(publicProfile)).not.toContain('@')
  })
  it('datas: BCR.CX começa em 2026-01 e a UMC em 2025-01', () => {
    const bcr = profile.experience.find((e) => e.company.startsWith('BCR.CX'))
    expect(bcr?.start).toBe('2026-01')
    expect(profile.education.find((e) => e.institution.startsWith('Universidade de Mogi'))?.start).toBe('2025-01')
  })
  it('traz as 43 certificações do LinkedIn', () => {
    const total = profile.certifications.reduce((n, c) => n + (c.items?.length ?? 1), 0)
    expect(total).toBe(43)
  })
  it('a trilha Microsoft Learning tem 27 entradas', () => {
    const ms = profile.certifications.find((c) => c.id === 'microsoft-learning')
    expect(ms?.items?.length).toBe(27)
  })
})
```
Run: `npx vitest run tests/profile.test.ts` → FAIL ("Cannot find module").

- [ ] **Step 2: `schema.ts` (zod)**

```ts
// src/content/schema.ts
import { z } from 'zod'

const mes = z.string().regex(/^\d{4}-\d{2}$/, 'use AAAA-MM')
const link = z.object({ label: z.string(), href: z.url() })

export const experienceSchema = z.object({
  company: z.string(), role: z.string(), kind: z.string(),
  start: mes, end: mes.nullable(), place: z.string(),
  summary: z.string(), highlights: z.array(z.string()), stack: z.array(z.string()),
})
export const educationSchema = z.object({
  institution: z.string(), course: z.string(), start: mes, end: mes,
  note: z.string().optional(), summary: z.string().optional(),
})
export const certificationSchema = z.object({
  id: z.string(), issuer: z.string(), title: z.string(),
  issued: mes.optional(), featured: z.boolean(), credential: z.string().optional(),
  skills: z.array(z.string()).optional(),
  items: z.array(z.object({ title: z.string(), issued: mes, track: z.string() })).optional(),
})
export const projectSchema = z.object({
  slug: z.string(), title: z.string(), kind: z.string(),
  status: z.enum(['producao', 'estudo', 'academico', 'em-construcao']),
  role: z.string(), summary: z.string(), stack: z.array(z.string()),
  featured: z.boolean(), cover: z.string().optional(),
  repo: z.url().optional(), demo: z.url().optional(),
})
export const recommendationSchema = z.object({
  name: z.string(), headline: z.string(), relation: z.string(), date: mes, text: z.string(),
})

export const profileSchema = z.object({
  name: z.string(), headline: z.string(), location: z.string(),
  summary: z.array(z.string()).min(1),
  links: z.array(link), email: z.email(), updatedAt: z.iso.date(),
  experience: z.array(experienceSchema), education: z.array(educationSchema),
  certifications: z.array(certificationSchema), projects: z.array(projectSchema),
  skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
  languages: z.array(z.object({ name: z.string(), level: z.string() })),
  recommendations: z.array(recommendationSchema),
})
export type Profile = z.infer<typeof profileSchema>
```

- [ ] **Step 3: `profile.ts` com os dados reais do LinkedIn**

Preencher **apenas** com o que consta no texto colado pelo Senhor em 01/10/2026: resumo (3 parágrafos curtos, sem idade), experiência (BCR.CX 2026-01→atual; UMC PIBIC 2025-09→atual; Rádio SAT FM 2025-10→2025-11; Cristais Gold Lar 2025-02→2025-08; Instituto Unidos para Transformar 2025-07→2025-07), formação (UMC 2025-01→2026-12; Senai SP 2023-01→2024-12 com "representante de sala por 2 anos"; Sesi SP 2022-03→2024-12 com "média geral 9,5"), as 43 certificações (destaque: Alura Imersão IA, Imersão Dev Agentes de IA Google, FIAP Connect Summit, FIAP Semana Carreira Tech, EBAC Jornada QA, Microsoft GitHub Copilot Challenge, Cisco Introduction to IoT, Santander IA Generativa, Senai Power BI; o card `microsoft-learning` com `items` das 27 entradas agrupadas em `track` = `GitHub`, `Microsoft 365 para educação` ou `IA e Copilot for Security`), 2 recomendações (Iago Dantas e Flávio Francisco da Silva, textos integrais), idiomas (Português nativo; Inglês básico), links (LinkedIn, GitHub, Credly, Lattes, YouTube) e competências agrupadas só com o que ele citou (Python, TypeScript, Node.js, PHP, Java, Spring Boot, Next.js, React, FastAPI, Docker, Linux, Postman, MongoDB, PostgreSQL, Supabase, Zendesk).

```ts
// src/content/profile.ts (trecho do final do arquivo)
import { profileSchema, type Profile } from './schema'

const dados: Profile = { /* dados acima */ } as Profile
export const profile: Profile = profileSchema.parse(dados)
const { email: _email, ...semEmail } = profile
export const publicProfile = semEmail
```
```ts
// src/content/contact.ts — só importado em Server Components
import { profile } from './profile'
export const emailEncoded = Buffer.from(profile.email).toString('base64')
```

- [ ] **Step 4: Rodar os testes**

Run: `npx vitest run tests/profile.test.ts` → PASS (6 testes).

- [ ] **Step 5: Commit**

`git add src/content tests/profile.test.ts && git commit -m "feat(dados): fonte única do perfil com schema e testes de privacidade"`

---

### Task 4: Gerador do currículo em PDF

**Files:**
- Create: `src/lib/pdf-document.tsx`, `scripts/gerar-curriculo.tsx`, `tests/cv.test.ts`
- Output: `public/curriculo-matheus-lucindo.pdf`

**Interfaces:**
- Consumes: `profile` (Task 3).
- Produces: `CurriculoDocument({ profile }): JSX.Element`; arquivo PDF; função `selecionarDestaques(profile, limite)` usada para respeitar 2 páginas.

- [ ] **Step 1: Teste que falha**

```ts
// tests/cv.test.ts
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { beforeAll, describe, expect, it } from 'vitest'

const pdf = 'public/curriculo-matheus-lucindo.pdf'
const texto = () => execFileSync('pdftotext', ['-layout', pdf, '-']).toString()

describe('currículo em PDF', () => {
  beforeAll(() => { execFileSync('npm', ['run', 'cv', '--silent'], { stdio: 'inherit' }) })
  it('existe', () => expect(existsSync(pdf)).toBe(true))
  it('tem no máximo 2 páginas', () => {
    const info = spawnSync('pdfinfo', [pdf]).stdout.toString()
    expect(Number(/Pages:\s+(\d+)/.exec(info)?.[1])).toBeLessThanOrEqual(2)
  })
  it('contém nome, empresa atual e formação', () => {
    const t = texto()
    for (const esperado of ['Matheus Lucindo', 'BCR.CX', 'Universidade de Mogi das Cruzes', 'Sesi']) expect(t).toContain(esperado)
  })
  it('NÃO contém telefone, CPF, RG, endereço nem idade', () => {
    const t = texto()
    expect(t).not.toMatch(/\+?55 ?\(?\d{2}\)? ?9?\d{4}-?\d{4}/)
    expect(t).not.toMatch(/\d{3}\.\d{3}\.\d{3}-\d{2}/)
    expect(t).not.toMatch(/\b\d{2} anos\b/i)
    expect(t).not.toMatch(/\b(CPF|RG)\b/)
  })
  it('lista o card da Microsoft Learning com a contagem', () => expect(texto()).toMatch(/Microsoft Learning.*27/s))
})
```
Run: `npx vitest run tests/cv.test.ts` → FAIL (script inexistente).

- [ ] **Step 2: Documento do PDF**

```tsx
// src/lib/pdf-document.tsx
import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { Profile } from '../content/schema'

const fonte = (arquivo: string) => `node_modules/@fontsource/${arquivo}`
Font.register({ family: 'Geist', fonts: [
  { src: fonte('geist/files/geist-latin-400-normal.woff'), fontWeight: 400 },
  { src: fonte('geist/files/geist-latin-600-normal.woff'), fontWeight: 600 },
] })
Font.register({ family: 'Serif', src: fonte('instrument-serif/files/instrument-serif-latin-400-italic.woff') })
Font.registerHyphenationCallback((palavra) => [palavra]) // sem hifenização automática

const s = StyleSheet.create({
  pagina: { fontFamily: 'Geist', fontSize: 9, color: '#18181b', padding: 36, lineHeight: 1.4 },
  nome: { fontFamily: 'Serif', fontSize: 26 },
  cargo: { fontSize: 10.5, color: '#52525b', marginTop: 2 },
  contato: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 6, fontSize: 8.5 },
  titulo: { fontSize: 8, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 14, marginBottom: 5, borderBottomWidth: 0.5, borderBottomColor: '#d4d4d8', paddingBottom: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between' },
  forte: { fontWeight: 600 },
  mudo: { color: '#52525b' },
  bloco: { marginBottom: 6 },
})

export const mesAno = (aaaamm: string | null) => {
  if (!aaaamm) return 'atual'
  const [ano, mes] = aaaamm.split('-')
  return `${['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'][Number(mes) - 1]}/${ano}`
}

export function selecionarDestaques(profile: Profile, limite: number) {
  // A trilha Microsoft Learning aparece à parte, como uma linha de contagem.
  return profile.certifications.filter((c) => c.featured && c.id !== 'microsoft-learning').slice(0, limite)
}

export function CurriculoDocument({ profile }: { profile: Profile }) {
  const destaques = selecionarDestaques(profile, 8)
  const ms = profile.certifications.find((c) => c.id === 'microsoft-learning')
  return (
    <Document title={`Currículo — ${profile.name}`} author={profile.name} language="pt-BR" subject="Currículo">
      <Page size="A4" style={s.pagina}>
        <Text style={s.nome}>{profile.name}</Text>
        <Text style={s.cargo}>{profile.headline}</Text>
        <View style={s.contato}>
          <Text>{profile.email}</Text>
          {profile.links.slice(0, 3).map((l) => <Link key={l.href} src={l.href}>{l.label}</Link>)}
          <Text style={s.mudo}>{profile.location}</Text>
        </View>
        <Text style={s.titulo}>Resumo</Text>
        <Text>{profile.summary[0]}</Text>
        <Text style={s.titulo}>Experiência</Text>
        {profile.experience.map((e) => (
          <View key={e.company + e.start} style={s.bloco} wrap={false}>
            <View style={s.linha}><Text style={s.forte}>{e.role} · {e.company}</Text><Text style={s.mudo}>{mesAno(e.start)} – {mesAno(e.end)}</Text></View>
            <Text>{e.summary}</Text>
          </View>
        ))}
        <Text style={s.titulo}>Formação</Text>
        {profile.education.map((e) => (
          <View key={e.institution + e.start} style={s.linha}><Text><Text style={s.forte}>{e.institution}</Text> — {e.course}</Text><Text style={s.mudo}>{mesAno(e.start)} – {mesAno(e.end)}</Text></View>
        ))}
        <Text style={s.titulo}>Projetos</Text>
        {profile.projects.filter((p) => p.featured).map((p) => (
          <View key={p.slug} style={s.bloco} wrap={false}><Text><Text style={s.forte}>{p.title}</Text> · {p.stack.join(', ')}</Text><Text style={s.mudo}>{p.summary}</Text></View>
        ))}
        <Text style={s.titulo}>Competências</Text>
        {profile.skills.map((g) => <Text key={g.group}><Text style={s.forte}>{g.group}: </Text>{g.items.join(', ')}</Text>)}
        <Text style={s.titulo}>Certificações</Text>
        {destaques.map((c) => <Text key={c.id}>{c.issuer} — {c.title}{c.issued ? ` (${mesAno(c.issued)})` : ''}</Text>)}
        {ms?.items && <Text style={s.mudo}>Microsoft Learning: {ms.items.length} certificados (GitHub, IA, Copilot for Security)</Text>}
        <Text style={s.titulo}>Idiomas</Text>
        <Text>{profile.languages.map((i) => `${i.name} (${i.level})`).join(' · ')}</Text>
      </Page>
    </Document>
  )
}
```

- [ ] **Step 3: Script de geração**

```tsx
// scripts/gerar-curriculo.tsx
import { mkdirSync } from 'node:fs'
import { renderToFile } from '@react-pdf/renderer'
import { CurriculoDocument } from '../src/lib/pdf-document'
import { profile } from '../src/content/profile'

mkdirSync('public', { recursive: true })
await renderToFile(<CurriculoDocument profile={profile} />, 'public/curriculo-matheus-lucindo.pdf')
console.log('PDF gerado: public/curriculo-matheus-lucindo.pdf')
```

- [ ] **Step 4: Rodar e conferir visualmente**

```bash
npx vitest run tests/cv.test.ts
pdftoppm -r 80 -png public/curriculo-matheus-lucindo.pdf /tmp/cv-prev && ls /tmp/cv-prev*
```
Expected: 5 testes PASS; imagens geradas. Abrir as imagens e corrigir espaçamento/quebras antes do commit.

- [ ] **Step 5: Commit**

`git add src/lib scripts public/curriculo-matheus-lucindo.pdf tests/cv.test.ts && git commit -m "feat(curriculo): gerador de PDF a partir da fonte única de dados"`

---

### Task 5: Casca do site (navegação, scroll suave, animações, tema)

**Files:**
- Create: `src/lib/scroll.ts`, `src/hooks/useScrollAnimations.ts`, `src/components/{Nav,Reveal,Footer}.tsx`
- Modify: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Interfaces:**
- Produces: `initSmoothScroll(): () => void`, `lockScroll()/unlockScroll()`, `useScrollAnimations()`, `<Reveal as? delay?>`. Cada seção usa `data-anim="rise"` ou `data-anim="stagger"`.

- [ ] **Step 1: `scroll.ts` (Lenis + ScrollTrigger)**

```ts
// src/lib/scroll.ts
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis: Lenis | null = null
const OFFSET_CABECALHO = -88

export function initSmoothScroll(): () => void {
  gsap.registerPlugin(ScrollTrigger)
  lenis = new Lenis({ lerp: 0.09, anchors: { offset: OFFSET_CABECALHO } })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t: number) => lenis?.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = null }
}
export const lockScroll = () => { lenis?.stop(); document.body.style.overflow = 'hidden' }
export const unlockScroll = () => { lenis?.start(); document.body.style.overflow = '' }
```

- [ ] **Step 2: `useScrollAnimations.ts`**

Dentro de `useLayoutEffect`, um `gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', ...)` que: (a) para cada `[data-anim="rise"]` faz `gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })`; (b) para `[data-anim="stagger"]` anima os filhos com `stagger: 0.09`; (c) barra de progresso `.scroll-progress` com `scaleX` preso ao scroll (`scrub: 0.3`); (d) chama `ScrollTrigger.refresh()` em `document.fonts.ready`. Retorna `media.revert()` e a limpeza do Lenis.

- [ ] **Step 3: Navegação**

`Nav` fixa, com pílula translúcida: marca `LUCINDO©` (o `©` em `--accent`), links por âncora (Projetos, Trajetória, Certificações, Contato), alternador de tema e o botão **"Baixar currículo"** (`<a href="/curriculo-matheus-lucindo.pdf" download>`) sempre visível, inclusive no mobile (ícone + texto curto). Alvos de toque ≥ 44 px, foco visível, `aria-label` nos ícones.

- [ ] **Step 4: Verificar e commitar**

Run: `npm run build` e abrir `http://localhost:3000`: rolar a página, conferir barra de progresso, tema claro/escuro e o botão de currículo baixando o PDF.
`git commit -m "feat(site): navegação, scroll suave e animações de entrada"`

---

### Task 6: Hero e letreiro de tecnologias

**Files:**
- Create: `src/components/{Hero,StackMarquee}.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css`

**Interfaces:**
- Consumes: `publicProfile`. Produces: `<Hero />`, `<StackMarquee />`.

- [ ] **Step 1: Hero**

Nome em duas linhas (`MATHEUS` / `LUCINDO©`, `font-size: clamp(3rem, 12vw, 9rem)`, `Instrument Serif` itálico na segunda linha), cargo (`publicProfile.headline`), selo "Disponível" só se `publicProfile.availability` for verdadeiro, relógio ao vivo (`Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' })` atualizado a cada 30 s num `useEffect`), botão primário **"Ver projetos"** (`#projetos`) e secundário **"Baixar currículo"**. Foto `public/images/matheus.jpg` com `width`/`height`, `priority`, tratamento duotone via CSS (`mix-blend-mode` sobre gradiente) e parallax suave (`yPercent` preso ao scroll, só com movimento permitido).

- [ ] **Step 2: Letreiro**

Duas cópias da fileira (`aria-hidden` na segunda), animação CSS `translateX(-50%)` em 40 s, pausa no hover, máscara de bordas; sob `prefers-reduced-motion` vira grade estática. Logos de `simple-icons` para: Python, TypeScript, Node.js, PHP, Docker, MongoDB, PostgreSQL, React, Next.js, Spring, Zendesk, Postman, Linux, GitHub.

- [ ] **Step 3: Verificar nos tamanhos e commitar**

Capturar 1440/390/320 px com Playwright e conferir: sem estouro horizontal (`document.documentElement.scrollWidth <= innerWidth`), nome inteiro visível em 320 px.
`git commit -m "feat(site): hero com relógio ao vivo e letreiro de tecnologias"`

---

### Task 7: Sobre e Trajetória

**Files:** Create `src/components/{About,Timeline}.tsx`; Modify `src/app/page.tsx`, `src/app/globals.css`.

- [ ] **Step 1: Sobre**

Três parágrafos de `publicProfile.summary` e uma faixa de fatos verificáveis calculados dos dados (nunca digitados): `certifications` total (43), `experience` atual (empresa e mês de início formatado), integrações citadas (Zendesk, Mercado Livre, Cnova, Reclame Aqui). Sem contadores de repositório.

- [ ] **Step 2: Trajetória**

Linha do tempo vertical gerada de `experience` + `education` + marcos (Agendei mai/2026, Imersão IA jun/2026, **início da produção do WEAVE jan/2027**, no futuro, com estilo tracejado). A linha central é um `<svg>`/`div` cuja altura é "desenhada" pelo scroll (`scaleY` com `scrub`). Cada item é um `<article>` com `<time dateTime="AAAA-MM">`.

- [ ] **Step 3: Verificar e commitar**

Conferir ordem cronológica e que nenhuma data diverge do LinkedIn. `git commit -m "feat(site): seções Sobre e Trajetória"`

---

### Task 8: Projetos com capturas reais

**Files:**
- Create: `scripts/capturar-projetos.mjs`, `src/components/Projects.tsx`, `public/images/projetos/*.webp`
- Modify: `src/content/profile.ts` (lista `projects`), `tests/profile.test.ts`

**Interfaces:**
- Consumes: `profile.projects`. Produces: `public/images/projetos/<slug>-{desktop,mobile}.webp`.

- [ ] **Step 1: Teste que falha (cada projeto tem imagem local)**

```ts
// adicionar em tests/profile.test.ts
import { existsSync } from 'node:fs'
it('todo projeto com demo tem captura local', () => {
  for (const p of profile.projects.filter((x) => x.demo)) {
    expect(existsSync(`public/images/projetos/${p.slug}-desktop.webp`), p.slug).toBe(true)
  }
})
```

- [ ] **Step 2: Ler o README de cada candidato e redigir o resumo real**

Lista enviada pelo Senhor em 01/10/2026 (visibilidade conferida com `gh`):

| Projeto | Repositório | Demo ao vivo | Observação |
|---|---|---|---|
| Agendei. | `Agendei-Barbearia-e-Salao-de-Beleza/Agendei.` (público) | `agendei-alpha.vercel.app` | Destaque. Ele liderou a equipe de 5. |
| Prodmais | `Prodmais-UMC/Prodmais` (público) | `prodmais-6g41.onrender.com` | Destaque (PIBIC/UMC). Render gratuito demora para acordar: timeout de 60 s na captura. |
| claude-cortex | `Matheus904-12/claude-cortex` (público, Go) | `claude-cortex.vercel.app` | Destaque. |
| WEAVE | `weave-platform/weave` (público) | `weave-platform-neon.vercel.app` | Card "Em construção — início da produção em janeiro de 2027". |
| WeatherAPI | `Matheus904-12/WeatherAPI` (público, Python) | `weather-api-seven-amber.vercel.app` | |
| Suburban | `Matheus904-12/Suburban` (público) | sem site | Texto do LinkedIn (Django, Channels, Celery, Redis). Imagem: do README, ou reserva. |
| ConectaTEA | `Matheus904-12/ConectaTEA` (público) | `conectatea.netlify.app` | Texto do LinkedIn (OTP, JWT, Socket.IO). |
| SunnyThings | `Matheus904-12/SunnyThings` (público) | `sunny-things.vercel.app` | App de compras de mercado em React Native (2024). |
| EcommerceMontink | `Matheus904-12/EcommerceMontink` (público, PHP) | sem site | Mini ERP. Imagem do README ou reserva. |
| Cerne | `Matheus904-12/cerne` (**privado**) | `cerne-five.vercel.app` | Rótulo "código privado", só o link da demo. |
| InovaMold | texto do LinkedIn | a confirmar | Sem repositório informado. |
| happyEnd-finall | `Matheus904-12/happyEnd-finall` (público, CSS) | sem site | **Sem descrição: o Senhor precisa dizer o que é antes de entrar.** |

`scripts/alvos-captura.json` recebe `{ slug, url }` só para os que têm demo.

Para cada repositório confirmado pelo Senhor: `gh repo view Matheus904-12/<repo> --json description,homepageUrl` e `gh api repos/Matheus904-12/<repo>/readme`. Os textos do **InovaMold**, **Suburban** e **ConectaTEA** vêm do LinkedIn (já enviados). Marcar `status`, `role` e `stack` só com o que o README ou o LinkedIn afirmam. **WEAVE:** `status: 'em-construcao'`, texto "Início da produção em janeiro de 2027", `demo: https://weave-platform-neon.vercel.app`.

- [ ] **Step 3: Script de captura**

```js
// scripts/capturar-projetos.mjs
import { chromium } from 'playwright-core'
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { readFileSync } from 'node:fs'

const alvos = JSON.parse(readFileSync('scripts/alvos-captura.json', 'utf8')) // [{ slug, url }]
mkdirSync('public/images/projetos', { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome', args: ['--no-sandbox'] })
for (const { slug, url } of alvos) {
  for (const [nome, largura, altura, movel] of [['desktop', 1440, 900, false], ['mobile', 390, 844, true]]) {
    const ctx = await browser.newContext({ viewport: { width: largura, height: altura }, isMobile: movel, deviceScaleFactor: 2 })
    const page = await ctx.newPage()
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
      await page.waitForTimeout(1500)
      const png = await page.screenshot()
      await sharp(png).resize({ width: largura }).webp({ quality: 82 }).toFile(`public/images/projetos/${slug}-${nome}.webp`)
      console.log('ok', slug, nome)
    } catch (e) { console.log('FALHOU', slug, nome, String(e).slice(0, 80)) }
    await ctx.close()
  }
}
await browser.close()
```

- [ ] **Step 4: Cards**

`Projects`: 3 destaques grandes (estudo de caso curto: problema, o que ele fez, stack, links "Código" e "Demo") e grade dos demais. Imagem com `width`/`height` fixos e `aspect-ratio`, fundo de reserva da cor da superfície se faltar a captura. Projeto privado: rótulo "código privado", sem link de repositório. Brilho que segue o cursor só em ponteiro fino.

- [ ] **Step 5: Rodar e commitar**

Run: `npm run capturar && npx vitest run tests/profile.test.ts` → PASS.
`git commit -m "feat(projetos): estudos de caso com capturas reais dos deploys"`

---

### Task 9: Certificações e modal da Microsoft Learning

**Files:** Create `src/components/{Certifications,CertificationsModal}.tsx`, `tests/certifications.test.ts`; Modify `src/app/page.tsx`.

**Interfaces:**
- Consumes: `profile.certifications`. Produces: `<Certifications />` (client), `<CertificationsModal items onClose />`.

- [ ] **Step 1: Teste que falha**

```ts
// tests/certifications.test.ts
import { expect, it } from 'vitest'
import { profile } from '../src/content/profile'

it('destaques vêm antes e não incluem a trilha Microsoft Learning', () => {
  const destaques = profile.certifications.filter((c) => c.featured && c.id !== 'microsoft-learning')
  expect(destaques.length).toBeGreaterThanOrEqual(6)
})
it('as 27 entradas do modal têm trilha e data', () => {
  const ms = profile.certifications.find((c) => c.id === 'microsoft-learning')!
  expect(ms.items!.every((i) => i.track && /^\d{4}-\d{2}$/.test(i.issued))).toBe(true)
})
```

- [ ] **Step 2: Componentes**

`Certifications`: grade com os destaques (emissor, título, mês/ano, competências, código de credencial quando houver) e **um card especial** "Microsoft Learning — 27 certificados" com texto "Trilhas de GitHub, IA e Copilot for Security" e o botão **"Ver todos"**. `CertificationsModal` usa `<dialog>` nativo (`showModal()`), foco preso, `Esc` fecha, clique no fundo fecha, `lockScroll()/unlockScroll()` ao abrir/fechar, lista agrupada por `track` (GitHub, Microsoft 365 para educação, IA e Copilot for Security) com `<h3>` por trilha e `<time>` por item, rolagem interna, e `aria-labelledby`. O botão que abriu recebe o foco de volta ao fechar.

- [ ] **Step 3: Verificar**

Testar com teclado (Tab, Shift+Tab, Esc), 320 px e leitor de tela (nome acessível do botão: "Ver os 27 certificados da Microsoft Learning").
`git commit -m "feat(certificacoes): destaques de marca e modal com a trilha Microsoft Learning"`

---

### Task 10: Depoimentos, Currículo, Contato e Rodapé

**Files:** Create `src/components/{Testimonials,CvSection,Contact}.tsx`, `public/forms.html`; Modify `src/components/Footer.tsx`, `src/app/page.tsx`.

- [ ] **Step 1: Depoimentos**

Carrossel com as `recommendations` do LinkedIn (nome, cargo, relação, mês) com botões anterior/próximo, `aria-live="polite"` e navegação por teclado.

- [ ] **Step 2: Seção Currículo**

Prévia do PDF (`pdftoppm` gerou `public/images/curriculo-previa.webp` em `npm run cv`), botão **"Baixar PDF"** com `download`, texto "Atualizado em {profile.updatedAt formatado}" vindo dos dados.

- [ ] **Step 3: Contato**

E-mail **codificado**: `Contact` recebe `emailEncoded` (prop vinda de Server Component) e só decodifica (`atob`) no clique em **"Copiar e-mail"** e em **"Escrever"** (`mailto:`). LinkedIn e GitHub como links. Formulário com `name`, `email`, `message`, honeypot `bot-field`, estados enviando/sucesso/erro; envio por `fetch('/', { method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: new URLSearchParams({ 'form-name': 'contato', ... }) })`.
`public/forms.html`:
```html
<form name="contato" data-netlify="true" netlify-honeypot="bot-field" hidden>
  <input name="name" /><input name="email" /><textarea name="message"></textarea><input name="bot-field" />
</form>
```

- [ ] **Step 4: Rodapé**

Assinatura, links, e "Evolução do design" com três cartões (Design 1, 2, 3) apontando para as branches/URLs de arquivo, **só se o Senhor ativar os branch deploys**.

- [ ] **Step 5: Commit**

`git commit -m "feat(site): depoimentos, seção de currículo, contato protegido e rodapé"`

---

### Task 11: Privacidade, SEO, acessibilidade e desempenho

**Files:** Create `tests/privacy.test.ts`, `scripts/auditar.mjs`; Modify `src/app/layout.tsx`, `public/robots.txt`, `public/sitemap.xml`

- [ ] **Step 1: Teste de privacidade sobre o site publicado (`out/`)**

```ts
// tests/privacy.test.ts
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { profile } from '../src/content/profile'

const arquivos = () => execFileSync('find', ['out', '-type', 'f', '(', '-name', '*.html', '-o', '-name', '*.js', '-o', '-name', '*.json', '-o', '-name', '*.txt', ')']).toString().trim().split('\n')

describe('site publicado (out/)', () => {
  const conteudo = arquivos().map((f) => readFileSync(f, 'utf8')).join('\n')
  it('não expõe o e-mail em texto puro', () => expect(conteudo).not.toContain(profile.email))
  it('não expõe telefone', () => expect(conteudo).not.toMatch(/\+?55 ?\(?\d{2}\)? ?9?\d{4}-?\d{4}/))
  it('não expõe idade', () => expect(conteudo).not.toMatch(/\b(18|19|20) anos\b/))
  it('não publica CPF nem RG', () => expect(conteudo).not.toMatch(/\d{3}\.\d{3}\.\d{3}-\d{2}/))
})
```
Run: `npm run build && npx vitest run tests/privacy.test.ts` → PASS.

- [ ] **Step 2: SEO**

`metadata` com título, descrição, `openGraph` (imagem 1200×630 gerada com `sharp`), `twitter`, `canonical`, dados estruturados JSON-LD `Person` (nome, cargo, links `sameAs`; **sem e-mail nem telefone**), `robots.txt`, `sitemap.xml`.

- [ ] **Step 3: Auditoria automatizada**

`scripts/auditar.mjs` abre o site (`npx serve out`) em 320/360/390/768/1024/1440 px e verifica: sem estouro horizontal, `h1` único, `alt` em toda imagem, foco visível, contraste via axe (`@axe-core/playwright`), e roda Lighthouse (`npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo`, que simula mobile por padrão). Corrigir tudo que ficar abaixo das metas.

- [ ] **Step 4: Movimento reduzido e JS desligado**

Rodar o site com `reducedMotion: 'reduce'` e com `javaScriptEnabled: false`: todo o texto precisa estar visível.
`git commit -m "test(site): privacidade do HTML publicado, SEO e auditoria de acessibilidade"`

---

### Task 12: Atualização do currículo a partir do LinkedIn

**Files:** Create `src/lib/linkedin-csv.ts`, `scripts/importar-linkedin.ts`, `tests/linkedin-csv.test.ts`, `.claude/commands/atualizar-curriculo.md`

**Interfaces:**
- Produces: `parseCsv(texto: string): Record<string, string>[]` e `diffPerfil(atual: Profile, csv: { positions: Record<string,string>[]; education: Record<string,string>[] }): string[]`.

- [ ] **Step 1: Teste que falha**

```ts
// tests/linkedin-csv.test.ts
import { expect, it } from 'vitest'
import { parseCsv } from '../src/lib/linkedin-csv'

it('lê CSV do LinkedIn com vírgulas e aspas dentro do campo', () => {
  const csv = 'Company Name,Title,Started On\n"BCR.CX, Zendesk",Desenvolvedor,"Jan 2026"\n'
  expect(parseCsv(csv)).toEqual([{ 'Company Name': 'BCR.CX, Zendesk', Title: 'Desenvolvedor', 'Started On': 'Jan 2026' }])
})
it('ignora linhas vazias e preserva quebra de linha entre aspas', () => {
  const csv = 'A,B\n"x\ny",z\n\n'
  expect(parseCsv(csv)).toEqual([{ A: 'x\ny', B: 'z' }])
})
```

- [ ] **Step 2: Implementar `parseCsv`**

```ts
// src/lib/linkedin-csv.ts
export function parseCsv(texto: string): Record<string, string>[] {
  const linhas: string[][] = []
  let campo = '', linha: string[] = [], aspas = false
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i]!
    if (aspas) {
      if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++ }
      else if (c === '"') aspas = false
      else campo += c
    } else if (c === '"') aspas = true
    else if (c === ',') { linha.push(campo); campo = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && texto[i + 1] === '\n') i++
      linha.push(campo); campo = ''
      if (linha.some((x) => x !== '')) linhas.push(linha)
      linha = []
    } else campo += c
  }
  if (campo !== '' || linha.length) { linha.push(campo); if (linha.some((x) => x !== '')) linhas.push(linha) }
  const [cabecalho = [], ...corpo] = linhas
  return corpo.map((l) => Object.fromEntries(cabecalho.map((h, i) => [h, l[i] ?? ''])))
}
```
Run: `npx vitest run tests/linkedin-csv.test.ts` → PASS.

- [ ] **Step 3: Script `importar-linkedin.ts`**

Recebe o caminho do `.zip` do export oficial, extrai `Positions.csv`, `Education.csv`, `Certifications.csv`, compara com `profile.ts` e **imprime um diff legível** (empresas novas, mudança de datas, certificados novos). **Nunca grava sozinho**: o Senhor (ou o Claude, via comando) aplica depois de aprovar.

- [ ] **Step 4: Comando do Claude Code**

`.claude/commands/atualizar-curriculo.md`: instruções para (1) receber o texto colado do LinkedIn ou o diff do importador; (2) comparar com `src/content/profile.ts`; (3) mostrar o diff e **esperar o "ok"**; (4) aplicar, rodar `npm test` e `npm run cv`; (5) conferir o PDF com `pdftoppm`; (6) commitar `feat(dados): atualiza perfil a partir do LinkedIn`. Regra explícita: nunca incluir telefone, idade, CPF, RG ou endereço.

- [ ] **Step 5: Commit**

`git commit -m "feat(curriculo): importador do export do LinkedIn e comando de atualização"`

---

### Task 13: README, Netlify e fechamento

**Files:** Create/Modify `README.md`; Modify `netlify.toml`

- [ ] **Step 1: README profissional** (o que é, capturas reais, como rodar, como atualizar o currículo, estrutura, decisões, privacidade, licença). Sem emoji decorativo e sem jargão vazio.

- [ ] **Step 2: Verificação final completa**

```bash
npm run cv && npm test && npm run build && node scripts/auditar.mjs
```
Expected: tudo verde. Conferir à mão: PDF de ≤ 2 páginas, site em 320/390/768/1440, tema claro, movimento reduzido, modal da Microsoft por teclado.

- [ ] **Step 3: Entregar ao Senhor para aprovação visual**, com capturas.

- [ ] **Step 4: Publicar só com o "sim" do Senhor**

1. Merge de `feat/design-3-portfolio` na `main` (`--no-ff`).
2. `git push origin main`; o Netlify (ligado ao repositório) faz o deploy com `npm run cv && npm run build`.
3. Conferir `https://lucindoporto.netlify.app` com o navegador: carrega, PDF baixa, formulário envia.
4. Opcional: ativar *branch deploys* das branches `arquivo/*`.
