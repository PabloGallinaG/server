// model for puestos
import { Sequelize } from "sequelize";
import { sequelize } from "../db.js";
import Empleados from "./empleados.model.js";
import Puestos from "./puestos.model.js";

const PuestosEmpleado = sequelize.define(
  "PuestosEmpleado",
  {
    PuestosEmpleadoID: {
      // type: Sequelize.UUID,
      // allowNull: false,
      // unique: true,
      // primaryKey: true,
      // autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    EmpleadoID: Sequelize.INTEGER,
    PuestosID: Sequelize.INTEGER,
  },

  {
    timestamps: false,
  }
);

// first create the table without the foreign keys
// then add the foreign keys
PuestosEmpleado.belongsTo(Empleados, {
  foreignKey: "EmpleadoID",
});

PuestosEmpleado.belongsTo(Puestos, {
  foreignKey: "PuestosID",
});

export default PuestosEmpleado;
