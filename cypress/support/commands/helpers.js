export const produtoParaBusca = 'Blue Top'

export const gerarEmail = (prefixo) => {
  const sufixo = `${Date.now()}-${Cypress._.random(1000, 9999)}`

  return `${prefixo}-${sufixo}@teste.com`
}

const montarUsuario = (usuarioBase, prefixo = 'usuario') => ({
  ...usuarioBase,
  email: gerarEmail(prefixo)
})

export const abrirHome = () => {
  cy.visit('/')
  cy.location('pathname').should('eq', '/')
  cy.get('#slider').should('be.visible')
  cy.contains('a', 'Home').should('be.visible')
}

export const abrirCadastroELogin = () => {
  cy.contains('a', 'Signup / Login').click()
  cy.location('pathname').should('include', '/login')
}

export const abrirProdutos = () => {
  cy.contains('a', 'Products').click()
  cy.location('pathname').should('include', '/products')
  cy.contains('h2', 'All Products').should('be.visible')
}

export const preencherCadastroInicial = ({ name, email }) => {
  cy.get('[data-qa="signup-name"]').clear().type(name)
  cy.get('[data-qa="signup-email"]').clear().type(email)
  cy.get('[data-qa="signup-button"]').click()
}

export const preencherLogin = ({ email, password }) => {
  cy.get('[data-qa="login-email"]').clear().type(email)
  cy.get('[data-qa="login-password"]').clear().type(password)
  cy.get('[data-qa="login-button"]').click()
}

export const preencherInformacoesDaConta = (usuario) => {
  cy.contains('b', 'Enter Account Information').should('be.visible')
  cy.get('#id_gender1').check()
  cy.get('[data-qa="password"]').type(usuario.password)
  cy.get('[data-qa="days"]').select(usuario.birth_date)
  cy.get('[data-qa="months"]').select(usuario.birth_month)
  cy.get('[data-qa="years"]').select(usuario.birth_year)
  cy.get('#newsletter').check()
  cy.get('#optin').check()
  cy.get('[data-qa="first_name"]').type(usuario.firstname)
  cy.get('[data-qa="last_name"]').type(usuario.lastname)
  cy.get('[data-qa="company"]').type(usuario.company)
  cy.get('[data-qa="address"]').type(usuario.address1)
  cy.get('[data-qa="address2"]').type(usuario.address2)
  cy.get('[data-qa="country"]').select(usuario.country)
  cy.get('[data-qa="state"]').type(usuario.state)
  cy.get('[data-qa="city"]').type(usuario.city)
  cy.get('[data-qa="zipcode"]').type(usuario.zipcode)
  cy.get('[data-qa="mobile_number"]').type(usuario.mobile_number)
}

export const criarContaPelaTela = (usuario) => {
  preencherCadastroInicial(usuario)
  preencherInformacoesDaConta(usuario)
  cy.get('[data-qa="create-account"]').click()
}

export const validarContaCriadaEContinuar = (usuario) => {
  cy.contains('b', 'Account Created!').should('be.visible')
  cy.get('[data-qa="continue-button"]').click()
  cy.contains('a', `Logged in as ${usuario.name}`).should('be.visible')
}

export const apagarContaPelaTela = () => {
  cy.contains('a', 'Delete Account').click()
  cy.contains('b', 'Account Deleted!').should('be.visible')
}

export const criarContaViaApi = (usuario) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: usuario
  }).its('body').should('include', 'User created!')
}

export const apagarContaViaApi = ({ email, password }) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    failOnStatusCode: false,
    body: {
      email,
      password
    }
  })
}

export const usarUsuario = (prefixo, callback) => {
  cy.fixture('usuarios').then(({ usuarioAutomation }) => {
    callback(montarUsuario(usuarioAutomation, prefixo))
  })
}

export const usarUsuarioCriado = (prefixo, callback) => {
  usarUsuario(prefixo, (usuario) => {
    apagarContaViaApi(usuario)
    criarContaViaApi(usuario)
    callback(usuario)
  })
}

export const assinarNewsletter = () => {
  cy.scrollTo('bottom', { ensureScrollable: false })
  cy.contains('h2', 'Subscription').should('be.visible')
  cy.get('#susbscribe_email').clear().type(gerarEmail('assinatura'))
  cy.get('#subscribe').click()
  cy.contains('You have been successfully subscribed!').should('be.visible')
}
