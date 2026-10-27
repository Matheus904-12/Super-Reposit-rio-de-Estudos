'use client'
import { useEffect, useId, useRef } from 'react'
import { lockScroll, unlockScroll } from '@/lib/scroll'

interface DialogoProps {
  aberto: boolean
  aoFechar: () => void
  rotulo: string
  titulo: string
  children: React.ReactNode
}

const DURACAO_DA_SAIDA_MS = 260 // igual à animação `dialogo-sai` em cards.css

/**
 * Modal sobre o <dialog> nativo: foco preso, Esc fecha e o foco volta para o botão que abriu.
 * Para a rolagem suave (Lenis) da página enquanto está aberto, senão ela rola por trás. O `data-lenis-prevent`
 * é essencial: com o Lenis parado ele cancela todo evento de roda, e sem isso a lista de dentro do modal não rola.
 * A saída é animada: Esc, clique no fundo e botão X passam todos por `fechar`, que toca a animação antes do close().
 */
export function Dialogo({ aberto, aoFechar, rotulo, titulo, children }: DialogoProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const fechando = useRef(false)
  const idTitulo = useId()

  useEffect(() => {
    const dialogo = ref.current
    if (!dialogo) return
    if (aberto && !dialogo.open) { dialogo.showModal(); lockScroll() }
    if (!aberto && dialogo.open) dialogo.close()
  }, [aberto])

  const fechar = () => {
    const dialogo = ref.current
    if (!dialogo?.open || fechando.current) return
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (semMovimento) return dialogo.close()
    fechando.current = true
    dialogo.dataset.fechando = 'true'
    window.setTimeout(() => {
      delete dialogo.dataset.fechando
      fechando.current = false
      dialogo.close()
    }, DURACAO_DA_SAIDA_MS)
  }

  // O evento "close" é o ponto único de limpeza, venha o fechamento de onde vier.
  const aoFecharNativo = () => { unlockScroll(); aoFechar() }

  return (
    <dialog
      ref={ref} className="dialogo" data-lenis-prevent aria-labelledby={idTitulo}
      onCancel={(e) => { e.preventDefault(); fechar() }}
      onClose={aoFecharNativo}
      onClick={(e) => e.target === ref.current && fechar()}
    >
      <div className="dialogo-corpo">
        <header className="dialogo-cabeca">
          <div>
            <p className="mono">{rotulo}</p>
            <h2 id={idTitulo}>{titulo}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={fechar} aria-label="Fechar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </header>
        {aberto && children}
      </div>
    </dialog>
  )
}
