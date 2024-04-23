const Register = require("../support/pages/register/registerPage");

describe("User Journey", () => {
  let user;

  before(() => {
    cy.task("createUser").then((result) => {
      user = result;
    });
  });

  context("Register and Login", () => {
    it("register a new account", () => {
      cy.visit("/");

      //  click on link Register link
      cy.getBySel("register-link").should("exist").click();
      cy.location("pathname").should("equal", "/cadastro");

      cy.intercept({
        method: "POST",
        url: `${Cypress.env("api_server")}/tutors`,
      }).as("registered");

      // Fill out the form and register a user
      Register.sendForm(user);

      cy.wait("@registered")
        .should("have.property", "response")
        .should("have.property", "statusCode", 200);
    });

    it("logs in to the newly created account", () => {
      cy.visit("/login");
      cy.location("pathname").should("equal", "/login");
      cy.login(user);
    });
  });

  context("Logged user", () => {
    beforeEach(() => {
      cy.login(user);
    });

    it("checks the home page", () => {
      cy.visit("/home");
      cy.location("pathname").should("equal", "/home");
      cy.contains("Nenhum amiguinho disponível! 😢");
    });

    it("updates the profile", () => {
      cy.visit("/home");
      cy.getBySel("user-button").should("exist").click();
      cy.getBySel("view-profile").should("exist").click();
      cy.location("pathname").should("equal", "/perfil");

      const { name, phone, city, about } = user;

      // Fill out and submit the profile form
      cy.getBySel("name").type(name);
      cy.getBySel("phone").type(phone);
      cy.getBySel("city").type(city);
      cy.getBySel("about").type(about);

      cy.getBySel("submit-profile").click();

      cy.location("pathname").should("equal", "/home");
    });

    it("sends a message with an adoption intention", () => {
      cy.visit("/home");
      cy.getBySel("message-link").click();
      cy.location("pathname").should("equal", "/mensagem");

      // Fill out and submit the message form
      cy.getBySel("name").type(user.name);
      cy.getBySel("phone").type(user.phone);
      cy.getBySel("petName").type("Chewbacca");
      cy.getBySel("message").type("I gotta adopt this cute pet 😍");

      cy.getBySel("submit-message").click();
    });

    it("logs out the account", () => {
      cy.visit("/home");
      cy.getBySel("user-button").should("exist").click();
      cy.getBySel("logout-button").should("exist").click();
      cy.location("pathname").should("equal", "/");

      cy.getAllLocalStorage().then((localStorage) => {
        expect(localStorage).to.be.empty;
      });
    });
  });
});
