'use client'
import { useState } from 'react'
import { publicProfile } from '@/content/publico'
import type { Certification } from '@/content/schema'
import { agruparPorTrilha, destaquesDeCertificacao, outrasCertificacoes, trilhaPorId, type Trilha } from '@/lib/certificacoes'
import { mesAno } from '@/lib/format'
import { Dialogo } from './Dialogo'
import { SecaoCabeca } from './SecaoCabeca'

function Destaque({ cert }: { cert: Certification }) {
  return (
    <article className="cert" data-anim="inclinar">
      <p className="mono cert-emissor">{cert.issuer}</p>
      <h3>{cert.title}</h3>
      <p className="mono cert-data">{cert.issued && mesAno(cert.issued)}</p>
      {cert.skills && <ul className="chips" aria-label="Competências">{cert.skills.map((s) => <li key={s}>{s}</li>)}</ul>}
      {cert.credentialUrl
        ? <a className="btn btn-fantasma btn-pequeno cert-link" href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">Ver certificado <span className="seta" aria-hidden="true">↗</span></a>
        : cert.credential && <p className="cert-codigo mono">Credencial {cert.credential}</p>}
    </article>
  )
}

function CartaoDeTrilha({ trilha, destaque, aoAbrir }: { trilha: Trilha; destaque?: boolean; aoAbrir: () => void }) {
  return (
    <article className={`cert cert-trilha ${destaque ? 'cert-trilha-destaque' : ''}`} data-anim="inclinar">
      <p className="mono cert-emissor">{trilha.issuer}</p>
      <p className="cert-numero" aria-hidden="true">{trilha.items.length}</p>
      <h3>{trilha.title}</h3>
      <button type="button" className="btn btn-fantasma btn-pequeno" onClick={aoAbrir} aria-haspopup="dialog" aria-label={`Ver todos os ${trilha.items.length} certificados: ${trilha.title}`}>
        Ver todos os {trilha.items.length} <span className="seta" aria-hidden="true">→</span>
      </button>
    </article>
  )
}

function ListaDaTrilha({ trilha }: { trilha: Trilha }) {
  return (
    <div className="trilha-modal">
      {agruparPorTrilha(trilha.items).map((g) => (
        <section key={g.trilha}>
          <h3 className="mono">{g.trilha} <span>({g.itens.length})</span></h3>
          <ul>
            {g.itens.map((i, n) => <li key={`${i.title}-${n}`}><span>{i.title}</span><time className="mono" dateTime={i.issued}>{mesAno(i.issued)}</time></li>)}
          </ul>
        </section>
      ))}
    </div>
  )
}

export function Certificacoes() {
  const [aberta, setAberta] = useState<string | null>(null)
  const microsoft = trilhaPorId(publicProfile, 'microsoft-learning')
  const senai = trilhaPorId(publicProfile, 'senai-trilhas')
  const abertaTrilha = aberta === microsoft.id ? microsoft : aberta === senai.id ? senai : null
  return (
    <section className="secao" id="certificacoes">
      <div className="container">
        <SecaoCabeca numero="04" rotulo="Certificações e cursos" titulo={<>Aprendizado <em>contínuo</em>.</>} />
        <div className="cert-grade">
          {destaquesDeCertificacao(publicProfile).map((c) => <Destaque key={c.id} cert={c} />)}
        </div>
        <div className="cert-trilhas">
          <CartaoDeTrilha trilha={microsoft} destaque aoAbrir={() => setAberta(microsoft.id)} />
          <CartaoDeTrilha trilha={senai} aoAbrir={() => setAberta(senai.id)} />
          <article className="cert cert-outras" data-anim="inclinar">
            <p className="mono cert-emissor">Também</p>
            <ul>{outrasCertificacoes(publicProfile).map((c) => <li key={c.id}><strong>{c.issuer}</strong><span>{c.title}</span></li>)}</ul>
          </article>
        </div>
      </div>
      <Dialogo aberto={abertaTrilha !== null} aoFechar={() => setAberta(null)} rotulo={abertaTrilha?.issuer ?? ''} titulo={abertaTrilha ? `${abertaTrilha.items.length} certificados` : ''}>
        {abertaTrilha && <ListaDaTrilha trilha={abertaTrilha} />}
      </Dialogo>
    </section>
  )
}
