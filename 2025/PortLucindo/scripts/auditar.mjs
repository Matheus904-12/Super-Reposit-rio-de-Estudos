// Auditoria do site estático em out/: estouro horizontal, h1, alt, axe, movimento reduzido e sem JS.
import { chromium } from 'playwright-core'
import { AxeBuilder } from '@axe-core/playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.txt': 'text/plain', '.xml': 'application/xml', '.json': 'application/json' }
const servidor = createServer(async (req, res) => {
  const caminho = decodeURIComponent(req.url.split('?')[0])
  const alvo = join('out', caminho.endsWith('/') ? caminho + 'index.html' : caminho)
  try { res.writeHead(200, { 'content-type': tipos[extname(alvo)] ?? 'application/octet-stream' }); res.end(await readFile(alvo)) }
  catch { res.writeHead(404); res.end() }
}).listen(4190)

const navegador = await chromium.launch({ executablePath: '/usr/bin/google-chrome' })
const falhas = []
const url = 'http://localhost:4190/'

for (const largura of [320, 360, 390, 768, 1024, 1440]) {
  const contexto = await navegador.newContext({ viewport: { width: largura, height: 900 } })
  const pagina = await contexto.newPage()
  await pagina.goto(url, { waitUntil: 'networkidle' })
  await pagina.waitForTimeout(2500)
  const r = await pagina.evaluate(() => ({
    estouro: document.documentElement.scrollWidth - innerWidth,
    h1: document.querySelectorAll('h1').length,
    semAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
  }))
  if (r.estouro > 0) falhas.push(`${largura}px: estouro horizontal de ${r.estouro}px`)
  if (r.h1 !== 1) falhas.push(`${largura}px: ${r.h1} h1`)
  if (r.semAlt) falhas.push(`${largura}px: ${r.semAlt} imagens sem alt`)
  if (largura === 390 || largura === 1440) {
    for (const tema of ['dark', 'light']) {
      await pagina.evaluate((t) => { document.documentElement.dataset.theme = t }, tema)
      await pagina.waitForTimeout(600)
      // Cartões entram dimmed pelo efeito de inclinação; centraliza o botão para medir o estado de repouso.
      await pagina.locator('.barra-acoes .btn-primario').scrollIntoViewIfNeeded()
      await pagina.waitForTimeout(900)
      const axe = await new AxeBuilder({ page: pagina }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze()
      for (const v of axe.violations) falhas.push(`${largura}px ${tema} axe ${v.id} (${v.nodes.length}): ${v.nodes[0].target.join(' ')}`)
    }
  }
  await contexto.close()
}

const semJs = await navegador.newPage({ javaScriptEnabled: false })
await semJs.goto(url)
const invisiveis = await semJs.evaluate(() => [...document.querySelectorAll('h1,h2,main p')].filter((e) => getComputedStyle(e).opacity === '0' || getComputedStyle(e).visibility === 'hidden').map((e) => e.textContent.slice(0, 40)))
if (invisiveis.length) falhas.push(`sem JS, invisíveis: ${invisiveis.join(' | ')}`)

const movimento = await navegador.newPage({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })
await movimento.goto(url, { waitUntil: 'networkidle' })
const ocultos = await movimento.evaluate(() => [...document.querySelectorAll('h1,h2,main p')].filter((e) => Number(getComputedStyle(e).opacity) < 0.99).map((e) => e.textContent.slice(0, 40)))
if (ocultos.length) falhas.push(`movimento reduzido, com opacidade < 1: ${ocultos.join(' | ')}`)

await navegador.close(); servidor.close()
console.log(falhas.length ? falhas.join('\n') : 'Auditoria sem falhas.')
process.exit(falhas.length ? 1 : 0)
