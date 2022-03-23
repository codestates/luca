import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "luca_database",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  },
  production: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "luca_database",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  },
};

