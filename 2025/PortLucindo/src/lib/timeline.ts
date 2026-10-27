import type { Profile } from '../content/schema'

/** O que o navegador recebe: o perfil sem o e-mail. */
export type PerfilPublico = Omit<Profile, 'email'>

export type TipoDeItem = 'trabalho' | 'formacao' | 'marco'

export interface ItemDaTrilha {
  id: string
  date: string
  end: string | null
  kind: TipoDeItem
  title: string
  subtitle: string
  text: string
  current: boolean
  future: boolean
}

export interface Trilhas {
  trabalho: ItemDaTrilha[]
  formacao: ItemDaTrilha[]
  /** O que vem a seguir (ainda no futuro). */
  proximo: ItemDaTrilha[]
}

const hojeComoMes = () => new Date().toISOString().slice(0, 7)
const maisRecentePrimeiro = (a: ItemDaTrilha, b: ItemDaTrilha) => b.date.localeCompare(a.date)

/**
 * Trabalho e formação ficam em trilhas separadas, cada uma com o mais recente primeiro.
 * Cursos e certificados NÃO entram aqui: têm seção própria. `hoje` (AAAA-MM) é parâmetro para o resultado ser testável.
 */
export function montarTrilhas(profile: PerfilPublico, hoje = hojeComoMes()): Trilhas {
  const trabalho = profile.experience.map((e): ItemDaTrilha => ({
    id: `trabalho-${e.company}-${e.start}`, date: e.start, end: e.end, kind: 'trabalho',
    title: e.role, subtitle: e.company, text: e.summary, current: e.end === null, future: e.start > hoje,
  }))
  const formacao = profile.education.map((e): ItemDaTrilha => ({
    id: `formacao-${e.institution}-${e.start}`, date: e.start, end: e.end, kind: 'formacao',
    title: e.institution, subtitle: e.course, text: e.note ? `${e.note}. ${e.summary ?? ''}`.trim() : (e.summary ?? ''),
    current: e.start <= hoje && e.end > hoje, future: e.start > hoje,
  }))
  const proximo = profile.milestones.filter((m) => m.date > hoje).map((m): ItemDaTrilha => ({
    id: `proximo-${m.date}-${m.title}`, date: m.date, end: null, kind: 'marco',
    title: m.title, subtitle: '', text: m.text, current: false, future: true,
  }))
  return { trabalho: trabalho.sort(maisRecentePrimeiro), formacao: formacao.sort(maisRecentePrimeiro), proximo }
}

/** Conta cada entrada; as trilhas (Microsoft Learning, Senai) contam um por item. */
export function totalCertificacoes(profile: PerfilPublico): number {
  return profile.certifications.reduce((total, c) => total + (c.items?.length ?? 1), 0)
}
