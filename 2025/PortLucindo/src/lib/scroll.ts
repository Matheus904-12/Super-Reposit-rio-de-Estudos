import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis: Lenis | null = null
const OFFSET_CABECALHO = -88

/** Rolagem suave (Lenis) alimentando o ScrollTrigger. Em toque a rolagem continua nativa. */
export function initSmoothScroll(): () => void {
  gsap.registerPlugin(ScrollTrigger)
  lenis = new Lenis({ lerp: 0.09, anchors: { offset: OFFSET_CABECALHO } })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t: number) => lenis?.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = null }
}

/** Modal e menu aberto precisam da página parada: o Lenis intercepta a roda do mouse. */
export const lockScroll = () => { lenis?.stop(); document.body.style.overflow = 'hidden' }
export const unlockScroll = () => { lenis?.start(); document.body.style.overflow = '' }
