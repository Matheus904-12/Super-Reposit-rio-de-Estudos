import { expect, it } from 'vitest'
import { diffPerfil, parseCsv } from '../src/lib/linkedin-csv'
import { publicProfile } from '../src/content/publico'

it('lê CSV do LinkedIn com vírgulas e aspas dentro do campo', () => {
  const csv = 'Company Name,Title,Started On\n"BCR.CX, Zendesk",Desenvolvedor,"Jan 2026"\n'
  expect(parseCsv(csv)).toEqual([{ 'Company Name': 'BCR.CX, Zendesk', Title: 'Desenvolvedor', 'Started On': 'Jan 2026' }])
})
it('ignora linhas vazias e preserva quebra de linha entre aspas', () => {
  expect(parseCsv('A,B\n"x\ny",z\n\n')).toEqual([{ A: 'x\ny', B: 'z' }])
})
it('aponta empresa nova e não reclama do que já existe', () => {
  const existente = publicProfile.experience[0]!.company
  const diff = diffPerfil(publicProfile, {
    positions: [{ 'Company Name': existente }, { 'Company Name': 'Empresa Nova SA', Title: 'Dev' }],
    education: [],
  })
  expect(diff.join('\n')).toContain('Empresa Nova SA')
  expect(diff.join('\n')).not.toContain(existente)
})
