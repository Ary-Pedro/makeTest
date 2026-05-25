export const testCase03LogarUsuarioComErro = () => {
  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.deveExibirErroAoLogarComEmailESenhaIncorretosAutomationExercise()
  })
}
