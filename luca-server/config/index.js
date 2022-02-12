const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    SERVER_PORT: process.env.SERVER_PORT,
};