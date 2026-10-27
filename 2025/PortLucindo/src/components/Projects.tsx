import { publicProfile } from '@/content/publico'
import type { Project } from '@/content/schema'
import { SecaoCabeca } from './SecaoCabeca'
import { WeaveBarra } from './WeaveBarra'

const STATUS: Record<Project['status'], string> = {
  producao: 'Em produção', estudo: 'Estudo', academico: 'Acadêmico', 'em-construcao': 'Em construção',
}

const SETA = '↗'

/** O mockup de celular usa a captura mobile que fica ao lado da desktop. */
const capaMobile = (capa: string) => capa.replace('-desktop', '-mobile')

function Capa({ projeto, destaque }: { projeto: Project; destaque: boolean }) {
  if (!projeto.cover) {
    // Sem captura (sem demo pública): capa tipográfica com as iniciais, no mesmo tamanho para não saltar o layout.
    return <div className="capa capa-tipografica" aria-hidden="true"><span>{projeto.title.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 2)}</span></div>
  }
  return (
    <div className="capa">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={projeto.cover} width={1440} height={900} loading="lazy" decoding="async" alt={`Captura da tela inicial de ${projeto.title}`} />
      <span className="capa-seta" aria-hidden="true">↗</span>
      {destaque && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="capa-celular" src={capaMobile(projeto.cover)} width={390} height={844} loading="lazy" decoding="async" alt="" aria-hidden="true" />
      )}
    </div>
  )
}

function Links({ projeto }: { projeto: Project }) {
  return (
    <div className="proj-links">
      {projeto.demo && <a className="btn btn-primario btn-pequeno" href={projeto.demo} target="_blank" rel="noopener noreferrer">Ver demo <span className="seta" aria-hidden="true">{SETA}</span></a>}
      {projeto.repo && <a className="btn btn-fantasma btn-pequeno" href={projeto.repo} target="_blank" rel="noopener noreferrer">Código <span className="seta" aria-hidden="true">{SETA}</span></a>}
      {projeto.privateCode && <span className="proj-privado mono">Código privado</span>}
    </div>
  )
}

function Cartao({ projeto, indice, destaque }: { projeto: Project; indice: number; destaque: boolean }) {
  return (
    <article className={`proj ${destaque ? 'proj-destaque' : ''}`} data-anim="inclinar">
      <Capa projeto={projeto} destaque={destaque} />
      <div className="proj-corpo">
        <p className="mono proj-meta">
          <span className="accent">{String(indice + 1).padStart(2, '0')}</span> · {projeto.kind}
          <span className="proj-status" data-status={projeto.status}>{STATUS[projeto.status]}</span>
        </p>
        <h3>{projeto.title}</h3>
        <p className="proj-papel">{projeto.role}</p>
        <p className="proj-resumo">{projeto.summary}</p>
        <ul className="chips" aria-label="Tecnologias">{projeto.stack.map((t) => <li key={t}>{t}</li>)}</ul>
        <Links projeto={projeto} />
        {projeto.demo && projeto.demoMayBeAsleep && (
          <p className="proj-aviso">A demo roda em hospedagem gratuita e pode levar alguns segundos para acordar.</p>
        )}
      </div>
    </article>
  )
}

/** Side projects: sem demo no ar, então uma lista enxuta em vez de cartão com imagem. */
function SideProjects({ projetos }: { projetos: Project[] }) {
  return (
    <ul className="side-lista" data-anim="escalonar">
      {projetos.map((p) => (
        <li key={p.slug} className="side-item">
          <div className="side-titulo">
            <h4>{p.title}</h4>
            <p className="mono">{p.kind}</p>
          </div>
          <p className="side-resumo">{p.summary}</p>
          <ul className="chips" aria-label="Tecnologias">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
          <div className="side-acao">
            {p.repo && <a className="btn btn-fantasma btn-pequeno" href={p.repo} target="_blank" rel="noopener noreferrer">Código <span className="seta" aria-hidden="true">{SETA}</span></a>}
            {p.privateCode && <span className="proj-privado mono">Código privado</span>}
            {!p.repo && !p.privateCode && <span className="proj-privado mono">Estudo de caso</span>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export function Projects() {
  const todos = publicProfile.projects
  const emConstrucao = todos.filter((p) => p.status === 'em-construcao')
  const publicados = todos.filter((p) => p.status !== 'em-construcao')
  const destaques = publicados.filter((p) => p.featured)
  const comDemo = publicados.filter((p) => !p.featured && p.demo)
  const side = publicados.filter((p) => !p.featured && !p.demo)
  return (
    <section className="secao" id="projetos">
      <div className="container">
        <SecaoCabeca numero="03" rotulo="Projetos" titulo={<>Projetos <em>autorais</em>.</>} />
        {emConstrucao.map((p) => <WeaveBarra key={p.slug} projeto={p} />)}
        <div className="proj-lista">
          {destaques.map((p, i) => <Cartao key={p.slug} projeto={p} indice={i} destaque />)}
        </div>
        <h3 className="mono proj-subtitulo" data-anim="subir">Outros projetos no ar <span>({comDemo.length})</span></h3>
        <div className="proj-grade">
          {comDemo.map((p, i) => <Cartao key={p.slug} projeto={p} indice={destaques.length + i} destaque={false} />)}
        </div>
        <h3 className="mono proj-subtitulo" data-anim="subir">Side projects <span>({side.length})</span></h3>
        <p className="side-intro" data-anim="subir">Estudos, experimentos e ideias que não têm demonstração pública. O código, quando é aberto, está no GitHub.</p>
        <SideProjects projetos={side} />
      </div>
    </section>
  )
}
