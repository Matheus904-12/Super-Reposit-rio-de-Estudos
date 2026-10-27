interface SecaoCabecaProps { numero: string; rotulo: string; titulo: React.ReactNode }

/** Cabeçalho editorial das seções: número, rótulo em mono e título grande em serifa. */
export function SecaoCabeca({ numero, rotulo, titulo }: SecaoCabecaProps) {
  return (
    <header className="secao-cabeca" data-anim="subir">
      <p className="mono"><span className="accent">{numero}</span> — {rotulo}</p>
      <h2>{titulo}</h2>
    </header>
  )
}
