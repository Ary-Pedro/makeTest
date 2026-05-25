# Testes Cypress - Automation Exercise

Projeto Cypress com testes E2E para os fluxos do site Automation Exercise.

## Requisitos

- Node.js e npm instalados.
- Terminal de sua preferencia.
- Editor de codigo, como VS Code.

Confira as versoes:

```bash
node -v
npm -v
```

## Instalacao

Instale as dependencias do projeto:

```bash
npm install
```

## Como rodar

Abra a interface grafica do Cypress:

```bash
npm run cypress:open
```

Rode toda a suite em modo headless:

```bash
npm run cypress:run
```

Rode apenas a suite Automation Exercise:

```bash
npm run cypress:run:automation
```

Verifique se o binario do Cypress esta funcionando:

```bash
npm run cypress:verify
```

Por padrao, a URL base e `https://automationexercise.com`. Se precisar sobrescrever:

```bash
CYPRESS_BASE_URL=https://automationexercise.com npm run cypress:run
```

Os scripts removem `ELECTRON_RUN_AS_NODE` antes de iniciar o Cypress. Essa variavel pode existir em alguns ambientes Linux/WSL e impedir o Electron do Cypress de abrir corretamente.

## Estrutura

```text
cypress/
  fixtures/
    contato.txt
    usuarios.json
  e2e/
    testes/
      test-case-01-register-user.js
      ...
      test-case-11-subscription-cart.js
    automation-exercise.cy.js
  support/
    commands/
      helpers.js
      test-case-01-register-user.js
      ...
      test-case-11-subscription-cart.js
    commands.js
    e2e.js
cypress.config.js
package.json
```

## Modelo dos testes esperado

O arquivo `cypress/e2e/automation-exercise.cy.js` funciona como o arquivo principal da suite. Ele importa os scripts de cada caso de teste e chama todos dentro de um unico `describe`.

Cada caso fica em um script proprio dentro de `cypress/e2e/testes/`. O script declara o `it` e chama o comando Cypress correspondente.

Exemplo de script:

```js
export const testCase01RegistrarUsuario = () => {
  it('Test Case 1: Register User', () => {
    cy.deveRegistrarUsuarioAutomationExercise()
  })
}
```

Exemplo do main:

```js
import { testCase01RegistrarUsuario } from './testes/test-case-01-register-user'

describe('Automation Exercise', () => {
  testCase01RegistrarUsuario()
})
```

A implementacao de cada comando fica em um arquivo proprio dentro de `cypress/support/commands/`. O arquivo `cypress/support/commands.js` apenas importa todos esses comandos, e `cypress/support/e2e.js` importa esse agregador, seguindo o padrao da branch `main`.

Os dados base ficam em `cypress/fixtures/usuarios.json`, e emails dinamicos sao gerados durante a execucao para evitar conflito com usuarios ja cadastrados.

## Casos cobertos

- Test Case 1: Register User
- Test Case 2: Login User with correct email and password
- Test Case 3: Login User with incorrect email and password
- Test Case 4: Logout User
- Test Case 5: Register User with existing email
- Test Case 6: Contact Us Form
- Test Case 7: Verify Test Cases Page
- Test Case 8: Verify All Products and product detail page
- Test Case 9: Search Product
- Test Case 10: Verify Subscription in home page
- Test Case 11: Verify Subscription in Cart page

## Boas praticas

- Teste fluxos de usuario, nao detalhes internos de implementacao.
- Deixe cada teste independente: limpe sessao, cookies e dados necessarios antes de comecar.
- Use fixtures para dados reaproveitaveis.
- Evite `cy.wait(5000)` como estrategia padrao; prefira esperar por elementos, URLs ou requisicoes.
- Rode `npm run cypress:run` antes de entregar uma mudanca grande.
