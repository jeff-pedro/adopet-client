const Register = require("../support/pages/register/registerPage");
const el = require("../support/pages/register/elements").ELEMENTS;

describe("Register Page", () => {
  beforeEach(function () {
    cy.task("seedUsers", 1);

    // create a new user seed file
    cy.fixture("seedUser").then((users) => {
      this.users = users;
    });

    Register.accessPage();
  });

  context("Happy Path 🥳", function () {
    it(`fills out a form and register one user`, function () {
      this.users.forEach((user) => {
        Register.sendForm(user);
      });
    });
  });

  context("Unhappy Path 😥", function () {
    it("provides an existing user", function () {
      Register.sendForm(this.users[0]);
      Register.accessPage();
      Register.sendForm(this.users[0]);

      cy.contains("Este e-mail já está em uso").should("be.visible");
    });

    it("tries register with empty form", () => {
      cy.get(el.btnRegister).click();

      cy.contains("É necessário informar seu nome").should("be.visible");
      cy.contains("É necessário informar um endereço de email").should(
        "be.visible",
      );
      cy.contains("Crie uma senha").should("be.visible");
      cy.contains("Repita a senha criada acima").should("be.visible");
    });

    it("enter a password with incorrect validation rules", function () {
      this.users[0].password = 123;

      Register.sendForm(this.users[0]);

      cy.contains(
        "A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres",
      ).should("be.visible");
    });

    it("types a password that does not match the password confirmation", function () {
      const { name, email, password } = this.users[0];

      cy.get(el.name).type(name);
      cy.get(el.email).type(email);
      cy.get(el.createPassword).type(password);
      cy.get(el.confirmPassword).type(`differentPass{enter}`);

      cy.contains("As senhas não batem").should("be.visible");
    });
  });
});
