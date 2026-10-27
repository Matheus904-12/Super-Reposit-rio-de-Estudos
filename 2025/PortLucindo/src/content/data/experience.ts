import type { Profile } from '../schema'

export const experience: Profile['experience'] = [
  {
    company: 'BCR.CX', role: 'Desenvolvedor de software júnior', kind: 'Meio período',
    start: '2026-01', end: null, place: 'São Paulo, Brasil · Híbrido',
    summary: 'Desenvolvimento e sustentação de soluções no Time Channels, com foco em integrações de sistemas, APIs e escalabilidade.',
    highlights: [
      'Interfaces web integradas aos serviços de back-end.',
      'Novas funcionalidades e evolução de sistemas em Python.',
      'Integrações de API com Zendesk, Mercado Livre, Cnova e Reclame Aqui.',
      'Testes e depuração de endpoints com Postman.',
      'Operação em Ubuntu/Linux, com Docker para containers e ambientes de desenvolvimento.',
      'Bancos NoSQL com MongoDB e participação nos rituais ágeis da squad.',
    ],
    stack: ['Python', 'TypeScript', 'Docker', 'MongoDB', 'Postman', 'Zendesk', 'Linux'],
  },
  {
    company: 'Universidade de Mogi das Cruzes', role: 'Estudante de Iniciação Científica (PIBIC)', kind: 'Temporário',
    start: '2025-09', end: null, place: 'Mogi das Cruzes, São Paulo · Remoto',
    summary: 'Prodmais: ferramenta de gestão e extração de dados da produção científica, com a Plataforma Lattes (CNPq) como fonte primária.',
    highlights: [
      'Agrega currículos Lattes e cruza com outras fontes, como OpenAlex e CrossRef.',
      'Busca e filtros por pesquisador, área, campus, idioma e nível de formação.',
      'Painéis de indicadores de produção científica.',
      'Exportação bibliográfica e integração com o ORCID.',
    ],
    stack: ['PHP', 'JavaScript'],
  },
  {
    company: 'Rádio SAT FM', role: 'Estagiário WordPress (não remunerado)', kind: 'Estágio',
    start: '2025-10', end: '2025-11', place: 'Suzano, São Paulo · Remoto',
    summary: 'Migração completa do site para o domínio oficial e restabelecimento da infraestrutura de e-mails da rádio.',
    highlights: [
      'Resolvi conflitos de banco MySQL e de permissões de servidor no cPanel.',
      'Fluxo de postagem ágil para a equipe de jornalismo.',
      'E-mails corporativos via SMTP seguro.',
      'Layout responsivo integrado a players de streaming ao vivo.',
    ],
    stack: ['WordPress', 'MySQL', 'cPanel', 'SMTP'],
  },
  {
    company: 'Cristais Gold Lar', role: 'Desenvolvedor Web (freelancer)', kind: 'Freelance',
    start: '2025-02', end: '2025-08', place: 'Ferraz de Vasconcelos, São Paulo · Remoto',
    summary: 'Criação de um site de e-commerce completo.',
    highlights: ['Arquitetura MVC e programação orientada a objetos em PHP.'],
    stack: ['PHP', 'MVC', 'POO'],
  },
  {
    company: 'Instituto Unidos para Transformar', role: 'Desenvolvedor Back-end WordPress', kind: 'Freelance',
    start: '2025-07', end: '2025-07', place: 'São Paulo, Brasil · Remoto',
    summary: 'Back-end do site de uma ONG, por indicação da Cielo, com o método de pagamento da Cielo integrado.',
    highlights: ['Integração com a API da Cielo usando Merchant Key e Merchant ID.'],
    stack: ['WordPress', 'WooCommerce'],
  },
]
