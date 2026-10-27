import type { Metadata, Viewport } from 'next'
import '@fontsource/geist/latin-400.css'
import '@fontsource/geist/latin-500.css'
import '@fontsource/geist/latin-600.css'
import '@fontsource/geist-mono/latin-400.css'
import '@fontsource/geist-mono/latin-500.css'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import { publicProfile } from '@/content/publico'
import './globals.css'
import '@/styles/shell.css'
import '@/styles/hero.css'
import '@/styles/sections.css'
import '@/styles/projects.css'
import '@/styles/cards.css'
import '@/styles/contact.css'

const imagemOg = { url: '/images/og.png', width: 1200, height: 630, alt: 'Matheus Lucindo, desenvolvedor de software' }

export const metadata: Metadata = {
  metadataBase: new URL('https://lucindoporto.netlify.app'),
  title: 'Matheus Lucindo — Desenvolvedor de Software',
  description: 'Desenvolvedor de software e analista na BCR.CX. Integrações, APIs e produtos web com TypeScript, Python e Node.js.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Matheus Lucindo — Desenvolvedor de Software', description: 'Integrações, APIs e produtos web.', locale: 'pt_BR', type: 'website', url: '/', images: [imagemOg] },
  twitter: { card: 'summary_large_image', title: 'Matheus Lucindo', description: 'Integrações, APIs e produtos web.', images: [imagemOg.url] },
}
export const viewport: Viewport = { themeColor: '#0e0d0c', colorScheme: 'dark light' }

// Lê o tema salvo antes da primeira pintura, para não piscar o tema errado.
// Dados estruturados para buscadores. Vem de publicProfile, que não tem e-mail nem telefone.
const dadosEstruturados = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: publicProfile.name,
  jobTitle: 'Desenvolvedor de Software',
  worksFor: { '@type': 'Organization', name: 'BCR.CX' },
  url: 'https://lucindoporto.netlify.app',
  sameAs: publicProfile.links.filter((l) => l.label !== 'Portfólio').map((l) => l.href),
})

const temaInicial = `try{var t=localStorage.getItem('tema');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: temaInicial }} /></head>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: dadosEstruturados }} />
        {children}
      </body>
    </html>
  )
}
