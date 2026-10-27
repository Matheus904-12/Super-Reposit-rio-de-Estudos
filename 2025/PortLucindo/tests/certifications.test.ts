import { describe, expect, it } from 'vitest'
import { profile } from '../src/content/profile'
import { agruparPorTrilha, destaquesDeCertificacao, outrasCertificacoes, trilhaPorId } from '../src/lib/certificacoes'

describe('certificações', () => {
  it('os destaques têm marca forte, vêm do mais novo ao mais antigo e não incluem as trilhas', () => {
    const d = destaquesDeCertificacao(profile)
    expect(d.length).toBeGreaterThanOrEqual(6)
    expect(d[0]?.title).toBe('Imersão IA')
    expect(d.some((c) => c.items)).toBe(false)
    const datas = d.map((c) => c.issued!)
    expect(datas).toEqual([...datas].sort().reverse())
  })
  it('a Microsoft Learning é uma trilha com 27 entradas', () => {
    expect(trilhaPorId(profile, 'microsoft-learning').items).toHaveLength(27)
  })
  it('agrupa as 27 por trilha, da mais recente para a mais antiga, sem perder nenhuma', () => {
    const grupos = agruparPorTrilha(trilhaPorId(profile, 'microsoft-learning').items)
    expect(grupos.map((g) => [g.trilha, g.itens.length])).toEqual([
      ['GitHub', 14], ['IA e Copilot for Security', 9], ['Microsoft 365 para educação', 4],
    ])
    expect(grupos.reduce((n, g) => n + g.itens.length, 0)).toBe(27)
  })
  it('preserva a entrada duplicada que existe no LinkedIn', () => {
    const grupos = agruparPorTrilha(trilhaPorId(profile, 'microsoft-learning').items)
    const ia = grupos.find((g) => g.trilha.startsWith('IA'))!
    expect(ia.itens.filter((i) => i.title.startsWith('Descrever as experiências integradas'))).toHaveLength(2)
  })
  it('as demais certificações avulsas são Muralis e Gigabyte', () => {
    expect(outrasCertificacoes(profile).map((c) => c.issuer)).toEqual(['Muralis Tecnologia', 'Gigabyte Escola Profissionalizante'])
  })
  it('trilhaPorId falha com mensagem clara se o id não existe', () => {
    expect(() => trilhaPorId(profile, 'nao-existe')).toThrow(/nao-existe/)
  })
})
