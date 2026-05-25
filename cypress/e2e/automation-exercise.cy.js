import { testCase01RegistrarUsuario } from './testes/test-case-01-register-user'
import { testCase02LogarUsuarioComSucesso } from './testes/test-case-02-login-user-correct'
import { testCase03LogarUsuarioComErro } from './testes/test-case-03-login-user-incorrect'
import { testCase04FazerLogout } from './testes/test-case-04-logout-user'
import { testCase05RegistrarEmailExistente } from './testes/test-case-05-register-existing-email'
import { testCase06EnviarFormularioDeContato } from './testes/test-case-06-contact-us-form'
import { testCase07ValidarPaginaDeCasosDeTeste } from './testes/test-case-07-test-cases-page'
import { testCase08ValidarProdutosEDetalhes } from './testes/test-case-08-products-detail-page'
import { testCase09PesquisarProduto } from './testes/test-case-09-search-product'
import { testCase10ValidarAssinaturaNaHome } from './testes/test-case-10-subscription-home'
import { testCase11ValidarAssinaturaNoCarrinho } from './testes/test-case-11-subscription-cart'

describe('Automation Exercise', () => {
  testCase01RegistrarUsuario()
  testCase02LogarUsuarioComSucesso()
  testCase03LogarUsuarioComErro()
  testCase04FazerLogout()
  testCase05RegistrarEmailExistente()
  testCase06EnviarFormularioDeContato()
  testCase07ValidarPaginaDeCasosDeTeste()
  testCase08ValidarProdutosEDetalhes()
  testCase09PesquisarProduto()
  testCase10ValidarAssinaturaNaHome()
  testCase11ValidarAssinaturaNoCarrinho()
})
