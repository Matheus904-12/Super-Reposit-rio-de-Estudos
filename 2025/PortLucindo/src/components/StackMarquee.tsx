import {
  siDocker, siDjango, siFastapi, siGithub, siKotlin, siLinux, siMongodb, siNextdotjs, siNodedotjs,
  siPhp, siPostgresql, siPostman, siPython, siReact, siSpringboot, siSupabase, siTypescript, siZendesk,
} from 'simple-icons'

const TECNOLOGIAS = [
  siPython, siTypescript, siNodedotjs, siPhp, siDocker, siMongodb, siPostgresql, siReact, siNextdotjs,
  siSpringboot, siKotlin, siDjango, siFastapi, siSupabase, siZendesk, siPostman, siLinux, siGithub,
]

function Fileira({ oculta = false }: { oculta?: boolean }) {
  return (
    <ul className="letreiro-fileira" aria-hidden={oculta || undefined}>
      {TECNOLOGIAS.map((t) => (
        <li key={t.slug} className="letreiro-item">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d={t.path} fill="currentColor" /></svg>
          <span>{t.title}</span>
        </li>
      ))}
    </ul>
  )
}

/** Duas cópias da fileira: a animação anda 50% e recomeça sem salto visível. */
export function StackMarquee() {
  return (
    <section className="letreiro" aria-label="Tecnologias que uso">
      <div className="letreiro-trilho"><Fileira /><Fileira oculta /></div>
    </section>
  )
}
