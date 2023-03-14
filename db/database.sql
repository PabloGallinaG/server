-- INSTRUCTIONS: Run this file in your MySQL server to create the database and tables. --
CREATE DATABASE IF NOT EXISTS companydb;

use Evaluacion_Test;

CREATE TABLE empleados (
  id INT PRIMARY KEY IDENTITY (1, 1),
  primer_nombre VARCHAR(60) NOT NULL,
  segundo_nombre VARCHAR(60) DEFAULT NULL,
  primer_apellido VARCHAR(60) NOT NULL,
  segundo_apellido VARCHAR(60) DEFAULT NULL,
  direccion VARCHAR(60) DEFAULT NULL,
  fecha_nacimiento DATE NOT NULL,
  dpi VARCHAR(20) NOT NULL,
  nit VARCHAR(20) NOT NULL,
  cantidad_hijos INT NOT NULL,
  correo VARCHAR(60) NOT NULL,
  municipio VARCHAR(60) NOT NULL,
  departamento VARCHAR(60) NOT NULL,
  salario INT NOT NULL,
  puesto VARCHAR(60) NOT NULL,
  activo BIT NOT NULL DEFAULT '1',
);
