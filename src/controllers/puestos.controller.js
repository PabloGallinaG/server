import Puestos from "../models/puestos.model.js";

export const getPuestos = async (req, res) => {
  try {
    const puestos = await Puestos.findAll({
      where: {
        activo: true,
      },
    });

    res.json(puestos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getPuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const puesto = await Puestos.findOne({
      where: {
        PuestosID: id,
        activo: true,
      },
    });

    if (!puesto) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(puesto);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deletePuesto = async (req, res) => {
  // update activo = 0
  try {
    const { id } = req.params;

    const puesto = await Puestos.findOne({
      where: {
        PuestosID: id,
        activo: true,
      },
    });

    if (!puesto) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await puesto.update({ activo: false });

    res.json({ message: "Employee deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createPuesto = async (req, res) => {
  try {
    const { nombre } = req.body;

    const puesto = await Puestos.create({
      nombre,
    });

    res.json({ message: "Employee created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updatePuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const puesto = await Puestos.findOne({
      where: {
        PuestosID: id,
        activo: true,
      },
    });

    if (!puesto) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await puesto.update({
      nombre,
    });

    res.json({ message: "Employee updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
