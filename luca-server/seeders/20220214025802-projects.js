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
        createdAt: '2022-02-19',
        updatedAt: '2022-02-22'
      },
      {
        id: 2,
        title: 'codejunckies',
        desc: '새로운 프로젝트 구상',
        isTeam: true,
        admin: 2,
        createdAt: '2022-02-20',
        updatedAt: '2022-02-21'
      },
      {
        id: 3,
        title: 'kim',
        desc: '개인 프로젝트 구상',
        isTeam: false,
        admin: 1,
        createdAt: '2022-02-17',
        updatedAt: '2022-02-31'
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', null, {});
  }
};
