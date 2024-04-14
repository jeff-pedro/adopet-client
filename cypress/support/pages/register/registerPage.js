import { ELEMENTS as el } from "./elements";

class Register {
  accessPage() {
    cy.visit("http://localhost:3000/");
    cy.get(el.registerPage).click();
  }

  fillTheForm(name, email, password, passwordConfirm) {
    cy.get(el.name).type(name);
    cy.get(el.email).type(email);
    cy.get(el.createPassword).type(password);
    cy.get(el.confirmPassword).type(passwordConfirm);
  }

  submit() {
    cy.get(el.btnRegister).click();
  }
}

export default new Register();
