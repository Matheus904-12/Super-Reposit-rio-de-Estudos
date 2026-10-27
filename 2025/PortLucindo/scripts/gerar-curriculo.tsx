import { spawnSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { renderToFile } from '@react-pdf/renderer'
import sharp from 'sharp'
import { profile } from '../src/content/profile'
import { CurriculoDocument } from '../src/lib/pdf-document'

const PDF = 'public/curriculo-matheus-lucindo.pdf'
const PREVIA = 'public/images/curriculo-previa.webp'

/** A prévia exige pdftoppm; no Netlify ele não existe e a prévia commitada continua valendo. */
async function gerarPrevia() {
  const tmp = '/tmp/curriculo-previa'
  const r = spawnSync('pdftoppm', ['-r', '110', '-png', '-f', '1', '-l', '1', '-singlefile', PDF, tmp])
  if (r.status !== 0) return console.log('pdftoppm indisponível: mantendo a prévia atual')
  mkdirSync('public/images', { recursive: true })
  await sharp(`${tmp}.png`).webp({ quality: 85 }).toFile(PREVIA)
  rmSync(`${tmp}.png`)
  console.log(`Prévia gerada: ${PREVIA}`)
}

mkdirSync('public', { recursive: true })
await renderToFile(<CurriculoDocument profile={profile} />, PDF)
console.log(`PDF gerado: ${PDF}`)
await gerarPrevia()
