// model for puestos
import { Sequelize } from "sequelize";
import { sequelize } from "../db.js";

const Puestos = sequelize.define(
  "Puestos",
  {
    PuestosID: {
      // type: Sequelize.UUID,
      // allowNull: false,
      // unique: true,
      // primaryKey: true,
      // autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: Sequelize.STRING,
    activo: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },

  {
    timestamps: false,
  }
);

export default Puestos;
