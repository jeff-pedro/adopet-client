describe("User Profile", () => {
  beforeEach(function () {
    // seed database and login
    cy.database("users", null, { timeout: 50000 }).then((user) => {
      cy.login(user.email, user.password);
    });

    cy.intercept("GET", "/api/users/*").as("getUser");
    cy.intercept("PUT", "/api/users/*").as("updateUser");

    // navigate to profile form
    cy.visit("/home", { log: false });
    cy.getBySel("sidenav-user").click();
    cy.getBySel("sidenav-user-profile").click();
  });

  it("should display user profile form errors in empty fields", () => {
    cy.getBySelLike("name-input").type("Abc").clear().blur();
    cy.getBySel("user-profile-name-input-helper-text")
      .should("be.visible")
      .and("contain", "É necessário informar seu nome");

    cy.getBySelLike("phone-input").type("912341234").clear().blur();
    cy.getBySel("user-profile-phone-input-helper-text")
      .should("be.visible")
      .and("contain", "Informe um número de telefone");
  });

  it("should display an error when an invalid number is passed in the phone field", () => {
    cy.getBySelLike("phone-input").type("123").blur();
    cy.getBySel("user-profile-phone-input-helper-text")
      .should("be.visible")
      .and("contain", "Por favor, verifique o número digitado");
  });

  it("should display an error when the maximum characters allowed in the name field has been exceeded", () => {
    cy.getBySelLike("name-input").type("abc".repeat(40)).blur();
    cy.getBySel("user-profile-name-input-helper-text")
      .should("be.visible")
      .and("contain", "O número máximo de caracteres é 40");
  });

  it("updates name, phone number, city and about", () => {
    cy.getBySelLike("name-input").clear().type("New Name");
    cy.getBySelLike("phone-input").clear().type("11966554477");
    cy.getBySelLike("city-input").clear().type("New City");
    cy.getBySelLike("about-input").clear().type("Something about me.").blur();

    cy.getBySelLike("submit").click();

    cy.wait("@updateUser").its("response.statusCode").should("equal", 200); // PATCH 204?
  });
});
