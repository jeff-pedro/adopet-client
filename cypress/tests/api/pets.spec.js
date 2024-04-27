describe("GET /api/pets", () => {
  it("gets a list of pets", () => {
    cy.request("GET", `${Cypress.env("API_URL")}/api/pets`)
      .its("status")
      .should("equal", 200);
  });
});
