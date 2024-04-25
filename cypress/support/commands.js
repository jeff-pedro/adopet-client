/// <reference types="cypress" />

Cypress.Commands.add("getBySel", (selector) => {
  return cy.get(`[data-test="${selector}"]`);
});

Cypress.Commands.add("login", (email, password) => {
  const loginPath = "/login";

  const log = Cypress.log({
    name: "login",
    displayName: "LOGIN",
    message: [`🔐 Authenticating | ${email}`],
    autoEnd: false,
  });

  cy.intercept("POST", "/api/login").as("loginUser");

  cy.location("pathname", { log: false }).then((currentPath) => {
    if (currentPath !== loginPath) {
      cy.visit(loginPath);
    }
  });

  log.snapshot("before");

  cy.session(email, () => {
    cy.visit(loginPath);
    cy.getBySel("login-email").type(email);
    cy.getBySel("login-password").type(password, { log: false });

    cy.getBySel("login-submit").click();

    cy.wait("@loginUser").then((loginUser) => {
      log.set({
        consoleProps() {
          return {
            email,
            password,
            userId:
              loginUser.response.statusCode !== 401 &&
              loginUser.response.body.user.id,
          };
        },
      });
    });
  });

  log.snapshot("after");
  log.end();
});
