import { emailEncoded } from '@/content/contact'
import { About } from '@/components/About'
import { Certificacoes } from '@/components/Certificacoes'
import { Contato } from '@/components/Contato'
import { CurriculoSecao } from '@/components/CurriculoSecao'
import { Animations } from '@/components/Animations'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
import { Projects } from '@/components/Projects'
import { Recomendacoes } from '@/components/Recomendacoes'
import { Rodape } from '@/components/Rodape'
import { StackMarquee } from '@/components/StackMarquee'
import { Trajetoria } from '@/components/Trajetoria'

export default function Home() {
  return (
    <>
      <Animations />
      <Nav />
      <main>
        <Hero />
        <StackMarquee />
        <About />
        <Trajetoria />
        <Projects />
        <Certificacoes />
        <Recomendacoes />
        <CurriculoSecao />
        <Contato emailCodificado={emailEncoded} />
      </main>
      <Rodape />
    </>
  )
}
