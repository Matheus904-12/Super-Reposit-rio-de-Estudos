'use client'
import { useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSmoothScroll } from '@/lib/scroll'

// No servidor useLayoutEffect não roda; este alias evita o aviso e mantém o efeito antes da pintura no cliente.
const useEfeitoAntesDaPintura = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const EASE = 'power3.out'

function subir(el: Element) {
  gsap.from(el, { y: 44, opacity: 0, duration: 0.9, ease: EASE, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
}

function escalonar(container: Element) {
  gsap.from(container.children, { y: 48, opacity: 0, duration: 0.85, stagger: 0.09, ease: EASE, scrollTrigger: { trigger: container, start: 'top 85%', once: true } })
}

function entradaDoHero() {
  gsap.from('.hero .linha > span', { yPercent: 115, duration: 1.2, stagger: 0.1, ease: 'power4.out' })
  gsap.fromTo('.hero-foto', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.inOut' })
  gsap.from('.hero-aparece', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: EASE, delay: 0.45 })
}

/** Movimento preso ao scroll (scrub): a posição depende de onde a página está, não de tempo. */
function paralaxeDoHero() {
  const gatilho = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  gsap.to('.hero-foto img', { yPercent: 12, ease: 'none', scrollTrigger: gatilho })
  gsap.to('.hero h1', { yPercent: -7, ease: 'none', scrollTrigger: gatilho })
}

const ABAIXADO = { rotateX: 8, scale: 0.95, opacity: 0.3, y: 30 }
const NORMAL = { rotateX: 0, scale: 1, opacity: 1, y: 0 }

/**
 * O efeito da demo do WEAVE: o cartão vem do fundo "deitado", se levanta ao entrar e deita de novo ao sair.
 * Uma única linha do tempo presa ao scroll cobre as três fases (entrada, repouso, saída).
 */
function inclinar(el: Element) {
  // Elementos com texto de ação (barra do WEAVE) mantêm opacidade 1: cartão esmaecido reprova contraste.
  const { opacity, ...semOpacidade } = ABAIXADO
  const abaixado = el.hasAttribute('data-sem-opacidade') ? semOpacidade : ABAIXADO
  gsap.set(el, { transformPerspective: 1100, transformOrigin: '50% 100%' })
  const linha = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
  linha.fromTo(el, abaixado, { ...NORMAL, duration: 0.22 }).to({}, { duration: 0.56 }).to(el, { ...abaixado, duration: 0.22 })
}

/** Brilho que segue o cursor nos cartões (só com mouse; em toque não existe hover). */
function brilhoNosCartoes(): () => void {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {}
  const cartoes = gsap.utils.toArray<HTMLElement>('.proj, .cert')
  const mover = (e: PointerEvent) => {
    const el = e.currentTarget as HTMLElement
    const caixa = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - caixa.left}px`)
    el.style.setProperty('--my', `${e.clientY - caixa.top}px`)
  }
  cartoes.forEach((c) => c.addEventListener('pointermove', mover))
  return () => cartoes.forEach((c) => c.removeEventListener('pointermove', mover))
}

/** A linha central da Trajetória se desenha conforme a seção passa pela tela. */
function desenharLinhaDoTempo() {
  gsap.utils.toArray<HTMLElement>('.tl-envoltorio').forEach((trilha) => {
    const linha = trilha.querySelector('.tl-linha')
    if (linha) gsap.fromTo(linha, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: trilha, start: 'top 70%', end: 'bottom 70%', scrub: true } })
  })
}

function barraDeProgresso() {
  gsap.fromTo('.scroll-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 } })
}

/**
 * Tudo dentro de matchMedia: com prefers-reduced-motion nada é escondido nem movido.
 * Os elementos nascem visíveis; o GSAP só os esconde quando o movimento é permitido.
 */
export function useScrollAnimations() {
  useEfeitoAntesDaPintura(() => {
    gsap.registerPlugin(ScrollTrigger)
    const parar = initSmoothScroll()
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', (contexto) => {
      entradaDoHero()
      // O resto só importa depois da primeira pintura; adiar reduz o bloqueio da thread principal (TBT).
      // contexto.add mantém as animações adiadas dentro do matchMedia, então o revert ainda as limpa.
      const adiar = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 200))
      let desfazerBrilho = () => {}
      adiar(() => contexto.add?.(() => {
        paralaxeDoHero()
        barraDeProgresso()
        desenharLinhaDoTempo()
        gsap.utils.toArray<Element>('[data-anim="subir"]').forEach(subir)
        gsap.utils.toArray<Element>('[data-anim="escalonar"]').forEach(escalonar)
        gsap.utils.toArray<Element>('[data-anim="inclinar"]').forEach(inclinar)
        desfazerBrilho = brilhoNosCartoes()
        ScrollTrigger.refresh()
      }))
      return () => desfazerBrilho()
    })
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => { media.revert(); parar() }
  }, [])
}
