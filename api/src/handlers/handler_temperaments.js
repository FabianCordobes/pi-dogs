// Importa el controller de temperamentos.
const { controllerTemperaments } = require("../controllers");

// Controller para obtener todos los temperamentos.
let getTemperaments = async (req, res) => {
  try {
	// Obtiene todos los temperamentos utilizando el controller.
    let temperaments = await controllerTemperaments.getAllTemperaments();
    res.status(200).json(temperaments);
  } catch (error) {
	// Manejo de errores: Si ocurre un error, responde con un codigo 500
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTemperaments,
};