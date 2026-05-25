import {
  abrirHome,
  assinarNewsletter
} from './helpers'

Cypress.Commands.add('deveValidarAssinaturaNaHomeAutomationExercise', () => {
  abrirHome()
  assinarNewsletter()
})
