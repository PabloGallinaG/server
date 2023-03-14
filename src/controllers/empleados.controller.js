import sql from "mssql";
// import { configDB } from "../db";

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "../config.js";

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
    await sql.connect(configDB);
    const result = await sql.query`SELECT * FROM empleados WHERE activo = 1`;
    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    await sql.connect(configDB);
    const result =
      await sql.query`SELECT * FROM empleados WHERE id = ${id} AND activo = 1`;
    if (result.recordset.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmpleado = async (req, res) => {
  // update activo = 0
  try {
    const { id } = req.params;
    await sql.connect(configDB);
    const result =
      await sql.query`UPDATE empleados SET activo = 0 WHERE id = ${id} AND activo = 1`;
    if (result.rowsAffected.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createEmpleado = async (req, res) => {
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
      puesto,
    } = req.body;
    await sql.connect(configDB);
    const result =
      await sql.query`INSERT INTO empleados (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, fecha_nacimiento, dpi, nit, cantidad_hijos, correo, municipio, departamento, salario, puesto) VALUES (${primer_nombre}, ${segundo_nombre}, ${primer_apellido}, ${segundo_apellido}, ${direccion}, ${fecha_nacimiento}, ${dpi}, ${nit}, ${cantidad_hijos}, ${correo}, ${municipio}, ${departamento}, ${salario}, ${puesto})`;
    if (result.rowsAffected.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateEmpleado = async (req, res) => {
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
      puesto,
    } = req.body;
    await sql.connect(configDB);
    const result =
      // patch
      await sql.query`UPDATE empleados SET primer_nombre = ${primer_nombre}, segundo_nombre = ${segundo_nombre}, primer_apellido = ${primer_apellido}, segundo_apellido = ${segundo_apellido}, direccion = ${direccion}, fecha_nacimiento = ${fecha_nacimiento}, dpi = ${dpi}, nit = ${nit}, cantidad_hijos = ${cantidad_hijos}, correo = ${correo}, municipio = ${municipio}, departamento = ${departamento}, salario = ${salario}, puesto = ${puesto} WHERE id = ${id} AND activo = 1`;
    if (result.rowsAffected.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
