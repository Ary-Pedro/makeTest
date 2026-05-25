import {
  abrirHome,
  abrirProdutos,
  produtoParaBusca
} from './helpers'

Cypress.Commands.add('devePesquisarProdutoAutomationExercise', () => {
  abrirHome()
  abrirProdutos()

  cy.get('#search_product').clear().type(produtoParaBusca)
  cy.get('#submit_search').click()

  cy.contains('h2', 'Searched Products').should('be.visible')
  cy.get('.features_items .product-image-wrapper')
    .should('have.length.greaterThan', 0)
    .each(($produto) => {
      cy.wrap($produto).should('be.visible')
    })
  cy.contains('.productinfo p', produtoParaBusca).should('be.visible')
})
