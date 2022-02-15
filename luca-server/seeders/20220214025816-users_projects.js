'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_projects', [
      {
        id: 1,
        userId: 1,
        projectId: 1
      },
      {
        id: 2,
        userId: 2,
        projectId: 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_projects', null, {});
  }
};