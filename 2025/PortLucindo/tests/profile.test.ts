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
  it('traz as 3 recomendações recebidas, com o texto íntegro', () => {
    const nomes = profile.recommendations.map((r) => r.name)
    expect(nomes).toEqual(['Iago Dantas', 'Flávio Francisco da Silva', 'Paulinho Pereira'])
    const flavio = profile.recommendations.find((r) => r.name.startsWith('Flávio'))
    expect(flavio?.text).toContain('Recomendo o Matheus para oportunidades')
    expect(profile.recommendations.find((r) => r.name === 'Paulinho Pereira')?.text).toContain('Estamos super satisfeitos pelo site')
  })
  it('a squad se chama Conciex Channels (e nunca "Zendesk Channels")', () => {
    const tudo = JSON.stringify(profile)
    expect(tudo).toContain('Conciex Channels')
    expect(tudo).not.toContain('Zendesk Channels')
  })
  it('slugs de projeto são únicos', () => {
    const slugs = profile.projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
  it('não usa números inflados proibidos pelo spec', () => {
    const tudo = JSON.stringify(profile)
    for (const proibido of ['3+ anos', '60+ projetos', '1462']) expect(tudo).not.toContain(proibido)
  })
})
