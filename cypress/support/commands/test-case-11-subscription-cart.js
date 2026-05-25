import {
  abrirHome,
  assinarNewsletter
} from './helpers'

Cypress.Commands.add('deveValidarAssinaturaNoCarrinhoAutomationExercise', () => {
  abrirHome()
  cy.contains('a', 'Cart').click()
  cy.location('pathname').should('include', '/view_cart')

  assinarNewsletter()
})
