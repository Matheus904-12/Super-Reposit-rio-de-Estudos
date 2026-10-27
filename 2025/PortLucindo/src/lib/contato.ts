export interface DadosDeContato { nome: string; email: string; mensagem: string }
export type ErrosDeContato = Partial<Record<keyof DadosDeContato, string>>

const PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MINIMO_MENSAGEM = 10
const MAXIMO_MENSAGEM = 5000

/** Valida no navegador para dar retorno imediato; o Netlify Forms ainda filtra spam no servidor. */
export function validarContato(dados: DadosDeContato): ErrosDeContato {
  const nome = dados.nome.trim()
  const email = dados.email.trim()
  const mensagem = dados.mensagem.trim()
  const erros: ErrosDeContato = {}
  if (!nome) erros.nome = 'Informe seu nome.'
  if (!email) erros.email = 'Informe seu e-mail.'
  else if (!PADRAO_EMAIL.test(email)) erros.email = 'Esse e-mail parece incompleto. Exemplo: voce@empresa.com'
  if (!mensagem) erros.mensagem = 'Escreva uma mensagem.'
  else if (mensagem.length < MINIMO_MENSAGEM) erros.mensagem = `Conte um pouco mais (mínimo de ${MINIMO_MENSAGEM} caracteres).`
  else if (mensagem.length > MAXIMO_MENSAGEM) erros.mensagem = `A mensagem passou de ${MAXIMO_MENSAGEM} caracteres.`
  return erros
}
