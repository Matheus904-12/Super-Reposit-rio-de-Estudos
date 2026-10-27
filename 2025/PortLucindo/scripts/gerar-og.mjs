// Gera public/images/og.png (1200x630) a partir da foto e dos tokens do design 3.
import sharp from 'sharp'

const foto = await sharp('public/images/matheus.webp').resize(420, 630, { fit: 'cover', position: 'top' }).toBuffer()
const texto = Buffer.from(`<svg width="780" height="630" xmlns="http://www.w3.org/2000/svg">
  <style>.n{font:italic 84px 'Instrument Serif',Georgia,serif;fill:#f5f1ea}.c{font:28px Geist,Arial,sans-serif;fill:#b9b3a8}.a{font:italic 84px 'Instrument Serif',Georgia,serif;fill:#f2ff4d}</style>
  <text x="60" y="270" class="n">Matheus</text><text x="60" y="360" class="a">Lucindo</text>
  <text x="60" y="440" class="c">Desenvolvedor de software &amp; analista</text>
  <text x="60" y="482" class="c">lucindoporto.netlify.app</text></svg>`)
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#0e0d0c' } })
  .composite([{ input: texto, left: 0, top: 0 }, { input: foto, left: 780, top: 0 }])
  .png().toFile('public/images/og.png')
