describe('Funcionalidade de Autenticacao', () => {
  it('Deve renderizar a tela de login com sucesso', () => {
    cy.visit('/')

    cy.get('[data-test="username"]').should('be.visible')
  })

  it('Deve preencher os dados de credenciais no formulario', () => {
    cy.fixture('usuarios').then(({ usuarioPadrao }) => {
      cy.visit('/')

      cy.get('[data-test="username"]').type(usuarioPadrao.username)
      cy.get('[data-test="password"]').type(usuarioPadrao.password)
      cy.get('[data-test="login-button"]').click()

      cy.url().should('include', '/inventory.html')
    })
  })
})
