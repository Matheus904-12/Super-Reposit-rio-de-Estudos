// Captura telas reais dos deploys. Uso: npm run capturar [slug ...]
import { mkdirSync, readFileSync } from 'node:fs'
import { chromium } from 'playwright-core'
import sharp from 'sharp'

const so = process.argv.slice(2)
const alvos = JSON.parse(readFileSync('scripts/alvos-captura.json', 'utf8')).filter((a) => !so.length || so.includes(a.slug))
mkdirSync('public/images/projetos', { recursive: true })

const TAMANHOS = [
  { nome: 'desktop', largura: 1440, altura: 900, movel: false },
  { nome: 'mobile', largura: 390, altura: 844, movel: true },
]

/** Passos opcionais por projeto: esperar o servidor acordar (Render), preencher um campo ou clicar num botão. */
async function passosDoAlvo(page, alvo) {
  const limite = alvo.timeout ?? 45000
  if (alvo.esperarSumir) await page.waitForFunction((t) => !document.body.innerText.includes(t), alvo.esperarSumir, { timeout: limite })
  if (alvo.preencher) await page.locator(alvo.preencher.seletor).first().fill(alvo.preencher.texto)
  if (alvo.clicar) {
    await page.getByText(new RegExp(alvo.clicar)).first().click()
    await page.waitForLoadState('networkidle').catch(() => {})
  }
}

async function capturar(browser, alvo, tamanho) {
  const ctx = await browser.newContext({ viewport: { width: tamanho.largura, height: tamanho.altura }, isMobile: tamanho.movel, deviceScaleFactor: 1.5, colorScheme: 'dark' })
  const page = await ctx.newPage()
  try {
    await page.goto(alvo.url, { waitUntil: 'networkidle', timeout: alvo.timeout ?? 45000 })
    await passosDoAlvo(page, alvo)
    await page.waitForTimeout(alvo.espera ?? 3000)
    const png = await page.screenshot()
    const arquivo = `public/images/projetos/${alvo.slug}-${tamanho.nome}.webp`
    await sharp(png).resize({ width: tamanho.largura }).webp({ quality: 80 }).toFile(arquivo)
    console.log('ok     ', arquivo)
  } catch (e) {
    console.log('FALHOU ', alvo.slug, tamanho.nome, String(e).split('\n')[0].slice(0, 90))
  }
  await ctx.close()
}

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome', args: ['--no-sandbox'] })
for (const alvo of alvos) for (const tamanho of TAMANHOS) await capturar(browser, alvo, tamanho)
await browser.close()
