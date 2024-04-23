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
    cy.visit("/perfil");

    cy.location("pathname").should("equal", "/perfil");

    cy.getBySel("name").type(user.name);
    cy.getBySel("phone").type(user.phone);
    cy.getBySel("city").type(user.city);
    cy.getBySel("about").type(user.about);

    cy.getBySel("submit-profile").click();

    cy.url().should("include", "/home");
  });
});
