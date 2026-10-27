'use client'
import { useSyncExternalStore } from 'react'

type Tema = 'dark' | 'light'
const assinar = (aviso: () => void) => {
  const obs = new MutationObserver(aviso)
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => obs.disconnect()
}
const lerTema = (): Tema => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

const ICONE = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export function ThemeToggle({ className = '' }: { className?: string }) {
  const tema = useSyncExternalStore(assinar, lerTema, () => 'dark' as Tema)
  const alternar = () => {
    const proximo: Tema = tema === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = proximo
    try { localStorage.setItem('tema', proximo) } catch { /* preferência não persistida */ }
  }
  return (
    <button type="button" className={`icon-btn ${className}`} onClick={alternar} aria-label={tema === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}>
      {tema === 'dark'
        ? <svg {...ICONE} aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        : <svg {...ICONE} aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>}
    </button>
  )
}
