'use client'
import { useEffect, useState } from 'react'
import { lockScroll, unlockScroll } from '@/lib/scroll'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { href: '#projetos', label: 'Projetos' },
  { href: '#trajetoria', label: 'Trajetória' },
  { href: '#certificacoes', label: 'Certificações' },
  { href: '#contato', label: 'Contato' },
]

const ICONE_DOWNLOAD = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export function Nav() {
  const [aberto, setAberto] = useState(false)

  // Menu aberto para a rolagem da página e fecha com Esc.
  useEffect(() => {
    if (!aberto) return
    lockScroll()
    const fechar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', fechar)
    return () => { unlockScroll(); window.removeEventListener('keydown', fechar) }
  }, [aberto])

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="marca" href="#topo" aria-label="Matheus Lucindo, início">LUCINDO<span className="accent">©</span></a>
        <nav className="nav-links" aria-label="Principal">
          {LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="nav-acoes">
          <ThemeToggle className="so-desktop" />
          <a className="btn btn-primario btn-pequeno" href="/curriculo-matheus-lucindo.pdf" download>
            Currículo
            <svg {...ICONE_DOWNLOAD} aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16" /></svg>
          </a>
          <button type="button" className="icon-btn menu-botao" aria-expanded={aberto} aria-controls="menu-movel" aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} onClick={() => setAberto((v) => !v)}>
            <span className="menu-barras" data-aberto={aberto} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div id="menu-movel" className="menu-folha" data-aberto={aberto} hidden={!aberto}>
        <nav aria-label="Menu móvel">
          {LINKS.map((l) => <a key={l.href} href={l.href} onClick={() => setAberto(false)}>{l.label}</a>)}
        </nav>
        <div className="menu-rodape"><span className="mono">Tema</span><ThemeToggle /></div>
      </div>
    </header>
  )
}
