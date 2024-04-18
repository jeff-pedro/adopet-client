describe("Initial Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("redirects the 'Cadastrar' link to the registration page", () => {
    cy.getBySel("register-link").should("exist").click();
    cy.url().should("include", "/cadastro");
  });

  it("redirects the 'Fazer login' link to login page", () => {
    cy.getBySel("login-link").should("exist").click();
    cy.url().should("include", "/login");
  });

  it("redirects the home icon to the initial page", () => {
    cy.getBySel("initial-link").should("exist").click();
    cy.url().should("include", "/");
  });

  it("redirects the message icon to the initial page", () => {
    cy.getBySel("message-link").should("exist").click();
    cy.url().should("include", "/");
  });

  it("redirects the button 'Ver pets disponíveis para adoção' to home page", () => {
    cy.getBySel("home-link").should("exist").click();
    cy.url().should("include", "/home");
  });
});
