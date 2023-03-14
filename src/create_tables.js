// Function to create tables in the database

import Empleados from "./models/empleados.model.js";
import Puestos from "./models/puestos.model.js";
import PuestosEmpleado from "./models/puesto_empleado.model.js";

// Create Empledos, Puestos and PuestoEmpleado table
const createEmpleadosTable = async () => {
  try {
    // await sequelize.authenticate();
    // await Empleados.sync({ force: true }); // { force: true } to drop the table if it already exists { alter: true }
    // await Puestos.sync({ force: true });
    await PuestosEmpleado.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

createEmpleadosTable();
