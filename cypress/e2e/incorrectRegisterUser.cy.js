import Register from "../support/pages/register/registerPage";

describe("Register page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/cadastro");
  });

  it("provides an existing user", () => {
    Register.fillTheForm(
      "John Wick",
      "john.wick@mail.com",
      "John123",
      "John123",
    );

    Register.submit();

    cy.contains("Este e-mail já está em uso").should("be.visible");
  });

  it("tries register with empty form", () => {
    Register.submit();

    cy.contains("É necessário informar seu nome").should("be.visible");
    cy.contains("É necessário informar um endereço de email").should("be.visible",);
    cy.contains("Crie uma senha").should("be.visible");
    cy.contains("Repita a senha criada acima").should("be.visible");
  });

  it("enter a password with incorrect validation rules", () => {
    Register.fillTheForm("John Wick", "john.wick@mail.com", "123", "123");
    Register.submit();
    cy.contains(
      "A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres",
    ).should("be.visible");
  });

  it("types a password that does not match the password confirmation", () => {
    Register.fillTheForm(
      "John Wick",
      "john.wick@mail.com",
      "Swann123",
      "differentPass",
    );
    Register.submit();
    cy.contains("As senhas não batem").should("be.visible");
  });
});
