import type { Certification, Profile } from '../content/schema'

type PerfilPublico = Omit<Profile, 'email'>
export type ItemDeTrilha = NonNullable<Certification['items']>[number]
export type Trilha = Certification & { items: ItemDeTrilha[] }

export interface GrupoDeTrilha { trilha: string; itens: ItemDeTrilha[] }

const maisNovaPrimeiro = (a: Certification, b: Certification) => (b.issued ?? '').localeCompare(a.issued ?? '')

/** Busca uma certificação que é trilha (tem itens). Falha alto se o id estiver errado, em vez de mostrar um card vazio. */
export function trilhaPorId(profile: PerfilPublico, id: string): Trilha {
  const encontrada = profile.certifications.find((c) => c.id === id)
  if (!encontrada?.items) throw new Error(`Trilha de certificações "${id}" não existe`)
  return encontrada as Trilha
}

/** Certificações de marca forte, uma a uma, da mais nova para a mais antiga. */
export function destaquesDeCertificacao(profile: PerfilPublico): Certification[] {
  return profile.certifications.filter((c) => c.featured && !c.items).sort(maisNovaPrimeiro)
}

/** Avulsas de menor peso (não são destaque nem trilha). */
export function outrasCertificacoes(profile: PerfilPublico): Certification[] {
  return profile.certifications.filter((c) => !c.featured && !c.items).sort(maisNovaPrimeiro)
}

/** Agrupa os itens de uma trilha pelo nome do subtema; o grupo mais recente vem primeiro e a ordem interna é preservada. */
export function agruparPorTrilha(itens: ItemDeTrilha[]): GrupoDeTrilha[] {
  const grupos = new Map<string, ItemDeTrilha[]>()
  for (const item of itens) grupos.set(item.track, [...(grupos.get(item.track) ?? []), item])
  const maisRecente = (g: ItemDeTrilha[]) => g.reduce((max, i) => (i.issued > max ? i.issued : max), '')
  return [...grupos.entries()]
    .map(([trilha, grupo]) => ({ trilha, itens: grupo }))
    .sort((a, b) => maisRecente(b.itens).localeCompare(maisRecente(a.itens)))
}
