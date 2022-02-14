'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cards', [
      {
        id: 1,
        projectId: 1,
        userId: 1,
        content: 'python',
        storage: 'card',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        projectId: 1,
        userId: 2,
        content: 'java',
        parent: 1,
        storage: 'mindmap',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cards', null, {});
  }
};