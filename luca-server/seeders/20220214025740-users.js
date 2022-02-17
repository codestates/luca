'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'kim',
        email: 'kim@naver.com',
        password: bcrypt.hashSync('kim', 10),
        isGuest: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'park',
        email: 'park@naver.com',
        password: bcrypt.hashSync('park', 10),
        isGuest: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'lee',
        email: 'lee@gmail.com',
        password: bcrypt.hashSync('lee', 10),
        isGuest: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'jang',
        email: 'jang@gmail.com',
        password: bcrypt.hashSync('jang', 10),
        isGuest: false,
        isSocial: 'Kakao',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
