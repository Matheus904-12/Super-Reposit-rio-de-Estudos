// Uso: npm run foto -- "/caminho/da/foto.png"
// Gera public/images/matheus.webp (2x do maior tamanho exibido) e apaga a foto antiga.
import { existsSync, rmSync, statSync } from 'node:fs'
import sharp from 'sharp'

const origem = process.argv[2]
if (!origem || !existsSync(origem)) {
  console.error('Informe o caminho de uma foto existente: npm run foto -- "/caminho/foto.png"')
  process.exit(1)
}

const saida = 'public/images/matheus.webp'
const LARGURA = 920 // o retrato aparece com no máximo 460px de largura CSS; 920 cobre telas 2x
const { width, height } = await sharp(origem).rotate().resize({ width: LARGURA }).webp({ quality: 82 }).toFile(saida)
for (const antiga of ['public/images/matheus.jpg']) if (existsSync(antiga)) rmSync(antiga)
console.log(`${saida}: ${width}x${height}, ${(statSync(saida).size / 1024).toFixed(0)} KB`)
