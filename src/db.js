import {
  DB_DATABASE,
  // DB_HOST,
  DB_PASSWORD,
  // DB_PORT,
  DB_USER,
} from "./config.js";

export const configDB = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: "10.192.0.4\\DEV", // You can use 'localhost\\instance' to connect to named instance
  database: DB_DATABASE,
};
