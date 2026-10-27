import type { Profile } from '../schema'

export const education: Profile['education'] = [
  {
    institution: 'Universidade de Mogi das Cruzes', course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    start: '2025-01', end: '2026-12',
    summary: 'Formação em programação, bancos de dados, lógica e inovação tecnológica para criar, gerenciar e manter sistemas.',
  },
  {
    institution: 'Senai São Paulo', course: 'Curso Técnico Integrado em Desenvolvimento de Sistemas',
    start: '2023-01', end: '2024-12', note: 'Representante de sala por 2 anos',
    summary: 'MySQL, React Native, PHP, Firebase, JavaScript, ReactJS, NodeJS, GitHub e Power BI (verificação de dados e dashboards).',
  },
  {
    institution: 'Sesi São Paulo', course: 'Ensino Médio',
    start: '2022-03', end: '2024-12',
    summary: 'Projeto Influencer Tecnologia, com especialização em maquinários e computadores.',
  },
]
