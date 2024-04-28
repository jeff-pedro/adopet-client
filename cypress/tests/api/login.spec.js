describe("POST /api/login", () => {
  beforeEach(function () {
    cy.database("users").then((result) => {
      this.user = result;
    });
  });

  it("logs in a user", function () {
    const { email, password } = this.user;

    cy.request("POST", `${Cypress.env("API_URL")}/api/login`, {
      email,
      password,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("accessToken");
    });
  });
});
