import {
  abrirHome,
  gerarEmail
} from './helpers'

Cypress.Commands.add('deveEnviarFormularioDeContatoAutomationExercise', () => {
  cy.on('window:confirm', () => true)

  cy.fixture('usuarios').then(({ contato }) => {
    abrirHome()
    cy.contains('a', 'Contact us').click()
    cy.contains('h2', 'Get In Touch').should('be.visible')

    cy.get('[data-qa="name"]').type(contato.name)
    cy.get('[data-qa="email"]').type(gerarEmail('contato'))
    cy.get('[data-qa="subject"]').type(contato.subject)
    cy.get('[data-qa="message"]').type(contato.message)
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/contato.txt')
    cy.get('[data-qa="submit-button"]').click()

    cy.contains('Success! Your details have been submitted successfully.')
      .should('be.visible')

    cy.contains('a', 'Home').click()
    cy.location('pathname').should('eq', '/')
    cy.get('#slider').should('be.visible')
  })
})
