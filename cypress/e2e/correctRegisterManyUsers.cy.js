import Register from "../support/pages/register/registerPage";

describe("Register page", () => {
  const users = require("../fixtures/users.json");

  users.forEach(({ name, email, password }) => {
    it(`fills out a form and register the user ${name}`, () => {
      Register.accessPage();
      Register.fillTheForm(name, email, password, password);
      Register.submit();
    });
  });
});
