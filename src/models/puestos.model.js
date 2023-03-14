// model for puestos
import { Sequelize } from "sequelize";
import { sequelize } from "../db.js";

const Puestos = sequelize.define(
  "Puestos",
  {
    PuestosID: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    nombre: Sequelize.STRING,
    activo: Sequelize.BOOLEAN,
  },

  {
    timestamps: false,
  }
);

export default Puestos;
