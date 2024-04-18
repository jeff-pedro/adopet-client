const el = require("./elements").ELEMENTS;

class Register {
  accessPage() {
    cy.visit("/cadastro");
  }

  sendForm({ name, email, password }) {
    cy.get(el.name).type(name);
    cy.get(el.email).type(email);
    cy.get(el.createPassword).type(password);
    cy.get(el.confirmPassword).type(`${password}{enter}`);
  }
}

export default new Register();
