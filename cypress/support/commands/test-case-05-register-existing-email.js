import {
  abrirCadastroELogin,
  abrirHome,
  apagarContaViaApi,
  preencherCadastroInicial,
  usarUsuarioCriado
} from './helpers'

Cypress.Commands.add('deveExibirErroAoRegistrarUsuarioComEmailExistenteAutomationExercise', () => {
  usarUsuarioCriado('email-existente', (usuario) => {
    abrirHome()
    abrirCadastroELogin()
    cy.contains('h2', 'New User Signup!').should('be.visible')

    preencherCadastroInicial(usuario)

    cy.contains('p', 'Email Address already exist!').should('be.visible')
    apagarContaViaApi(usuario)
  })
})
