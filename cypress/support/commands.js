/// <reference types="cypress" />

import Login from "./pages/login/loginPage";

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test="${selector}"]`);
});

Cypress.Commands.add("login", (email, password) => {
  Login.accessPage();
  Login.fillTheForm(email, password);
  Login.submitForm();
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
