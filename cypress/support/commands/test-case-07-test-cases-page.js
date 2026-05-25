import { abrirHome } from './helpers'

Cypress.Commands.add('deveValidarPaginaDeCasosDeTesteAutomationExercise', () => {
  abrirHome()
  cy.contains('a', 'Test Cases').click()

  cy.location('pathname').should('include', '/test_cases')
  cy.contains('b', 'Test Cases').should('be.visible')
})
