'use client'
import { useEffect, useState } from 'react'
import { publicProfile } from '@/content/publico'

const formatarHora = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' })

/** Relógio de São Paulo. Começa vazio no servidor para o HTML estático não ficar com hora velha. */
function useHoraDeSaoPaulo(): string {
  const [hora, setHora] = useState('')
  useEffect(() => {
    const atualizar = () => setHora(formatarHora.format(new Date()))
    atualizar()
    const id = window.setInterval(atualizar, 30_000)
    return () => window.clearInterval(id)
  }, [])
  return hora
}

export function Hero() {
  const hora = useHoraDeSaoPaulo()
  return (
    <section className="hero" id="topo">
      <div className="container hero-grade">
        <p className="mono hero-meta hero-aparece">
          Desenvolvedor de software · Analista <span className="separador" aria-hidden="true">/</span> São Paulo{hora && <> · <time dateTime={hora}>{hora}</time></>}
        </p>
        <h1 aria-label={publicProfile.name}>
          <span className="linha" aria-hidden="true"><span>MATHEUS</span></span>
          <span className="linha serifa" aria-hidden="true"><span>Lucindo<span className="accent">©</span></span></span>
        </h1>
        <figure className="hero-foto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/matheus.webp" width={920} height={1227} alt="Retrato de Matheus Lucindo sorrindo, de óculos e blusa marrom" fetchPriority="high" />
        </figure>
        <div className="hero-texto">
          <p className="hero-lead hero-aparece">{publicProfile.tagline}</p>
          <div className="hero-cta hero-aparece">
            <a className="btn btn-primario" href="#projetos">Ver projetos <span className="seta" aria-hidden="true">→</span></a>
            <a className="btn btn-fantasma" href="/curriculo-matheus-lucindo.pdf" download>Baixar currículo</a>
          </div>
          {publicProfile.availability && <p className="selo-disponivel hero-aparece"><span className="ponto" aria-hidden="true" />Aberto a oportunidades</p>}
        </div>
      </div>
    </section>
  )
}
