import { describe, expect, it } from 'vitest'
import { profile } from '../src/content/profile'
import { montarTrilhas, totalCertificacoes } from '../src/lib/timeline'

const HOJE = '2026-10'

describe('trilhas da trajetória', () => {
  const { trabalho, formacao, proximo } = montarTrilhas(profile, HOJE)
  it('separa trabalho (5) e formação (3), sem misturar', () => {
    expect(trabalho).toHaveLength(profile.experience.length)
    expect(formacao).toHaveLength(profile.education.length)
    expect(trabalho.every((i) => i.kind === 'trabalho')).toBe(true)
    expect(formacao.every((i) => i.kind === 'formacao')).toBe(true)
  })
  it('cada trilha começa pelo mais recente', () => {
    expect(trabalho[0]?.subtitle).toBe('BCR.CX')
    expect(formacao[0]?.title).toContain('Universidade de Mogi das Cruzes')
    for (const trilha of [trabalho, formacao]) {
      const datas = trilha.map((i) => i.date)
      expect(datas).toEqual([...datas].sort().reverse())
    }
  })
  it('cursos e certificados não entram na trajetória', () => {
    const tudo = JSON.stringify([trabalho, formacao, proximo]).toLowerCase()
    for (const curso of ['imersão', 'alura', 'semana carreira', 'copilot challenge', 'microsoft learning', 'jornada qa']) expect(tudo).not.toContain(curso)
  })
  it('o próximo capítulo é só o WEAVE, em janeiro de 2027, como futuro', () => {
    expect(proximo).toHaveLength(1)
    expect(proximo[0]?.title).toContain('WEAVE')
    expect(proximo[0]?.date).toBe('2027-01')
    expect(proximo[0]?.future).toBe(true)
  })
  it('marca BCR.CX, PIBIC e UMC como em andamento e a Rádio SAT FM como encerrada', () => {
    expect(trabalho.filter((i) => i.current).map((i) => i.subtitle).sort()).toEqual(['BCR.CX', 'Universidade de Mogi das Cruzes'])
    expect(formacao.filter((i) => i.current).map((i) => i.title)).toEqual(['Universidade de Mogi das Cruzes'])
    expect(trabalho.find((i) => i.subtitle.includes('Rádio SAT FM'))?.current).toBe(false)
  })
})

describe('totalCertificacoes', () => {
  it('soma as entradas, contando cada item das trilhas', () => expect(totalCertificacoes(profile)).toBe(43))
})
