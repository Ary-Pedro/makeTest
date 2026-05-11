# Tutorial de Instalacao do Cypress e Primeiro Teste Pratico

Este projeto segue o modelo do guia anexado: criar um ambiente Cypress local, abrir o Test Runner e executar um primeiro teste pratico usando o site Sauce Demo.

## Requisitos

- Node.js e npm instalados.
- Terminal de sua preferencia.
- Editor de codigo, como VS Code.

Confira as versoes:

```bash
node -v
npm -v
```

## Instalação

Instale as dependencias do projeto:

```bash
npm install
```

## Como rodar

Abra a interface grafica do Cypress:

```bash
npm run cypress:open
```

Rode em modo headless:

```bash
npm run cypress:run
```

Verifique se o binário do Cypress está funcionando:

```bash
npm run cypress:verify
```

Por padrao, a URL base e `https://www.saucedemo.com`. Se precisar sobrescrever:

```bash
CYPRESS_BASE_URL=https://www.saucedemo.com npm run cypress:run
```

Os scripts removem `ELECTRON_RUN_AS_NODE` antes de iniciar o Cypress. Essa variavel pode existir em alguns ambientes Linux/WSL e impede o Electron do Cypress de abrir corretamente.

## Estrutura

```text
cypress/
  fixtures/
    checkout.json
    usuarios.json
  e2e/
    fluxo-compra.cy.js
    login.cy.js
  support/
    commands.js
    e2e.js
cypress.config.js
package.json
```

## Primeiro teste pratico

O arquivo `cypress/e2e/login.cy.js` segue o modelo do guia:

- abre a tela inicial do Sauce Demo;
- valida que o campo de usuario esta visivel;
- preenche usuario e senha;
- clica no botao de login;
- confirma o redirecionamento para `/inventory.html`.

Os dados de login ficam em `cypress/fixtures/usuarios.json` para evitar espalhar credenciais pelo teste.

## Fluxo base recomendado

O arquivo `cypress/e2e/fluxo-compra.cy.js` mostra um fluxo E2E mais completo e serve como modelo para criar seus proximos testes.

Ele segue esta cadeia:

1. O script do `package.json` chama o Cypress.
2. O Cypress carrega `cypress.config.js`.
3. O `support/e2e.js` roda antes dos testes e importa `commands.js`.
4. O teste em `e2e/` chama comandos customizados.
5. Os comandos usam seletores estaveis e executam as interacoes.
6. Os dados de entrada vem dos arquivos em `fixtures/`.

Rode somente esse fluxo:

```bash
npm run cypress:run:fluxo
```

Rode somente o primeiro teste de login:

```bash
npm run cypress:run:login
```

### Exemplo do mecanismo

No teste, a intencao fica legivel:

```js
cy.loginSauceDemo(usuarioPadrao)
cy.adicionarProdutoAoCarrinho('Sauce Labs Backpack')
cy.abrirCarrinho()
cy.preencherCheckout(clientePadrao)
```

A implementacao dos cliques e preenchimentos fica em `cypress/support/commands.js`. Isso evita repetir o mesmo passo em varios arquivos de teste.

## Boas práticas

- Teste fluxos de usuário, não detalhes internos de implementação.
- Use seletores estáveis. No Sauce Demo, o proprio site fornece atributos `data-test`.
- Evite depender de textos que mudam muito, classes CSS geradas ou estrutura visual frágil.
- Deixe cada teste independente: limpe sessão, cookies e dados necessários antes de começar.
- Prefira poucos testes E2E bem escolhidos a muitos testes lentos e repetidos.
- Cubra com E2E os fluxos criticos: login, navegacao principal, criacao/edicao de registros importantes e permissoes.
- Use mocks ou dados controlados quando integrações externas tornarem o teste instável.
- Não use `cy.wait(5000)` como estratégia padrão; prefira esperar por elementos, URLs ou requisições.
- Não coloque senhas reais, tokens ou dados sensíveis no repositório.
- Rode `npm run cypress:run` antes de abrir merge request ou entregar uma mudança grande.
- Nomeie arquivos por funcionalidade ou jornada: `login.cy.js`, `fluxo-compra.cy.js`, `clientes.cy.js`.
- Coloque dados reaproveitaveis em `fixtures`, nao dentro do corpo do teste.
- Coloque passos repetidos em comandos customizados, mas mantenha as assercoes principais no teste.
- Evite criar comandos grandes demais; um comando deve representar uma acao clara do usuario.
- Use `beforeEach` para limpeza de estado comum, como cookies e local storage.

## Convencao recomendada para seletores

Em projetos proprios, adicione atributos especificos para teste nos elementos importantes:

```jsx
<button data-cy="login-submit">Entrar</button>
```

No Cypress:

```js
cy.get('[data-cy="login-submit"]').click()
```

Essa convencao deixa os testes mais resistentes a mudancas de layout e estilo.

## Proximos passos

1. Abrir o Cypress com `npm run cypress:open`.
2. Selecionar `E2E Testing`.
3. Escolher o navegador.
4. Executar o arquivo `login.cy.js`.
5. Depois que o ambiente estiver validado, criar novos testes apenas para fluxos importantes.
