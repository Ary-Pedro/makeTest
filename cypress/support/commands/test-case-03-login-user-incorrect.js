import {
  abrirCadastroELogin,
  abrirHome,
  gerarEmail,
  preencherLogin
} from './helpers'

Cypress.Commands.add('deveExibirErroAoLogarComEmailESenhaIncorretosAutomationExercise', () => {
  abrirHome()
  abrirCadastroELogin()
  cy.contains('h2', 'Login to your account').should('be.visible')

  preencherLogin({
    email: gerarEmail('login-incorreto'),
    password: 'senha-incorreta'
  })

  cy.contains('p', 'Your email or password is incorrect!').should('be.visible')
})
