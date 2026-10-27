import { describe, expect, it } from 'vitest'
import { dataCompleta, mesAno, periodo } from '../src/lib/format'

describe('formatação de datas', () => {
  it('mesAno usa mês abreviado em português', () => {
    expect(mesAno('2026-01')).toBe('jan/2026')
    expect(mesAno('2025-12')).toBe('dez/2025')
  })
  it('mesAno devolve "atual" para data aberta', () => expect(mesAno(null)).toBe('atual'))
  it('dataCompleta vira DD/MM/AAAA', () => expect(dataCompleta('2026-10-01')).toBe('01/10/2026'))
  it('periodo junta início e fim', () => expect(periodo('2025-09', null)).toBe('set/2025 – atual'))
})
