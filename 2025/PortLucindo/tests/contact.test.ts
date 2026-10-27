import { describe, expect, it } from 'vitest'
import { emailEncoded } from '../src/content/contact'
import { profile } from '../src/content/profile'
import { validarContato } from '../src/lib/contato'

describe('proteção do e-mail', () => {
  it('o valor codificado não contém "@" nem o endereço, mas decodifica para ele', () => {
    expect(emailEncoded).not.toContain('@')
    expect(emailEncoded).not.toContain(profile.email.split('@')[0]!)
    expect(Buffer.from(emailEncoded, 'base64').toString('utf8')).toBe(profile.email)
  })
})

describe('validarContato', () => {
  const valido = { nome: 'Ana Souza', email: 'ana@empresa.com.br', mensagem: 'Olá! Vi seu portfólio e gostaria de conversar.' }
  it('aceita dados corretos', () => expect(validarContato(valido)).toEqual({}))
  it('exige os três campos', () => {
    expect(Object.keys(validarContato({ nome: '', email: '', mensagem: '' })).sort()).toEqual(['email', 'mensagem', 'nome'])
  })
  it('recusa e-mail malformado', () => {
    for (const ruim of ['ana', 'ana@', '@empresa.com', 'ana@empresa', 'ana @empresa.com']) expect(validarContato({ ...valido, email: ruim }).email, ruim).toBeTruthy()
  })
  it('ignora espaços nas pontas', () => expect(validarContato({ nome: '  Ana  ', email: '  ana@empresa.com  ', mensagem: '  mensagem com tamanho ok  ' })).toEqual({}))
  it('recusa mensagem curta demais e nome só de espaços', () => {
    expect(validarContato({ ...valido, mensagem: 'oi' }).mensagem).toBeTruthy()
    expect(validarContato({ ...valido, nome: '   ' }).nome).toBeTruthy()
  })
  it('recusa mensagem gigante (anti-spam)', () => expect(validarContato({ ...valido, mensagem: 'x'.repeat(5001) }).mensagem).toBeTruthy())
})
