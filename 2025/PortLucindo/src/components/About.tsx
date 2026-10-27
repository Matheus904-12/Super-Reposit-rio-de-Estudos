import { publicProfile } from '@/content/publico'
import { mesAno } from '@/lib/format'
import { totalCertificacoes } from '@/lib/timeline'
import { SecaoCabeca } from './SecaoCabeca'

/** Os fatos saem dos dados: se o perfil mudar, esta lista muda junto e nunca contradiz o LinkedIn. */
function montarFatos() {
  const atual = publicProfile.experience.find((e) => e.end === null)
  const pesquisa = publicProfile.experience.find((e) => e.role.includes('PIBIC'))
  const curso = publicProfile.education[0]
  const integracoes = publicProfile.skills.find((g) => g.group === 'Integrações')?.items ?? []
  return [
    atual && ['Hoje', `${atual.company}, desde ${mesAno(atual.start)}`],
    curso && ['Estudo', `${curso.institution}, até ${mesAno(curso.end)}`],
    pesquisa && ['Pesquisa', `PIBIC, desde ${mesAno(pesquisa.start)}`],
    ['Certificações', String(totalCertificacoes(publicProfile))],
    ['Integrações', integracoes.join(', ')],
    ['Idiomas', publicProfile.languages.map((i) => `${i.name} (${i.level.toLowerCase()})`).join(' · ')],
  ].filter((f): f is [string, string] => Array.isArray(f))
}

export function About() {
  const [abertura, ...resto] = publicProfile.summary
  return (
    <section className="secao" id="sobre">
      <div className="container">
        <SecaoCabeca numero="01" rotulo="Sobre" titulo={<>Tecnologia que <em>conecta</em>.</>} />
        <div className="sobre-grade">
          <div className="sobre-texto" data-anim="subir">
            <p className="sobre-lead">{abertura}</p>
            {resto.map((p) => <p key={p}>{p}</p>)}
          </div>
          <dl className="fatos" data-anim="escalonar">
            {montarFatos().map(([rotulo, valor]) => (
              <div key={rotulo}><dt className="mono">{rotulo}</dt><dd>{valor}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
