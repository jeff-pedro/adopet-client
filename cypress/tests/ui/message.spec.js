describe("Message Form", () => {
  beforeEach(() => {
    cy.database("users").then((user) => {
      cy.login(user.email, user.password);
    });

    // navigate to message form
    cy.visit("/home", { log: false });
    cy.getBySel("sidenav-message").click();
  });

  it("should display user profile form errors", () => {
    cy.getBySelLike("name-input").clear().blur();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "É necessário informar seu nome");

    cy.getBySelLike("name-input")
      .type("Sparro" + "w".repeat(35))
      .blur();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "O número máximo de caracteres é 40");

    cy.getBySelLike("phone-input").clear().blur();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "Informe um número de telefone");

    cy.getBySelLike("phone-input").type("123").blur();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "Por favor, verifique o número digitado");

    cy.getBySelLike("petName-input").clear().blur();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "É necessário informar o nome do animal");

    cy.getBySelLike("petName-input")
      .type("Cool Pet Name For the Dog You Will Love!")
      .blur();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "O número máximo de caracteres é 25");

    cy.getBySelLike("text-input").clear().blur();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "É necessário escrever uma mensagem");

    cy.getBySelLike("text-input")
      .type("So cute" + "!".repeat(500) + "🥰")
      .blur();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "O número máximo de caracteres é 500");
  });

  it("sends a message form", function () {
    cy.location("pathname").should("equal", "/mensagem");

    cy.getBySelLike("name-input").type("Jack");
    cy.getBySelLike("phone-input").type("55912343214");
    cy.getBySelLike("petName-input").type("Cosmo");
    cy.getBySelLike("message-text-input").type(
      "I have adopet this cute little dog.",
    );

    cy.getBySelLike("submit").click();
  });
});
