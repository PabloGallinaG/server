// model for empleados
import { Sequelize } from "sequelize";
import { sequelize } from "../db.js";

const Empleados = sequelize.define(
  "Empleados",
  {
    EmpleadoID: {
      // type: Sequelize.UUID,
      // allowNull: false,
      // unique: true,
      // primaryKey: true,
      // autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    primer_nombre: Sequelize.STRING,
    segundo_nombre: Sequelize.STRING,
    primer_apellido: Sequelize.STRING,
    segundo_apellido: Sequelize.STRING,
    direccion: Sequelize.STRING,
    fecha_nacimiento: Sequelize.DATEONLY,
    dpi: Sequelize.STRING,
    nit: Sequelize.STRING,
    cantidad_hijos: Sequelize.INTEGER,
    correo: Sequelize.STRING,
    municipio: Sequelize.STRING,
    departamento: Sequelize.STRING,
    salario: Sequelize.INTEGER,
    activo: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },

  {
    timestamps: false,
  }
);

export default Empleados;
