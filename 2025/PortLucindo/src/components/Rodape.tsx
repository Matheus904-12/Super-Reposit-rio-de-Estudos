import { publicProfile } from '@/content/publico'

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container">
        <p className="rodape-marca" aria-hidden="true">Lucindo<span className="accent">©</span></p>
        <div className="rodape-linhas">
          <ul className="rodape-links" aria-label="Redes">
            {publicProfile.links.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>)}
          </ul>
        </div>
        <p className="mono rodape-copy">© {new Date().getFullYear()} {publicProfile.name} · {publicProfile.location}</p>
      </div>
    </footer>
  )
}
