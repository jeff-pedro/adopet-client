const { defineConfig } = require("cypress");
const {
  createSeedUsers,
  saveUsersSeed,
} = require("./scripts/generateSeedUsers");

const { default: axios } = require("axios");

module.exports = defineConfig({
  projectId: "8jd3re",
  env: {
    apiUrl: "localhost:9000",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      const { apiUrl } = config.env;

      on("task", {
        async "db:seed"() {
          const user = createSeedUsers(1)[0];

          const { data } = await axios.post(
            `https://${apiUrl}/api/tutors`,
            user,
          );

          return data;
        },

        async "users:seed"() {
          const user = createSeedUsers(1)[0];

          await axios.post(`https://${apiUrl}/api/tutors`, user);

          return user;
        },

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
