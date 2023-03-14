import { Router } from "express";
import {
  createEmpleado,
  deleteEmpleado,
  getEmpleado,
  getEmpleados,
  updateEmpleado,
} from "../controllers/empleados.controller.js";

const router = Router();

// GET all Employees
router.get("/empleados", getEmpleados);

// GET An Employee
router.get("/empleados/:id", getEmpleado);

// DELETE An Employee
router.delete("/empleados/:id", deleteEmpleado);

// INSERT An Employee
router.post("/empleados", createEmpleado);

router.put("/empleados/:id", updateEmpleado);

export default router;
