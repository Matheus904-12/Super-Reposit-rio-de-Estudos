'use client'
import { useState } from 'react'
import { publicProfile } from '@/content/publico'
import { periodo } from '@/lib/format'
import { montarTrilhas, type ItemDaTrilha } from '@/lib/timeline'
import { SecaoCabeca } from './SecaoCabeca'

type Aba = 'trabalho' | 'formacao'
const ABAS: { id: Aba; rotulo: string }[] = [{ id: 'trabalho', rotulo: 'Trabalho' }, { id: 'formacao', rotulo: 'Formação' }]

function Trilha({ id, titulo, itens }: { id: Aba; titulo: string; itens: ItemDaTrilha[] }) {
  return (
    <div className="trilha" id={`trilha-${id}`} role="tabpanel" aria-labelledby={`aba-${id}`}>
      <h3 className="trilha-titulo mono">{titulo} <span>({itens.length})</span></h3>
      <div className="tl-envoltorio">
        <div className="tl-linha" aria-hidden="true" />
        <ol className="tl">
          {itens.map((i) => (
            <li key={i.id} className="tl-item" data-current={i.current} data-anim="subir">
              <time className="mono tl-data" dateTime={i.date}>{periodo(i.date, i.end)}</time>
              <h4>{i.title}</h4>
              <p className="tl-sub">{i.subtitle}</p>
              {i.current && <p className="mono"><span className="tl-selo">Em andamento</span></p>}
              {i.text && <p className="tl-texto">{i.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function Trajetoria() {
  const { trabalho, formacao, proximo } = montarTrilhas(publicProfile)
  const [aba, setAba] = useState<Aba>('trabalho')
  return (
    <section className="secao" id="trajetoria">
      <div className="container">
        <SecaoCabeca numero="02" rotulo="Trajetória" titulo={<>Meu caminho até <em>aqui</em>.</>} />
        {proximo.map((p) => (
          <aside key={p.id} className="proximo" data-anim="subir">
            <p className="mono"><span className="tl-selo tl-selo-futuro">Próximo capítulo</span></p>
            <h3>{p.title}</h3>
            <p className="tl-texto">{p.text}</p>
          </aside>
        ))}
        <div className="abas" role="tablist" aria-label="Trajetória">
          {ABAS.map((a) => (
            <button key={a.id} id={`aba-${a.id}`} role="tab" type="button" aria-selected={aba === a.id} aria-controls={`trilha-${a.id}`} onClick={() => setAba(a.id)}>{a.rotulo}</button>
          ))}
        </div>
        <div className="trilhas" data-aba={aba}>
          <Trilha id="trabalho" titulo="Trabalho" itens={trabalho} />
          <Trilha id="formacao" titulo="Formação" itens={formacao} />
        </div>
      </div>
    </section>
  )
}
