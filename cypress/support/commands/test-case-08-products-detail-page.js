import {
  abrirHome,
  abrirProdutos
} from './helpers'

Cypress.Commands.add('deveValidarTodosOsProdutosEDetalheDoProdutoAutomationExercise', () => {
  abrirHome()
  abrirProdutos()
  cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)

  cy.contains('a', 'View Product').first().click()

  cy.location('pathname').should('include', '/product_details/')
  cy.get('.product-information').within(() => {
    cy.get('h2').should('be.visible')
    cy.contains('Category:').should('be.visible')
    cy.contains(/^Rs\./).should('be.visible')
    cy.contains('Availability:').should('be.visible')
    cy.contains('Condition:').should('be.visible')
    cy.contains('Brand:').should('be.visible')
  })
})
