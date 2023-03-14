// Function to create tables in the database

import Empleados from "./models/empleados.model.js";

// Create Empledos table
const createEmpleadosTable = async () => {
  try {
    // await sequelize.authenticate();
    await Empleados.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

createEmpleadosTable();
