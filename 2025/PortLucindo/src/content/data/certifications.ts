import type { Certification } from '../schema'

const gh = (title: string) => ({ title, issued: '2026-01', track: 'GitHub' })
const edu = (title: string) => ({ title, issued: '2024-07', track: 'Microsoft 365 para educação' })
const ia = (title: string) => ({ title, issued: '2024-09', track: 'IA e Copilot for Security' })

/** As 27 entradas da Microsoft Learning exatamente como estão no LinkedIn (uma delas aparece duas vezes lá). */
const microsoftLearning: NonNullable<Certification['items']> = [
  gh('Manter um repositório seguro com as melhores práticas do GitHub'),
  gh('Configurar a varredura de código no GitHub'),
  gh('Codificar com o GitHub Codespaces'),
  gh('Gerenciar seu trabalho com projetos do GitHub'),
  gh('Comunicar-se efetivamente no GitHub usando Markdown'),
  gh('Contribuir para um projeto de software livre no GitHub'),
  gh('Gerenciar um programa InnerSource usando o GitHub'),
  gh('Autenticar e autorizar identidades de usuário no GitHub'),
  gh('Gerenciar alterações de repositório usando solicitações de pull no GitHub'),
  gh('Pesquisar e organizar o histórico do repositório usando o GitHub'),
  gh('Usar o GitHub Copilot com o Python'),
  gh('GitHub Foundations Parte 2 de 2'),
  gh('GitHub Foundations Parte 1 de 2'),
  gh('Conceitos básicos do GitHub – Noções básicas de administração e recursos de produto parte 1 de 2'),
  edu('Introdução à colaboração com o Microsoft Teams'),
  edu('Criar avaliações autenticadas com o Microsoft Forms'),
  edu('Narrativa digital com o Microsoft Sway'),
  edu('Cidadania digital: preparar os alunos de hoje para o sucesso online'),
  ia('Conceitos básicos de IA generativa'),
  ia('Conceitos básicos da IA generativa responsável'),
  ia('Descreva o Microsoft Copilot for Security'),
  ia('Conceitos Fundamentais de IA'),
  ia('Descrever as experiências integradas do Microsoft Copilot para Segurança'),
  ia('Descrever as experiências integradas do Microsoft Copilot para Segurança'),
  ia('Explorar casos de uso do Microsoft Copilot para Segurança'),
  ia('Introdução ao Microsoft Copilot for Security'),
  ia('SC-200: Reduza ameaças usando o Microsoft Copilot for Security'),
]

const senai = (title: string, issued: string) => ({ title, issued, track: 'Trilhas Senai' })

export const certifications: Certification[] = [
  { id: 'alura-imersao-ia', issuer: 'Alura', title: 'Imersão IA', issued: '2026-06', featured: true, credentialUrl: 'https://cursos.alura.com.br/immersion/certificate/acfba699-6dce-4bb2-b953-4632fb1b3315?lang' },
  { id: 'alura-agentes-google', issuer: 'Alura + Google', title: 'Imersão Dev Agentes de IA Google', issued: '2025-09', featured: true, credentialUrl: 'https://cursos.alura.com.br/immersion/certificate/07c6f152-09ec-46e3-b8f0-6095def9663c?lang', skills: ['Python', 'LangChain'] },
  { id: 'fiap-semana-tech', issuer: 'FIAP', title: 'Semana Carreira Tech FIAP + Alura', issued: '2026-05', featured: true },
  { id: 'fiap-connect-summit', issuer: 'FIAP', title: 'FIAP Connect Summit', issued: '2025-10', featured: true, skills: ['Estratégia de Inteligência Artificial'] },
  { id: 'ebac-qa', issuer: 'EBAC', title: 'Jornada QA', issued: '2025-10', featured: true, skills: ['Automação de testes', 'Cypress'] },
  { id: 'ms-copilot-challenge', issuer: 'Microsoft', title: 'GitHub Copilot Challenge', issued: '2025-07', featured: true, skills: ['GitHub Copilot Agent'] },
  { id: 'cisco-iot', issuer: 'Cisco', title: 'Introduction to IoT', issued: '2025-04', featured: true },
  { id: 'santander-ia', issuer: 'Santander Open Academy', title: 'IA Generativa', issued: '2025-03', featured: true, credential: 'OA-2025-0313000894004' },
  { id: 'senai-powerbi', issuer: 'Senai São Paulo', title: 'Microsoft Power BI', issued: '2024-09', featured: true, skills: ['Power BI'] },
  { id: 'muralis-ia', issuer: 'Muralis Tecnologia', title: 'Conexão Muralis: IA no Comércio Exterior, além do ChatGPT (webinar)', issued: '2025-05', featured: false, credential: '2544070A74ED7F9416497890' },
  { id: 'gigabyte-informatica', issuer: 'Gigabyte Escola Profissionalizante', title: 'Formado em Informática', issued: '2019-01', featured: false, skills: ['Office 365'] },
  {
    id: 'senai-trilhas', issuer: 'Senai São Paulo', title: 'Trilhas do Senai', featured: false,
    items: [
      senai('WEB 3.0', '2024-12'), senai('Empreender SENAI', '2024-06'),
      senai('Competência Transversal: Segurança no Trabalho', '2024-06'),
      senai('Desvendando a Indústria 4.0', '2024-06'), senai('Desvendando a Blockchain', '2024-06'),
    ],
  },
  { id: 'microsoft-learning', issuer: 'Microsoft Learning', title: 'Trilhas de GitHub, IA e Copilot for Security', featured: false, items: microsoftLearning },
]
