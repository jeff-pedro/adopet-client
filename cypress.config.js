const { defineConfig } = require("cypress");
const {
  createSeedUsers,
  saveUsersSeed,
} = require("./scripts/generateSeedUsers");

module.exports = defineConfig({
  projectId: "8jd3re",
  env: {
    api_server: "localhost:9000",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        createUser() {
          const user = createSeedUsers(1)[0];
          return user;
        },

        seedUsers(numberOfUsers) {
          console.log(numberOfUsers);
          saveUsersSeed(numberOfUsers);
          return null;
        },
      });
    },
  },
});
