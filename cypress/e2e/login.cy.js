import Login from "../support/pages/login/loginPage";
import { ELEMENTS as el } from "../support/pages/login/elements";

describe("Login Page", () => {
  const { email, password } = Cypress.env();

  beforeEach(() => {
    Login.accessPage();
  });

  context("Happy Path", () => {
    it("login to a user", () => {
      cy.login(email, password);
      cy.location("pathname").should("equal", "/home");
      cy.get(el.homePage).find("p").contains("Nenhum amiguinho disponível! 😢");
    });

    it("verifies register link", () => {
      cy.get(el.registerPage).click();
      cy.url().should("include", "/cadastro");
    });

    it("verifies forgot password link", () => {
      /* code here */
    });
  });

  context("Unhappy Path", () => {
    it("tries to login a user with empty fields", () => {
      Login.submitForm();
      cy.contains("É necessário informar um endereço de email").should(
        "be.visible",
      );
      cy.contains("Insira sua senha").should("be.visible");
    });

    it("provides an incorrect password rule", () => {
      cy.login("john.wick@mail.com", "123");
      cy.contains(
        "A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres",
      ).should("be.visible");
    });

    it("provides an invalid password", () => {
      cy.login("john.wick@mail.com", "Wrong123");
      cy.contains("Invalid email or password.").should("be.visible");
    });

    it("provides an email that does not exist", () => {
      cy.login("wrong@mail.com", "Secret123");
      cy.contains("This user not exist.").should("be.visible");
    });
  });
});
