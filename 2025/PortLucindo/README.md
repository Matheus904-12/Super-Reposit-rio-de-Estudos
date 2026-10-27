# Portfólio — Matheus Lucindo

Terceira versão do meu portfólio. Site estático em português, com currículo em PDF gerado a partir dos mesmos dados.

**No ar:** https://lucindoporto.netlify.app

## O que tem

- Trajetória separada em trabalho e formação, projetos reais com capturas, certificações com modal, recomendações e contato.
- Currículo em PDF (A4, até 2 páginas) gerado do mesmo conteúdo do site, então os dois nunca se contradizem.
- Tema claro e escuro, responsivo de 320 a 1440 px, respeita `prefers-reduced-motion` e funciona sem JavaScript.
- Lighthouse mobile: Acessibilidade 100, Boas práticas 100, SEO 100, Desempenho 88–89.

## Rodando

Node.js 22 ou superior.

```bash
npm install
npm run dev        # http://localhost:3000
npm run verificar  # gera o PDF, builda e roda os testes
node scripts/auditar.mjs   # após o build: axe, estouro horizontal, sem JS, movimento reduzido
```

## Atualizando o currículo

Todo o conteúdo está em `src/content/` (`publico.ts` e `data/*.ts`). O PDF sai de `npm run cv`.

Para trazer novidades do LinkedIn, peça o export oficial (Configurações → Privacidade → Obter cópia dos dados), e rode:

```bash
npm run cv:importar -- caminho/do/export.zip
```

O script só imprime o que falta no perfil. Quem aplica é você, ou o comando `/atualizar-curriculo` do Claude Code, depois de revisar.

## Estrutura

```
src/content/    Dados (schema zod, público e privado separados)
src/components/ Seções e diálogos
src/lib/        Formatação, linha do tempo, contato, importador de CSV
src/styles/     CSS por área
scripts/        PDF, capturas de projetos, foto, OG, auditoria, importador
tests/          Vitest: dados, PDF, privacidade do HTML publicado
```

## Decisões

- **E-mail fora do HTML.** Fica em `privado.ts`, codificado e só decodificado no clique. Um teste varre `out/` e falha se o endereço, telefone, CPF ou RG aparecerem.
- **Projetos sem demo viva ficam como side projects.** Capturas são feitas por script (`npm run capturar`), nunca montadas à mão.
- **Animações fora do caminho crítico.** Só a entrada do hero roda de imediato; o resto espera a primeira pintura.

## Versões anteriores

Design 1 (2024–2025) e design 2 (2026) continuam nas branches `arquivo/design-1-2024-2025` e `arquivo/design-2-2026`.

## Licença

Todos os direitos reservados © 2026 Matheus Lucindo. Veja [LICENSE](LICENSE).
