import type { Profile } from '../schema'

/** Só tecnologias que ele cita no LinkedIn ou que aparecem nas descrições dos próprios projetos. */
export const skills: Profile['skills'] = [
  { group: 'Linguagens', items: ['Python', 'TypeScript', 'JavaScript', 'PHP', 'Java', 'Kotlin'] },
  { group: 'Back-end', items: ['Node.js', 'FastAPI', 'Django', 'Spring Boot', 'APIs REST', 'WebSockets'] },
  { group: 'Front-end', items: ['React', 'Next.js', 'HTML', 'CSS', 'Web design'] },
  { group: 'Dados', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase', 'Firebase'] },
  { group: 'Infra e qualidade', items: ['Docker', 'Linux (Ubuntu)', 'Postman', 'Cypress', 'GitHub Actions', 'Git'] },
  { group: 'Integrações', items: ['Zendesk', 'Mercado Livre', 'Cnova', 'Reclame Aqui'] },
]
