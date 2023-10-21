const { User } = require("../models");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.bulkCreate(
      [
        {
          name: "papa",
          age: 20,
          address: "bogor",
          type: "superadmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "papi",
          age: 42,
          address: "tangerang",
          type: "superadmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "papo",
          age: 20,
          address: "jakarta",
          type: "superadmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    ).then(function (newSuperadmin) {
      const saltRounds = 10;
      return queryInterface.bulkInsert("Auths", [
        {
          email: "papa@gmail.com",
          password:
            "$2a$10$YBdLRjQUf6tevvaPPjoE8usz8NThOWie.Y0nZc5vxHX8ARkb6OIeO",
          confirmPassword:
            "$2a$10$YBdLRjQUf6tevvaPPjoE8usz8NThOWie.Y0nZc5vxHX8ARkb6OIeO",
          userId: newSuperadmin[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "papi@gmail.com",
          password:
            "$2a$10$/6hr/RdXKLjWYEqVQjcS0O.jsXU1GxnZQipMS8mTX0YOeM3YYsika",
          confirmPassword:
            "$2a$10$/6hr/RdXKLjWYEqVQjcS0O.jsXU1GxnZQipMS8mTX0YOeM3YYsika",
          userId: newSuperadmin[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "papo@gmail.com",
          password:
            "$2a$10$2M5Ett7asTU2VWg0D6oYQ.yoME4nXnMp2U4bJhrLF5AHfmXrLQyDG",
          confirmPassword:
            "$2a$10$2M5Ett7asTU2VWg0D6oYQ.yoME4nXnMp2U4bJhrLF5AHfmXrLQyDG",
          userId: newSuperadmin[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
