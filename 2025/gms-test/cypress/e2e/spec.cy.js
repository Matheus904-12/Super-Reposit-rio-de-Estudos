/// <reference types="cypress" />

describe('US-012-Funcionalidade: Cadastro de Usuário', () => {
  it('Deve fazer o cadastro de campos obrigatórios', () => {
    cy.visit('http://127.0.0.1:8080/')
    
    // Gera um email único para evitar conflito de email já cadastrado
    const timestamp = Date.now()
    const uniqueEmail = `matheuslucindo${timestamp}@gmail.com`
    
    cy.get('#signup-firstname').type('Matheus')
    cy.get('#signup-lastname').type('Lucindo')
    cy.get('#signup-email').type(uniqueEmail)
    cy.get('#signup-phone').type('11971666817')
    cy.get('#signup-password').type('Matheus!12345')
    cy.screenshot('cadastro-formulario-preenchido')
    cy.get('#signup-button').click()
    
    // Aguarda a resposta aparecer no DOM e verifica se o cadastro foi realizado com sucesso
    cy.get('#signup-response', { timeout: 10000 }).should('contain', 'Cadastro realizado com sucesso!')
    cy.screenshot('cadastro-sucesso')
  })
  
  it('Deve validar email já cadastrado', () => {
    cy.visit('http://127.0.0.1:8080/')
    
    // Usa o email que sabemos que já está cadastrado
    cy.get('#signup-firstname').type('Matheus')
    cy.get('#signup-lastname').type('Lucindo')
    cy.get('#signup-email').type('matheuslucindo904@gmail.com')
    cy.get('#signup-phone').type('11971666817')
    cy.get('#signup-password').type('Matheus!12345')
    cy.get('#signup-button').click()
    
    // Verifica se retorna a mensagem de email já cadastrado
    cy.get('#signup-response', { timeout: 10000 }).should('contain', 'Este email já está cadastrado')
    cy.screenshot('cadastro-email-duplicado')
  })
})

describe('US-015-Recomendações de Filmes', () => {
  it('Selecione um filme para ver detalhes', () => {
    cy.visit('http://127.0.0.1:8080/')
    
    // Aguarda as recomendações serem carregadas dinamicamente
    cy.get('#recommendations', { timeout: 10000 }).should('exist')
    
    // Aguarda pelo menos 5 filmes serem carregados (conforme o script.js)
    cy.get('#recommendations > div', { timeout: 10000 }).should('have.length', 5)
    cy.screenshot('recomendacoes-carregadas')
    
    // Clica nas imagens dos filmes recomendados
    cy.get('#recommendations > div:nth-child(1) img').click()
    cy.get('#recommendations > div:nth-child(2) img').click()
    cy.get('#recommendations > div:nth-child(3) img').click()
    cy.get('#recommendations > div:nth-child(4) img').click()
    cy.get('#recommendations > div:nth-child(5) img').click()
  })
})

describe('US-0001-Buscar Filme', () => {
  it('Deve buscar filme com sucesso', () => {
    cy.visit('http://127.0.0.1:8080/')
    
    // Verifica se os elementos de busca estão presentes
    cy.get('#search-input').should('be.visible')
    cy.get('#search-button').should('be.visible')
    cy.get('#clear-button').should('be.visible')
    
    // Realiza a busca por um filme
    cy.get('#search-input').type('Matrix')
    cy.get('#search-button').click()
    
    // Aguarda os resultados da busca aparecerem
    cy.get('#results-section', { timeout: 10000 }).should('not.be.empty')
    cy.get('#results-section div', { timeout: 10000 }).should('exist')
    cy.screenshot('busca-filme-matrix-resultados')
    
    // Limpa a busca
    cy.get('#clear-button').click()
    cy.get('#search-input').should('have.value', '')
    cy.get('#results-section').should('be.empty')
  })
  
  it('Deve exibir mensagem para filme não encontrado', () => {
    cy.visit('http://127.0.0.1:8080/')
    
    // Busca por um filme que não existe
    cy.get('#search-input').type('FilmeQueNaoExiste123456789')
    cy.get('#search-button').click()
    
    // Verifica se exibe mensagem de filme não encontrado
    cy.get('#results-section', { timeout: 10000 }).should('contain', 'Filme não encontrado')
    cy.screenshot('busca-filme-nao-encontrado')
  })
  
  it('Deve validar campo de busca vazio', () => {
    cy.visit('http://127.0.0.1:8080/')
    
    // Tenta buscar sem digitar nada
    cy.get('#search-button').click()
    
    // Verifica se aparece um alerta (intercepta o alert)
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert')
    })
    
    cy.get('#search-button').click()
    cy.get('@windowAlert').should('have.been.calledWith', 'Por favor, digite o nome de um filme')
  })
})

