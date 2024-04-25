describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/home");
  });

  it("should show login button in the header section", () => {
    cy.getBySel("sidenav-user").should("exist").click();
    cy.getBySel("sidenav-user-login").should("exist").click();
    cy.url().should("include", "/login");
  });

  it("should show all pets available", () => {
    cy.intercept("GET", "/api/pets", (req) => {
      delete req.headers["if-none-match"];
    }).as("allPets");

    cy.wait("@allPets").its("response.statusCode").should("equal", 200);
  });
});
