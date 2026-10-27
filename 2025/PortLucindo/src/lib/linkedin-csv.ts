import type { PerfilPublico } from '@/lib/timeline'

/** Lê CSV com campos entre aspas, vírgulas e quebras de linha dentro do campo (formato do export do LinkedIn). */
export function parseCsv(texto: string): Record<string, string>[] {
  const linhas: string[][] = []
  let campo = '', linha: string[] = [], aspas = false
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i]!
    if (aspas) {
      if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++ }
      else if (c === '"') aspas = false
      else campo += c
    } else if (c === '"') aspas = true
    else if (c === ',') { linha.push(campo); campo = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && texto[i + 1] === '\n') i++
      linha.push(campo); campo = ''
      if (linha.some((x) => x !== '')) linhas.push(linha)
      linha = []
    } else campo += c
  }
  if (campo !== '' || linha.length) { linha.push(campo); if (linha.some((x) => x !== '')) linhas.push(linha) }
  const [cabecalho = [], ...corpo] = linhas
  return corpo.map((l) => Object.fromEntries(cabecalho.map((h, i) => [h, l[i] ?? ''])))
}

const normalizar = (s: string | undefined) => (s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

interface ExportLinkedin {
  positions: Record<string, string>[]
  education: Record<string, string>[]
  certifications?: Record<string, string>[]
}

/** Lista o que existe no export e falta no perfil. Só compara nomes; datas e textos ficam para revisão humana. */
export function diffPerfil(atual: PerfilPublico, csv: ExportLinkedin): string[] {
  const conhecido = (lista: string[], nome: string | undefined) => lista.some((x) => normalizar(x).includes(normalizar(nome)) || normalizar(nome).includes(normalizar(x)))
  const saida: string[] = []
  const empresas = atual.experience.map((e) => e.company)
  for (const p of csv.positions) if (p['Company Name'] && !conhecido(empresas, p['Company Name'])) saida.push(`+ Experiência: ${p['Title'] ?? '?'} em ${p['Company Name']} (${p['Started On'] ?? '?'} a ${p['Finished On'] || 'atual'})`)
  const escolas = atual.education.map((e) => e.institution)
  for (const e of csv.education) if (e['School Name'] && !conhecido(escolas, e['School Name'])) saida.push(`+ Formação: ${e['Degree Name'] ?? '?'} em ${e['School Name']}`)
  const titulos = atual.certifications.flatMap((c) => [c.title, ...(c.items ?? []).map((i) => i.title)])
  for (const c of csv.certifications ?? []) if (c['Name'] && !conhecido(titulos, c['Name'])) saida.push(`+ Certificado: ${c['Name']} (${c['Authority'] ?? '?'})`)
  return saida
}
