describe("Poputate Pets", () => {
  let shelterId;

  beforeEach(function () {
    // login
    cy.database("users", null, { log: false })
      .then(({ email, password }) => {
        cy.login(email, password);
      })
      .then(() => {
        const str = localStorage.token;
        this.authorization = `bearer ${str.slice(1, str.length - 1)}`;
      });
  });

  it("creates one shelter", function () {
    cy.fixture("shelters").then((shelter) => {
      cy.request({
        url: `${Cypress.env("API_URL")}/api/shelters`,
        method: "POST",
        headers: { authorization: this.authorization },
        body: shelter,
      })
        .its("body")
        .then(({ id }) => {
          shelterId = id;
        });
    });
  });

  it(`creates pets`, function () {
    cy.fixture("pets").then((pets) => {
      pets.forEach((pet) => {
        cy.request({
          url: `${Cypress.env("API_URL")}/api/pets`,
          headers: { authorization: this.authorization },
          method: "POST",
          body: {
            shelter_id: shelterId,
            ...pet,
          },
        }).then((res) => {
          expect(res.status).to.be.equal(200);
        });
      });
    });
  });
});
