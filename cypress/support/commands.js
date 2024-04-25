/// <reference types="cypress" />

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test="${selector}"]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add("login", (email, password, logTask = false) => {
  const loginPath = "/login";

  const log = Cypress.log({
    name: "login",
    displayName: "LOGIN",
    message: [`🔐 Authenticating | ${email}`],
    autoEnd: false,
  });

  cy.intercept("POST", "/api/login").as("loginUser");

  cy.location("pathname", { log: logTask }).then((currentPath) => {
    if (currentPath !== loginPath) {
      cy.visit(loginPath, { log: logTask });
    }
  });

  log.snapshot("before");

  cy.session([email, password], () => {
    cy.visit(loginPath);
    cy.getBySelLike("email").type(email);
    cy.getBySelLike("password").type(password, { log: logTask });

    cy.getBySel("login-submit").click();

    cy.wait("@loginUser", { timeout: 50000 }).then((loginUser) => {
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

Cypress.Commands.add("database", (entity, logTask = false) => {
  const params = {
    entity,
  };

  const log = Cypress.log({
    name: "database",
    displayName: "DATABASE",
    message: [`🔎 Seeding within ${entity} data`],
    autoEnd: false,
    consoleProps() {
      return params;
    },
  });

  return cy.task(`${entity}:seed`, null, { log: logTask }).then((data) => {
    log.snapshot();
    log.end();
    return data;
  });
});
