// Importamos los controladores para perros y temperamentos.
const controllerDogs = require("./controller_dogs");
const controllerTemperaments = require("./controller_temperaments");

// Exportamos un objeto que contiene los controladores.
module.exports = {
  controllerDogs,
  controllerTemperaments,
};
