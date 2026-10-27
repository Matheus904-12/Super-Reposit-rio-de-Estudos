import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { profile } from '../src/content/profile'

const arquivo = (caminho: string) => `public${caminho}`

describe('projetos', () => {
  it('toda capa declarada existe como arquivo local (nada de imagem hospedada em terceiros)', () => {
    for (const p of profile.projects.filter((x) => x.cover)) {
      expect(p.cover!.startsWith('/images/projetos/'), p.slug).toBe(true)
      expect(existsSync(arquivo(p.cover!)), p.slug).toBe(true)
    }
  })
  it('toda capa tem a versão mobile ao lado (usada no mockup de celular)', () => {
    for (const p of profile.projects.filter((x) => x.cover)) expect(existsSync(arquivo(p.cover!.replace('-desktop', '-mobile'))), p.slug).toBe(true)
  })
  it('projeto com demo quebrada, offline ou com login não expõe link de demo', () => {
    for (const slug of ['weatherapi', 'cerne', 'inovamold']) expect(profile.projects.find((p) => p.slug === slug)?.demo, slug).toBeUndefined()
  })
  it('todo projeto com demo ao vivo tem capa, exceto os em construção (que viram uma barra sem imagem)', () => {
    for (const p of profile.projects.filter((x) => x.demo && x.status !== 'em-construcao')) expect(p.cover, p.slug).toBeTruthy()
  })
  it('o WEAVE é um projeto em construção, com início em jan/2027, sem capa e sem revelar a ideia', () => {
    const weave = profile.projects.find((p) => p.slug === 'weave')!
    expect(weave.status).toBe('em-construcao')
    expect(weave.startsAt).toBe('2027-01')
    expect(weave.cover).toBeUndefined()
    expect(weave.highlights).toBeUndefined()
    expect(weave.stack).toEqual([])
    expect(weave.summary.length).toBeLessThan(40)
    expect(weave.demo).toBeUndefined()
    expect(weave.repo).toBeUndefined()
  })
  it('WEAVE e Prodmais têm repositório privado: nenhum link de código', () => {
    for (const slug of ['weave', 'prodmais']) expect(profile.projects.find((p) => p.slug === slug)?.repo, slug).toBeUndefined()
  })
  it('projeto privado nunca expõe link de repositório', () => {
    for (const p of profile.projects.filter((x) => x.privateCode)) expect(p.repo, p.slug).toBeUndefined()
  })
  it('só entram projetos da lista confirmada pelo Senhor', () => {
    const permitidos = ['agendei', 'prodmais', 'claude-cortex', 'weave', 'inovamold', 'suburban', 'conectatea', 'weatherapi', 'cerne', 'ecommerce-montink', 'sunnythings']
    expect(profile.projects.map((p) => p.slug).sort()).toEqual([...permitidos].sort())
  })
  it('nenhum resumo cita imagem de banco nem número inflado', () => {
    const tudo = JSON.stringify(profile.projects)
    for (const proibido of ['unsplash', 'wikimedia', '3+ anos', '60+']) expect(tudo.toLowerCase()).not.toContain(proibido)
  })
})
