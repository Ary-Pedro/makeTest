Cypress.Commands.add('loginSauceDemo', ({ username, password }) => {
  cy.visit('/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
  cy.url().should('include', '/inventory.html')
})

Cypress.Commands.add('adicionarProdutoAoCarrinho', (nomeProduto) => {
  cy.contains('.inventory_item', nomeProduto)
    .should('be.visible')
    .within(() => {
      cy.get('button').click()
    })
})

Cypress.Commands.add('abrirCarrinho', () => {
  cy.get('[data-test="shopping-cart-link"]').click()
  cy.url().should('include', '/cart.html')
})

Cypress.Commands.add('preencherCheckout', ({ firstName, lastName, postalCode }) => {
  cy.get('[data-test="firstName"]').type(firstName)
  cy.get('[data-test="lastName"]').type(lastName)
  cy.get('[data-test="postalCode"]').type(postalCode)
})
