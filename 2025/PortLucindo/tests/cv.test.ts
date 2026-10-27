import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { beforeAll, describe, expect, it } from 'vitest'

const pdf = 'public/curriculo-matheus-lucindo.pdf'
const texto = () => execFileSync('pdftotext', ['-layout', pdf, '-']).toString()

describe('currículo em PDF', () => {
  beforeAll(() => { execFileSync('npm', ['run', 'cv', '--silent'], { stdio: 'pipe' }) })
  it('existe', () => expect(existsSync(pdf)).toBe(true))
  it('tem no máximo 2 páginas', () => {
    const info = spawnSync('pdfinfo', [pdf]).stdout.toString()
    expect(Number(/Pages:\s+(\d+)/.exec(info)?.[1])).toBeLessThanOrEqual(2)
  })
  it('é A4 e declara o idioma pt-BR e o autor', () => {
    const info = spawnSync('pdfinfo', [pdf]).stdout.toString()
    expect(info).toMatch(/Page size:\s+595\.\d+ x 841\.\d+/)
    expect(info).toMatch(/Author:\s+Matheus Lucindo/)
  })
  it('contém nome, empresa atual e as três formações', () => {
    const t = texto()
    for (const esperado of ['Matheus Lucindo', 'BCR.CX', 'Universidade de Mogi das Cruzes', 'Senai São Paulo', 'Sesi São Paulo']) expect(t).toContain(esperado)
  })
  it('NÃO contém telefone, CPF, RG, endereço nem idade', () => {
    const t = texto()
    expect(t).not.toMatch(/\+?55 ?\(?\d{2}\)? ?9?\d{4}-?\d{4}/)
    expect(t).not.toMatch(/\d{3}\.\d{3}\.\d{3}-\d{2}/)
    expect(t).not.toMatch(/\b\d{2} anos\b/i)
    expect(t).not.toMatch(/\b(CPF|RG|CEP)\b/)
  })
  it('lista a Microsoft Learning com a contagem e sem listar as 27', () => {
    const t = texto()
    expect(t).toMatch(/Microsoft Learning:\s+27 certificados/)
    expect(t).not.toContain('SC-200')
  })
  it('as fontes ficam embutidas', () => {
    const fontes = spawnSync('pdffonts', [pdf]).stdout.toString()
    expect(fontes).toMatch(/Geist/)
    expect(fontes).not.toMatch(/\bno\s+no\s+no\b/) // coluna "emb" nunca "no"
  })
})
