'use client'
import { useState } from 'react'
import { publicProfile } from '@/content/publico'
import { mesAno } from '@/lib/format'
import { SecaoCabeca } from './SecaoCabeca'

const LIMITE_PARA_RECORTAR = 460
const SETA = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** Recomendações recebidas no LinkedIn, uma por vez. O texto é exibido sem alteração; o recorte é só visual. */
export function Recomendacoes() {
  const itens = publicProfile.recommendations
  const [indice, setIndice] = useState(0)
  const [expandido, setExpandido] = useState(false)
  const atual = itens[indice]
  if (!atual) return null
  const longo = atual.text.length > LIMITE_PARA_RECORTAR
  const ir = (passo: number) => { setIndice((indice + passo + itens.length) % itens.length); setExpandido(false) }
  const total = String(itens.length).padStart(2, '0')

  return (
    <section className="secao" id="recomendacoes">
      <div className="container">
        <SecaoCabeca numero="05" rotulo="Recomendações" titulo={<>O que dizem sobre <em>meu trabalho</em>.</>} />
        <div className="rec" data-anim="subir">
          <div className="rec-pessoa">
            <p className="mono rec-contagem"><span className="accent">{String(indice + 1).padStart(2, '0')}</span> / {total}</p>
            <h3>{atual.name}</h3>
            <p className="rec-cargo">{atual.headline}</p>
            <p className="mono">{atual.relation} · {mesAno(atual.date)}</p>
            <div className="rec-controles">
              <button type="button" className="icon-btn" onClick={() => ir(-1)} aria-label="Recomendação anterior"><svg {...SETA} aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg></button>
              <button type="button" className="icon-btn" onClick={() => ir(1)} aria-label="Próxima recomendação"><svg {...SETA} aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg></button>
            </div>
          </div>
          <div className="rec-corpo" aria-live="polite">
            <blockquote key={indice} className="rec-texto" data-recortado={longo && !expandido}>
              {atual.text.split('\n\n').map((paragrafo) => <p key={paragrafo.slice(0, 40)}>{paragrafo}</p>)}
            </blockquote>
            {longo && (
              <button type="button" className="rec-mais" aria-expanded={expandido} onClick={() => setExpandido((v) => !v)}>
                {expandido ? 'Mostrar menos' : 'Ler a recomendação completa'}
              </button>
            )}
            <p className="mono rec-fonte">Recomendação publicada no LinkedIn</p>
          </div>
        </div>
      </div>
    </section>
  )
}
