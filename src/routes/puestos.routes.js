import { Router } from "express";
import {
  createPuesto,
  deletePuesto,
  getPuesto,
  getPuestos,
  updatePuesto,
} from "../controllers/puestos.controller.js";

const router = Router();

// GET all Employees
router.get("/puestos", getPuestos);

// GET An Employee
router.get("/puestos/:id", getPuesto);

// DELETE An Employee
router.delete("/puestos/:id", deletePuesto);

// INSERT An Employee
router.post("/puestos", createPuesto);

router.put("/puestos/:id", updatePuesto);

export default router;
