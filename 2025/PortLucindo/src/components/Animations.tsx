'use client'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

/** Componente sem visual: liga o scroll suave e as animações da página inteira. */
export function Animations() {
  useScrollAnimations()
  return <div className="scroll-progress" aria-hidden="true" />
}
