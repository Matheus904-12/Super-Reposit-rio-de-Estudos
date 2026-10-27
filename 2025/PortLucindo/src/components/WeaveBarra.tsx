import type { Project } from '@/content/schema'
import { mesAno } from '@/lib/format'

/**
 * Barra do projeto em construção. Fica propositalmente misteriosa: só nome e data,
 * sem descrição nem modal (o repositório é privado e a ideia não é revelada antes da versão 1).
 */
export function WeaveBarra({ projeto }: { projeto: Project }) {
  const inicio = projeto.startsAt ? mesAno(projeto.startsAt) : null
  return (
    <div className="barra" data-anim="inclinar" data-sem-opacidade>
      <div className="barra-titulo">
        <span className="selo-breve mono"><span>Em construção</span>{inicio && <span className="selo-data"><span className="selo-sep" aria-hidden="true"> · </span>produção em {inicio}</span>}</span>
        <h3>{projeto.title}</h3>
        <p className="barra-tipo">O que será? Em breve.</p>
      </div>
    </div>
  )
}
