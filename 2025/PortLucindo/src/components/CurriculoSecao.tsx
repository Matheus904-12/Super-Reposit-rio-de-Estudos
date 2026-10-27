import { publicProfile } from '@/content/publico'
import { dataCompleta } from '@/lib/format'
import { SecaoCabeca } from './SecaoCabeca'

const PDF = '/curriculo-matheus-lucindo.pdf'

export function CurriculoSecao() {
  return (
    <section className="secao" id="curriculo">
      <div className="container">
        <SecaoCabeca numero="06" rotulo="Currículo" titulo={<>Currículo sempre <em>atualizado</em>.</>} />
        <div className="cv-grade">
          <div className="cv-texto" data-anim="subir">
            <p className="cv-lead">Gerado a partir dos mesmos dados deste site, então os dois nunca se contradizem.</p>
            <dl className="fatos">
              <div><dt className="mono">Formato</dt><dd>A4, até 2 páginas, texto selecionável</dd></div>
              <div><dt className="mono">Atualizado em</dt><dd><time dateTime={publicProfile.updatedAt}>{dataCompleta(publicProfile.updatedAt)}</time></dd></div>
              <div><dt className="mono">Contato no PDF</dt><dd>E-mail, LinkedIn e GitHub</dd></div>
            </dl>
            <div className="cv-acoes">
              <a className="btn btn-primario" href={PDF} download>Baixar PDF <span className="seta" aria-hidden="true">↓</span></a>
              <a className="btn btn-fantasma" href={PDF} target="_blank" rel="noopener noreferrer">Abrir no navegador</a>
            </div>
          </div>
          <a className="cv-folha" href={PDF} target="_blank" rel="noopener noreferrer" data-anim="inclinar" aria-label="Abrir o currículo em PDF">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/curriculo-previa.webp" width={910} height={1287} loading="lazy" decoding="async" alt="Prévia da primeira página do currículo de Matheus Lucindo" />
          </a>
        </div>
      </div>
    </section>
  )
}
