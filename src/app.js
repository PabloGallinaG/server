import express from "express";
import morgan from "morgan";
import cors from "cors";

import EmpleadosRoutes from "./routes/empleados.routes.js";
import PuestosRoutes from "./routes/puestos.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/", indexRoutes);
app.use("/api", EmpleadosRoutes);
app.use("/api", PuestosRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
