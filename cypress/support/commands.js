/// <reference types="cypress" />

Cypress.Commands.add("getBySel", (selector) => {
  return cy.get(`[data-test="${selector}"]`);
});

Cypress.Commands.add("login", ({ email, password }) => {
  cy.session(
    email,
    () => {
      cy.visit("/login");
      cy.getBySel("email").type(email);
      cy.getBySel("password").type(`${password}{enter}`, { log: false });
      cy.url().should("include", "/home");
    },
    {
      validate: () => {
        cy.getAllLocalStorage().then((localStorage) => {
          expect(Object.values(localStorage)[0]).to.have.property("token");
        });
      },
    },
  );
});
