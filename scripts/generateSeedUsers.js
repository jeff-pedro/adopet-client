const path = require("path");
const fs = require("fs");
const { fakerPT_BR: faker } = require("@faker-js/faker");

const createFakeUser = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/),
  phone: faker.helpers.fromRegExp("([1-9]{2})[9?][1-9]{8}"),
  city: faker.location.city(),
  about: faker.person.bio(),
  profilePictureUrl: faker.image.avatar(),
  role: "standard",
});

const createSeedUsers = (numberOfUsers) =>
  faker.helpers.multiple(createFakeUser, {
    count: Number(numberOfUsers),
  });

const saveUsersSeed = (numberOfUsers) => {
  const seedUsers = createSeedUsers(numberOfUsers);
  // write seed users to seedUser.json
  fs.writeFileSync(
    path.join(process.cwd(), "cypress/fixtures/seedUser.json"),
    JSON.stringify(seedUsers),
  );
};

module.exports = {
  createSeedUsers,
  saveUsersSeed,
};
