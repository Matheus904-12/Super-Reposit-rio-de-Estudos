'use client'
import { useRef, useState } from 'react'
import { publicProfile } from '@/content/publico'
import { validarContato, type DadosDeContato, type ErrosDeContato } from '@/lib/contato'
import { SecaoCabeca } from './SecaoCabeca'

type Estado = 'ocioso' | 'enviando' | 'enviado' | 'erro'
const COPIADO_POR_MS = 2000

/** Envia ao Netlify Forms. O formulário "fantasma" em public/forms.html é o que o Netlify detecta no build. */
async function enviarParaNetlify(dados: DadosDeContato): Promise<boolean> {
  const corpo = new URLSearchParams({ 'form-name': 'contato', 'bot-field': '', ...dados }).toString()
  const resposta = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: corpo })
  // `next dev` não tem o Netlify por trás e responde 404/405: em desenvolvimento seguimos como enviado para testar a interface.
  return resposta.ok || (process.env.NODE_ENV === 'development' && [404, 405].includes(resposta.status))
}

export function Contato({ emailCodificado }: { emailCodificado: string }) {
  const [estado, setEstado] = useState<Estado>('ocioso')
  const [erros, setErros] = useState<ErrosDeContato>({})
  const [copiado, setCopiado] = useState(false)
  const formulario = useRef<HTMLFormElement>(null)
  // O e-mail só existe em texto puro depois de um clique do visitante.
  const email = () => atob(emailCodificado)

  const copiar = async () => {
    try { await navigator.clipboard.writeText(email()) } catch { window.location.href = `mailto:${email()}`; return }
    setCopiado(true)
    window.setTimeout(() => setCopiado(false), COPIADO_POR_MS)
  }

  const enviar = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const campos = new FormData(evento.currentTarget)
    if (campos.get('bot-field')) return setEstado('enviado') // robô: finge sucesso e descarta
    const dados: DadosDeContato = { nome: String(campos.get('nome') ?? ''), email: String(campos.get('email') ?? ''), mensagem: String(campos.get('mensagem') ?? '') }
    const encontrados = validarContato(dados)
    setErros(encontrados)
    const primeiro = Object.keys(encontrados)[0]
    if (primeiro) return void formulario.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus()
    setEstado('enviando')
    try { setEstado((await enviarParaNetlify(dados)) ? 'enviado' : 'erro') } catch { setEstado('erro') }
  }

  const ligacoes = publicProfile.links.filter((l) => ['LinkedIn', 'GitHub'].includes(l.label))
  return (
    <section className="secao" id="contato">
      <div className="container">
        <SecaoCabeca numero="07" rotulo="Contato" titulo={<>Vamos trabalhar <em>juntos</em>?</>} />
        <div className="contato-grade">
          <div className="contato-texto" data-anim="subir">
            <p className="contato-lead">Estou aberto a oportunidades de desenvolvimento de software. O caminho mais rápido é o e-mail.</p>
            <div className="contato-email">
              <button type="button" className="btn btn-primario" onClick={copiar} aria-live="polite">{copiado ? 'E-mail copiado ✓' : 'Copiar e-mail'}</button>
              <button type="button" className="btn btn-fantasma" onClick={() => { window.location.href = `mailto:${email()}` }}>Escrever</button>
            </div>
            <ul className="contato-links">
              {ligacoes.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label} <span aria-hidden="true">↗</span></a></li>)}
            </ul>
          </div>
          {estado === 'enviado' ? (
            <div className="form form-sucesso" role="status" aria-live="polite" data-anim="subir">
              <svg className="sucesso-icone" width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <circle className="sucesso-circulo" cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="2.5" />
                <path className="sucesso-marca" d="M20 33l8 8 16-17" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3>Mensagem <em>enviada</em>.</h3>
              <p>Obrigado pelo contato!</p>
              <button type="button" className="btn btn-fantasma btn-pequeno" onClick={() => setEstado('ocioso')}>Enviar outra mensagem</button>
            </div>
          ) : (
          <form ref={formulario} className="form" name="contato" onSubmit={enviar} noValidate data-anim="subir">
            <p hidden><label>Não preencha: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
            {(['nome', 'email', 'mensagem'] as const).map((campo) => (
              <div className="campo" key={campo}>
                <label htmlFor={`c-${campo}`}>{campo === 'nome' ? 'Nome' : campo === 'email' ? 'E-mail' : 'Mensagem'}</label>
                {campo === 'mensagem'
                  ? <textarea id="c-mensagem" name="mensagem" rows={5} aria-invalid={Boolean(erros.mensagem)} aria-describedby="e-mensagem" />
                  : <input id={`c-${campo}`} name={campo} type={campo === 'email' ? 'email' : 'text'} autoComplete={campo === 'email' ? 'email' : 'name'} aria-invalid={Boolean(erros[campo])} aria-describedby={`e-${campo}`} />}
                <p id={`e-${campo}`} className="erro" role="alert">{erros[campo]}</p>
              </div>
            ))}
            <button type="submit" className="btn btn-primario" disabled={estado === 'enviando'}>{estado === 'enviando' ? 'Enviando…' : 'Enviar mensagem'}</button>
            <p className="form-retorno" role="status" aria-live="polite">
              {estado === 'erro' && 'Não consegui enviar agora. Tente de novo ou use o e-mail ao lado.'}
            </p>
          </form>
          )}
        </div>
      </div>
    </section>
  )
}
