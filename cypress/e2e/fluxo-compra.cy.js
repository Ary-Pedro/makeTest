describe('Fluxo completo de compra', () => {
  it('Deve comprar um produto com usuario padrao', () => {
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
})
