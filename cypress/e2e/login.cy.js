describe('Funcionalidade de Autenticacao', () => {
  it('Deve renderizar a tela de login com sucesso', () => {
    cy.deveRenderizarTelaDeLoginComSucesso()
  })

  it('Deve preencher os dados de credenciais no formulario', () => {
    cy.devePreencherDadosCredenciaisNoFormulario()
  })
})
