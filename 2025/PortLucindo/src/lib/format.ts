const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

/** "2026-01" vira "jan/2026"; data aberta vira "atual". */
export function mesAno(aaaamm: string | null): string {
  if (!aaaamm) return 'atual'
  const [ano, mes] = aaaamm.split('-')
  return `${MESES[Number(mes) - 1]}/${ano}`
}

export function dataCompleta(iso: string): string {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

export const periodo = (inicio: string, fim: string | null) => `${mesAno(inicio)} – ${mesAno(fim)}`
