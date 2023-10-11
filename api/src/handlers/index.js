// Importamos los controladores de perros y temperamentos.
const handlersDogs = require("./handler_dogs");
const handlersTemperaments = require("./handler_temperaments");

// Exportamos los handlers como un objeto para que estén disponibles en otros módulos.
module.exports = {
  handlersDogs,
  handlersTemperaments,
};
