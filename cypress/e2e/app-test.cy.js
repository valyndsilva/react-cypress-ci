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