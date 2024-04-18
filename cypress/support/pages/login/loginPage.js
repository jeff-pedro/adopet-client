const el = require("./elements").ELEMENTS;

class Login {
  accessPage() {
    cy.visit("/login");
  }

  sendForm(email, password) {
    cy.get(el.email).type(email);
    cy.get(el.password).type(`${password}{enter}`);
  }
}

export default new Login();
