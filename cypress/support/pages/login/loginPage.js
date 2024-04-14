import { ELEMENTS as el } from "./elements";

class Login {
  accessPage() {
    cy.visit("http://localhost:3000/");
    cy.get(el.login).click();
  }

  fillTheForm(email, password) {
    cy.get(el.email).type(email);
    cy.get(el.password).type(password);
  }

  submitForm() {
    cy.get(el.btnLogin).click();
  }
}

export default new Login();
