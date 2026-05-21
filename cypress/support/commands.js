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

Cypress.Commands.add('deveRenderizarTelaDeLoginComSucesso', () => {
  cy.visit('/')

  cy.get('[data-test="username"]').should('be.visible')
})

Cypress.Commands.add('devePreencherDadosCredenciaisNoFormulario', () => {
  cy.fixture('usuarios').then(({ usuarioPadrao }) => {
    cy.loginSauceDemo(usuarioPadrao)
  })
})

Cypress.Commands.add('deveComprarProdutoComUsuarioPadrao', () => {
  cy.fixture('usuarios').then(({ usuarioPadrao }) => {
    cy.fixture('checkout').then(({ clientePadrao }) => {
      cy.loginSauceDemo(usuarioPadrao)

      cy.get('[data-test="title"]').should('have.text', 'Products')

      cy.adicionarProdutoAoCarrinho('Sauce Labs Backpack')
      cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')

      cy.abrirCarrinho()
      cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
        .should('be.visible')

      cy.get('[data-test="checkout"]').click()
      cy.preencherCheckout(clientePadrao)
      cy.get('[data-test="continue"]').click()

      cy.get('[data-test="total-label"]').should('be.visible')
      cy.get('[data-test="finish"]').click()

      cy.get('[data-test="complete-header"]')
        .should('have.text', 'Thank you for your order!')
    })
  })
})
