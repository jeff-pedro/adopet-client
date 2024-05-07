describe("GET /api/users", () => {
  before(function () {
    cy.database("users", null, { log: false })
      .then(({ email, password }) => {
        cy.login(email, password);
      })
      .then(() => {
        const str = localStorage.token;
        this.authorization = `bearer ${str.slice(1, str.length - 1)}`;
      });
  });

  it("gets a list of users", function () {
    cy.request({
      url: `${Cypress.env("API_URL")}/api/users`,
      method: "GET",
      headers: { authorization: this.authorization },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).length.to.be.greaterThan(1);
    });
  });
});
