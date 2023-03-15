import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "../config.js";
import { sequelize } from "../db.js";
import Empleados from "../models/empleados.model.js";
import Puestos from "../models/puestos.model.js";
import PuestosEmpleado from "../models/puesto_empleado.model.js";

export const configDB = {
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  server: DB_HOST, // You can use 'localhost\\instance' to connect to named instance
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleados.findAll({
      where: {
        activo: true,
      },
    });

    res.json(empleados);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    // get empleado by id and include puesto_empleado
    const empleado = await Empleados.findOne({
      where: {
        EmpleadoID: id,
        activo: true,
      },
      // include: {
      //   model: PuestosEmpleado,
      //   as: "puestos",
      //   attributes: ["PuestosID", "EmpleadoID"],
      // },
    });

    const puestos = await PuestosEmpleado.findAll({
      where: {
        EmpleadoID: id,
      },
      include: Puestos,
    });

    const puestosEmpleados = puestos.map((puesto) => {
      const puesto_json = puesto.toJSON();
      return {
        value: puesto_json.Puesto.PuestosID,
        label: puesto_json.Puesto.nombre,
      };
    });

    if (!empleado) {
      return res.status(404).json({ message: "Employee not found" });
    }

    console.log("puestosEmpleados", puestosEmpleados);

    const empleado_json = empleado.toJSON();
    empleado_json.puestos = puestosEmpleados;
    console.log("empleado_json", empleado_json);

    res.json(empleado_json);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmpleado = async (req, res) => {
  // update activo = 0
  try {
    const { id } = req.params;

    const empleado = await Empleados.findOne({
      where: {
        EmpleadoID: id,
        activo: true,
      },
    });

    if (!empleado) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await empleado.update({ activo: false });

    res.json({ message: "Employee deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createEmpleado = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      fecha_nacimiento,
      dpi,
      nit,
      cantidad_hijos,
      correo,
      municipio,
      departamento,
      salario,
      puestos,
    } = req.body;

    const empleado = await Empleados.create({
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      fecha_nacimiento,
      dpi,
      nit,
      cantidad_hijos,
      correo,
      municipio,
      departamento,
      salario,
      puestos,
    });

    // bulk create to puestos_empleados
    const puestos_empleados = puestos.map((puesto) => {
      return {
        EmpleadoID: empleado.EmpleadoID,
        PuestosID: puesto.value,
      };
    });

    await PuestosEmpleado.bulkCreate(puestos_empleados);

    await t.commit();

    res.json({ message: "Employee created" });
  } catch (error) {
    await t.rollback();

    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateEmpleado = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      fecha_nacimiento,
      dpi,
      nit,
      cantidad_hijos,
      correo,
      municipio,
      departamento,
      salario,
      puestos,
    } = req.body;

    console.log("puestos: ", puestos);

    const empleado = await Empleados.findOne({
      where: {
        EmpleadoID: id,
        activo: true,
      },
    });

    if (!empleado) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await empleado.update({
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      fecha_nacimiento,
      dpi,
      nit,
      cantidad_hijos,
      correo,
      municipio,
      departamento,
      salario,
      puestos,
    });

    await PuestosEmpleado.destroy({
      where: {
        EmpleadoID: id,
      },
    });

    // bulk create to puestos_empleados
    const puestos_empleados = puestos.map((puesto) => {
      return {
        EmpleadoID: empleado.EmpleadoID,
        PuestosID: puesto.value,
      };
    });

    await PuestosEmpleado.bulkCreate(puestos_empleados);

    await t.commit();

    res.json({ message: "Employee updated" });
  } catch (error) {
    console.log(error);
    await t.rollback();
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

// import Sequelize from 'sequelize';
// import { sequelize } from '../dbconn';

// const PuestoEmpleado = sequelize.define('Empleados', {
//     PuestoEmpleadoID: {
//             type: Sequelize.UUID,
//             allowNull: false,
//             unique: true,
//             primaryKey: true
//         },
//         Nombre : Sequelize.STRING
//     },
//     {
//         timestamps: false
//     }
// )

// export default PuestoEmpleado;

// import Sequelize from 'sequelize';
// import { sequelize } from '../dbconn';
// import PuestoEmpleado from './PuestoEmpleado';
// import Estacion from './Estacion';

// const Empleado = sequelize.define('Empleado', {
//     EmpleadoID: {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     CentroCostoID: Sequelize.STRING,
//     EmpleadoAuroraID: {
//         type: Sequelize.INTEGER
//     },
//     PrimerNombre: Sequelize.STRING,
//     SegundoNombre: Sequelize.STRING,
//     PrimerApellido: Sequelize.STRING,
//     SegundoApellido: Sequelize.INTEGER,
//     PuestoEmpleadoID: Sequelize.INTEGER,
//     CorreoElectronico: Sequelize.STRING,
//     NumeroTelefono: Sequelize.STRING,
//     FotoURL: Sequelize.STRING,
//     EstadoID: Sequelize.INTEGER
// }, {
//     timestamps: false
// });

// Empleado.belongsTo(PuestoEmpleado, { foreignKey: "PuestoEmpleadoID" });
// PuestoEmpleado.hasMany(Empleado, {foreignKey: "PuestoEmpleadoID"})
// Empleado.belongsTo(Estacion, { foreignKey: "CentroCostoID" });

// export default Empleado;
