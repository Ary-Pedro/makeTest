import {
  abrirCadastroELogin,
  abrirHome,
  apagarContaPelaTela,
  apagarContaViaApi,
  criarContaPelaTela,
  usarUsuario,
  validarContaCriadaEContinuar
} from './helpers'

Cypress.Commands.add('deveRegistrarUsuarioAutomationExercise', () => {
  usarUsuario('registro', (usuario) => {
    apagarContaViaApi(usuario)

    abrirHome()
    abrirCadastroELogin()
    cy.contains('h2', 'New User Signup!').should('be.visible')

    criarContaPelaTela(usuario)
    validarContaCriadaEContinuar(usuario)

    apagarContaPelaTela()
    cy.get('[data-qa="continue-button"]').click()
  })
})
