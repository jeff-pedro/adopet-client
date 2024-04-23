describe("Login Page", () => {
  let user;

  before(() => {
    // create a random user
    cy.task("createUser").as("currentUser");

    cy.get("@currentUser").then((result) => {
      user = result;
    });

    // create a new user via API
    cy.get("@currentUser").then((user) => {
      cy.request("POST", `http://${Cypress.env("api_server")}/api/tutors`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });
    });
  });

  beforeEach(() => {
    cy.visit("/login");
  });

  context("Happy Path 🥳", () => {
    it("should login to a user", () => {
      cy.login(user);
    });

    it("should verify the register link", () => {
      cy.getBySel("register-form").click();
      cy.url().should("include", "/cadastro");
    });

    it.skip("verifies forgot password link", () => {
      /* code here */
    });
  });

  context("Unhappy Path 😥", () => {
    it("should try to login a user with empty fields", () => {
      cy.getBySel("btn-login").click();

      cy.contains("É necessário informar um endereço de email").should(
        "be.visible",
      );
      cy.contains("Insira sua senha").should("be.visible");
    });

    it("should provide incorrect password complexity requirements", () => {
      cy.getBySel("password").type(`123{enter}`);

      cy.contains(
        "A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres",
      ).should("be.visible");
    });

    it("should provide an invalid password", () => {
      cy.getBySel("email").type(user.email);
      cy.getBySel("password").type(`Wrong123!{enter}`);

      cy.contains("Invalid email or password.").should("be.visible");
    });

    it("should provide an email that does not exist", () => {
      cy.getBySel("email").type("wrong@mail.com");
      cy.getBySel("password").type(`${user.password}{enter}`);

      cy.contains("This user not exist.").should("be.visible");
    });

    it.skip("should inform an email that already taken", () => {
      // code here
    });
  });
});
