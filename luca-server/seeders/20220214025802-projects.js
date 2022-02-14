'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects', [
      {
        id: 1,
        title: 'codestates',
        desc: '새로운 컨텐츠 구상',
        isTeam: true,
        admin: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'codejunckies',
        desc: '새로운 프로젝트 구상',
        isTeam: true,
        admin: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'kim',
        desc: '개인 프로젝트 구상',
        isTeam: false,
        admin: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', null, {});
  }
};
