import {
  abrirCadastroELogin,
  abrirHome,
  apagarContaPelaTela,
  preencherLogin,
  usarUsuarioCriado
} from './helpers'

Cypress.Commands.add('deveLogarUsuarioComEmailESenhaCorretosAutomationExercise', () => {
  usarUsuarioCriado('login-correto', (usuario) => {
    abrirHome()
    abrirCadastroELogin()
    cy.contains('h2', 'Login to your account').should('be.visible')

    preencherLogin(usuario)
    cy.contains('a', `Logged in as ${usuario.name}`).should('be.visible')

    apagarContaPelaTela()
  })
})
