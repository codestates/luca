const config = require('./index.js');
const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT } = config;

module.exports = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: 'luca_database',
    host: DATABASE_HOST,
    dialect: 'mysql',
    port: DATABASE_PORT,
  },
  production: {
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: 'luca_database',
    host: DATABASE_HOST,
    dialect: 'mysql',
    port: DATABASE_PORT,
  },
};


