
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

## Cypress Dashboard:
https://www.cypress.io/cloud/
Get Started > Create Account > Login with GitHub > Authorize
Projects > New Project > Project Name: react-cypress-ci-github-actions > Project Access: private > Create Project

### Update cypress.config.js:
```
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/",
    projectId: "agrhdh",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

```
Copy the project Id and add it in cypress.config.js > OK I added the project ID > Next > Select provider > Github Actions > Next > Copy the terminal command and paste in terminal

This generates a test video in cypress/videos

If you go to the cypress dashboard > Project settings > Copy Record Key

## Setup Github Actions:
Go to github repo > Settings > Secrets and variables > Actions > New repository secret > Name: CYPRESS_RECORD_KEY > Secret: Record Key Copied from Cypress Dashboard > Add Secret



### To run parallel tests with cypress dashboard update package.json scripts:
```

    "cypress:run": "cypress run --record"
```

### In the terminal:
```
mkdir .github
mkdir .github/workflows 
touch .github/workflows/main.yml
```

### In main.yml:
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
          parallel: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

