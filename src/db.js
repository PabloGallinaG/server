import { DataTypes, Op, Sequelize } from "sequelize";

import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";

// export const configDB = {
//   user: DB_USER,
//   password: DB_PASSWORD,
//   server: "10.192.0.4\\DEV", // You can use 'localhost\\instance' to connect to named instance
//   database: DB_DATABASE,
// };

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mssql",
  dialectOptions: {
    requestTimeout: 300000,
    options: {
      useUTC: true,
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
  timezone: "-06:00",
});

// exports.DataTyoes = DataTypes;
// exports.sequelize = sequelize;
// exports.Op = Op;

export { DataTypes, sequelize, Op };
