import type { Project } from '../schema'

const cover = (slug: string) => `/images/projetos/${slug}-desktop.webp`

/**
 * Textos de Agendei, InovaMold, Suburban, ConectaTEA e Prodmais vêm do LinkedIn do Matheus; os demais, do README de cada repositório.
 * Demo em Supabase ou Render gratuitos pode estar pausada por inatividade: `demoMayBeAsleep` mostra o aviso no card.
 */
export const projects: Project[] = [
  {
    slug: 'agendei', title: 'Agendei.', kind: 'Plataforma de agendamento e gestão', status: 'academico',
    role: 'Liderança técnica de uma equipe de cinco pessoas',
    summary: 'Plataforma para barbearias e salões de beleza: aplicativo Android nativo (MVVM, Material Design 3), painel web de gestão e API REST documentada com Swagger/OpenAPI. Desenvolvida com Spec Driven Development, banco relacional e NoSQL, e serviços de nuvem para mídia e notificações.',
    stack: ['Kotlin', 'Jetpack Compose', 'Java', 'Spring Boot', 'TypeScript', 'Next.js', 'PostgreSQL', 'MongoDB', 'Firebase'],
    featured: true, cover: cover('agendei'), demoMayBeAsleep: true,
    repo: 'https://github.com/Agendei-Barbearia-e-Salao-de-Beleza/Agendei.', demo: 'https://agendei-alpha.vercel.app',
  },
  {
    slug: 'prodmais', title: 'Prodmais', kind: 'Pesquisa científica (PIBIC / UMC)', status: 'academico',
    role: 'Estudante de Iniciação Científica',
    summary: 'Ferramenta que agrega currículos da Plataforma Lattes e cruza com OpenAlex e CrossRef para dar visibilidade à produção acadêmica, com busca avançada, painéis de indicadores e exportação para o ORCID.',
    stack: ['PHP', 'JavaScript'], featured: true, cover: cover('prodmais'), demoMayBeAsleep: true,
    // Repositório privado: sem link de código.
    demo: 'https://prodmais-6g41.onrender.com',
  },
  {
    slug: 'claude-cortex', title: 'claude-cortex', kind: 'Ferramenta de desenvolvimento', status: 'producao',
    role: 'Autor',
    summary: 'Dashboard 100% local que mostra para onde o uso do Claude Code está indo: tokens, custo, atividade e memória por repositório, sem conta e sem nenhum dado saindo da máquina. Backend em Go sem CGO e interface em React embutida num único binário.',
    stack: ['Go', 'React', 'TypeScript', 'Vite', 'GSAP', 'SQLite'], featured: true, cover: cover('claude-cortex'),
    repo: 'https://github.com/Matheus904-12/claude-cortex', demo: 'https://claude-cortex.vercel.app/',
  },
  {
    // Sem descrição, tecnologias nem lista de funções de propósito: o projeto é fechado e o site não revela a ideia.
    slug: 'weave', title: 'WEAVE', kind: 'Em breve', status: 'em-construcao',
    role: 'Autor', summary: 'Em construção.', stack: [], featured: false, startsAt: '2027-01',
  },
  {
    slug: 'conectatea', title: 'ConectaTEA', kind: 'Plataforma de apoio a famílias', status: 'academico',
    role: 'Desenvolvimento e coordenação técnica',
    summary: 'Hub para famílias com filhos no espectro autista: autenticação em duas etapas com OTP por e-mail, JWT, painel para especialistas com prontuário e Google Meet, e chat em tempo real com WebSockets.',
    stack: ['Node.js', 'Express', 'Socket.IO', 'PostgreSQL', 'Supabase', 'JWT'], featured: false, cover: cover('conectatea'), demoMayBeAsleep: true,
    repo: 'https://github.com/Matheus904-12/ConectaTEA', demo: 'https://conectatea.netlify.app/',
  },
  {
    slug: 'inovamold', title: 'InovaMold', kind: 'Dashboard de logística e rastreabilidade', status: 'producao',
    role: 'Desenvolvimento ponta a ponta',
    summary: 'Desenvolvido para a InovaMold Polímeros: sistema de monitoramento logístico do pedido, da entrada no comercial à expedição: CRUD em tempo real, timeline de 8 etapas, dashboards que comparam tempos reais com médias históricas e semáforo de insumos.',
    stack: ['JavaScript', 'HTML', 'CSS', 'PostgreSQL', 'Supabase', 'Chart.js'], featured: false,
    // A demo (github.io/Dashboard-SCRUM) depende de um banco Supabase hoje pausado: a tela mostra OFFLINE.
    // Depois de restaurar o projeto no painel do Supabase: reativar `demo` e `cover`, e rodar `npm run capturar -- inovamold`.
    repo: 'https://github.com/Matheus904-12/Dashboard-SCRUM',
  },
  {
    slug: 'suburban', title: 'Suburban', kind: 'Rastreio de trens da CPTM', status: 'estudo',
    role: 'Autor',
    summary: 'Plataforma web para acompanhar linhas e composições da CPTM em tempo real, com WebSockets, mapas interativos, alertas de atraso e processamento assíncrono com Celery e Redis.',
    stack: ['Python', 'Django', 'Django Channels', 'Celery', 'Redis', 'Leaflet.js'], featured: false,
    repo: 'https://github.com/Matheus904-12/Suburban',
  },
  {
    slug: 'weatherapi', title: 'WeatherAPI', kind: 'Serviço de previsão do tempo', status: 'estudo',
    role: 'Autor',
    summary: 'Serviço de consulta de previsão do tempo com Arquitetura Hexagonal e DDD, evoluído para um coletor automático que monitora cidades em segundo plano e mantém histórico persistente. Testes automatizados e CI no GitHub Actions.',
    stack: ['Python', 'Arquitetura Hexagonal', 'DDD', 'GitHub Actions'], featured: false,
    repo: 'https://github.com/Matheus904-12/WeatherAPI',
  },
  {
    slug: 'cerne', title: 'Cerne', kind: 'Board de tarefas pessoal', status: 'estudo',
    role: 'Autor',
    summary: 'Board de tarefas em PWA em que os dados vivem em arquivos versionados no próprio repositório. O Claude Code cria e move tarefas por um servidor MCP, e os lembretes saem por e-mail e Telegram via GitHub Actions.',
    stack: ['PWA', 'MCP', 'Node.js', 'GitHub Actions'], featured: false,
    repo: 'https://github.com/Matheus904-12/cerne',
  },
  {
    slug: 'ecommerce-montink', title: 'Mini ERP Montink', kind: 'ERP e e-commerce', status: 'estudo',
    role: 'Autor',
    summary: 'Mini ERP feito para um teste técnico, em PHP puro com MVC: produtos com variações e controle de estoque, carrinho com ajuste de quantidade, CRUD de cupons e finalização de pedido com consulta de CEP.',
    stack: ['PHP', 'MVC', 'ViaCEP'], featured: false,
    repo: 'https://github.com/Matheus904-12/EcommerceMontink',
  },
  {
    slug: 'sunnythings', title: 'SunnyThings', kind: 'App de compras de mercado', status: 'estudo',
    role: 'Autor',
    summary: 'Aplicativo para auxiliar as compras de supermercado, em React Native com back-end em Node.js. Os protótipos de alta fidelidade foram feitos no Figma e validados com testes de usabilidade com usuários reais.',
    stack: ['React Native', 'Node.js', 'Figma'], featured: false, cover: cover('sunnythings'),
    repo: 'https://github.com/Matheus904-12/SunnyThings', demo: 'https://sunny-things.vercel.app',
  },
]
