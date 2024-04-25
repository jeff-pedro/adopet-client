/* eslint-disable cypress/unsafe-to-chain-command */

describe("User Authentication", () => {
  beforeEach(function () {
    cy.task("db:seed", null, { timeout: 50000 });

    cy.task("createUser").then((result) => {
      this.user = result;
    });

    cy.intercept("POST", "/api/tutors").as("signup");
  });

  it("should redirect unauthenticated user to login page", () => {
    cy.visit("/mensagem");
    cy.location("pathname").should("equal", "/login");
  });

  it("should display login errors", () => {
    cy.visit("/mensagem");

    cy.getBySel("login-email").type("test@email.com").clear().blur();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "É necessário informar um endereço de email");

    cy.getBySel("login-password").type("abc").blur();
    cy.get(".error")
      .should("be.visible")
      .and(
        "contain",
        "A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres",
      );

    cy.getBySel("login-password").type("abc").clear().blur();
    cy.get(".error").should("be.visible").and("contain", "Insira sua senha");
  });

  it("should error for an invalid user", () => {
    cy.visit("/login");

    cy.getBySel("login-email").type("invalid@email.com");
    cy.getBySel("login-password").type(`invalidP4$$ord{enter}`, { log: false });

    cy.getBySel("server-error-message")
      .should("be.visible")
      .and("have.text", "Email ou senha inválido");
  });

  it("should allow a visitor to sign-up, login and logout", function () {
    const { name, email, password, phone, city, about } = this.user;

    // Sign-up User
    cy.visit("/");

    cy.getBySel("signup-link").click();
    cy.url().should("include", "/cadastro");

    cy.getBySel("signup-name").type(name);
    cy.getBySel("signup-email").type(email);
    cy.getBySel("signup-pass-create").type(password);
    cy.getBySel("signup-pass-confirm").type(password);
    cy.getBySel("signup-submit").click();
    cy.wait("@signup");

    // Login User
    cy.login(email, password);

    // Check Home
    cy.visit("/home");
    cy.location("pathname").should("equal", "/home");
    cy.contains("Nenhum amiguinho disponível! 😢");

    // Send Message
    cy.getBySel("sidenav-message").click();
    cy.location("pathname").should("equal", "/mensagem");

    cy.getBySel("message-name-input").type(name);
    cy.getBySel("message-phone-input").type(phone);
    cy.getBySel("message-petName-input").type("Chewbacca");
    cy.getBySel("message-text-input").type("I gotta adopt this cute pet 😍");
    cy.getBySel("message-submit").click();

    // Update User Profile
    cy.getBySel("sidenav-user").should("exist").click();
    cy.getBySel("sidenav-user-profile").should("exist").click();
    cy.location("pathname").should("equal", "/perfil");

    cy.getBySel("profile-name-input").type(name);
    cy.getBySel("profile-phone-input").type(phone);
    cy.getBySel("profile-city-input").type(city);
    cy.getBySel("profile-about-input").type(about);

    cy.getBySel("profile-submit").click();
    cy.location("pathname").should("equal", "/home");

    // Logout User
    cy.getBySel("sidenav-user").click();
    cy.getBySel("sidenav-user-logout").click();
    cy.location("pathname").should("equal", "/");

    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage).to.be.empty;
    });
  });
});
