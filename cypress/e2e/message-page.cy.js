describe("Message Page", () => {
  let user;

  before(() => {
    // create a random user
    cy.task("createUser").as("currentUser");

    cy.get("@currentUser").then((result) => {
      user = result;
    });

    // create a new user via API
    cy.get("@currentUser").then((user) => {
      cy.request("POST", `${Cypress.env("api_server")}/api/tutors`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });
    });
  });

  beforeEach(() => {
    cy.login(user);
  });

  it("fills out a message form correctly", () => {
    cy.visit("/mensagem");

    cy.location("pathname").should("equal", "/mensagem");

    cy.getBySel("name").type(user.name);
    cy.getBySel("phone").type(user.phone);
    cy.getBySel("petName").type("Cosmo");
    cy.getBySel("message").type("I have adopet this cute little dog.");

    cy.getBySel("submit-message").click();
  });
});
