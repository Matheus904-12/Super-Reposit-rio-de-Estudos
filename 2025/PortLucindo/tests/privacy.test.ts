import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { profile } from '../src/content/profile'

// Este teste olha o site JÁ PUBLICÁVEL (out/). Rode `npm run verificar`, que faz o build antes.
const arquivosDeTexto = () => execFileSync('find', ['out', '-type', 'f', '(', '-name', '*.html', '-o', '-name', '*.js', '-o', '-name', '*.json', '-o', '-name', '*.txt', '-o', '-name', '*.css', ')'], { maxBuffer: 1 << 26 }).toString().trim().split('\n')

describe.skipIf(!existsSync('out'))('site publicado (out/)', () => {
  const arquivos = existsSync('out') ? arquivosDeTexto() : []
  const conteudo = arquivos.map((f) => readFileSync(f, 'utf8')).join('\n')
  const ondeAparece = (trecho: string) => arquivos.filter((f) => readFileSync(f, 'utf8').includes(trecho))

  it('não expõe o e-mail em texto puro em nenhum arquivo', () => {
    expect(ondeAparece(profile.email), `e-mail encontrado em: ${ondeAparece(profile.email).join(', ')}`).toEqual([])
  })
  it('não expõe nem a parte local do e-mail', () => {
    const local = profile.email.split('@')[0]!
    expect(ondeAparece(local), `parte local encontrada em: ${ondeAparece(local).join(', ')}`).toEqual([])
  })
  it('não expõe telefone, CPF, RG nem CEP', () => {
    expect(conteudo).not.toMatch(/\+?55 ?\(?\d{2}\)? ?9?\d{4}-?\d{4}/)
    expect(conteudo).not.toMatch(/\d{3}\.\d{3}\.\d{3}-\d{2}/)
    expect(conteudo).not.toMatch(/\b\d{2}\.\d{3}\.\d{3}-[\dXx]\b/)
  })
  it('não expõe idade', () => expect(conteudo).not.toMatch(/\b(18|19|20) anos\b/))
  it('não usa o nome errado da squad', () => expect(conteudo).not.toContain('Zendesk Channels'))
  it('não carrega imagem de terceiros nas capas de projeto', () => {
    expect(conteudo).not.toMatch(/images\.unsplash\.com|upload\.wikimedia\.org/)
  })
})
