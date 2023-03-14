// import { pool } from "../db.js";
import { sequelize } from "../db.js";

export const index = (req, res) => res.json({ message: "welcome to my api" });

export const ping = async (req, res) => {
  // const [result] = await pool.query('SELECT "pong" as result');
  // res.json(result[0]);
  try {
    await sequelize.authenticate();
    res.json({ message: "pong" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Something goes wrong" });
  }
};
