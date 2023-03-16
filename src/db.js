import { DataTypes, Op, Sequelize } from "sequelize";

import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mssql",
  dialectOptions: {
    requestTimeout: 300000,
    options: {
      useUTC: false,
      timezone: "localtime",
      dateFirst: 1,
      enableArithAbort: false,
      dateStrings: true,
      typeCast: true,
      requestTimeout: 300000,
      instanceName: "DEV",
    },
  },
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
  logging: false,
  // timezone: "-06:00",
});

export { DataTypes, sequelize, Op };
