import {
  abrirCadastroELogin,
  abrirHome,
  apagarContaViaApi,
  preencherLogin,
  usarUsuarioCriado
} from './helpers'

Cypress.Commands.add('deveFazerLogoutDoUsuarioAutomationExercise', () => {
  usarUsuarioCriado('logout', (usuario) => {
    abrirHome()
    abrirCadastroELogin()
    cy.contains('h2', 'Login to your account').should('be.visible')

    preencherLogin(usuario)
    cy.contains('a', `Logged in as ${usuario.name}`).should('be.visible')
    cy.contains('a', 'Logout').click()

    cy.location('pathname').should('include', '/login')
    cy.contains('h2', 'Login to your account').should('be.visible')

    apagarContaViaApi(usuario)
  })
})
