
## Install Cypress
```
npm install cypress --save-dev
npm run dev
```

## Update cypress.config.js to include baseUrl and projectId:
```
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

```

## Update package.json scripts:
```
    "cypress:open": "cypress open",
    "cypress:run": "cypress run --record"
```

## Run Cypress:
In another terminal:
```
npm run cypress
```

E2E Testing > Chrome > Run E2E Testing in Chrome > Create New Specs > cypress/e2e/app-test.cy.js:
```
describe('First spec file to test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('check the app contains the sentence', () => {
    cy.get('[data-cy=app-heading]').should("contain", 'Vite + React + Cypress');
  })

  it('test the button increment', () => {
    cy.get('[data-cy=app-button]').as('app-button')
    cy.get('@app-button').click();
    cy.get('@app-button').contains("count is 1");
    cy.get('@app-button').click();
    cy.get('@app-button').contains("count is 2");
  })
})
```


## Setup Github Actions:
In the terminal:
```
mkdir .github
mkdir .github/workflows 
touch .github/workflows/main.yml
```

In main.yml:
```
name: Run Cypress Tests
on: [push]
jobs:
  install:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        containers: [1, 2, 3]
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Install modules
        run: npm ci
      - name: Cypress
        uses: cypress-io/github-action@v3
        with:
          browser: chrome
          headless: true
          record: true
          start: npm run dev
          wait-on: http://localhost:5173
```

Go to github repo > Settings > Secrets and variables > Actions > New repository secret > 


```
    parallel: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```