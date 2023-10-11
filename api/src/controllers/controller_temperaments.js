// Importamos las dependencias necesarias.
const { Temperament } = require('../db'); // Importamos el modelo Temperament.
const { URL } = require('../utils/config'); // Importamos la URL y otras configuraciones.
const axios = require('axios'); // Importamos la librería axios para hacer solicitudes HTTP.

// Función para cargar temperamentos desde la API a la base de datos.
const chargeTemperamentsToDB = async () => {
	// Realizamos una solicitud para obtener los datos de temperamento desde la URL.
	let dogsAPI = await axios.get(URL);

	// Iteramos sobre los datos de la API.
	dogsAPI.data.forEach((dog) => {
		if (dog.temperament) {
			// Si el perro tiene temperamento, lo dividimos en temperamentos individuales.
			const temps = dog.temperament.split(', ');

			// Itera sobre los temperamentos y los almacena en la base de datos si no existen.
			temps.forEach((temp) =>
				Temperament.findOrCreate({
					where: {
						name: temp,
					},
				})
			);
		}
	});
};

// Función para obtener todos los temperamentos desde la base de datos.
const getAllTemperaments = async () => {
	return await Temperament.findAll();
};

// Exportamos las funciones para que estén disponibles en otros módulos.
module.exports = {
	chargeTemperamentsToDB,
	getAllTemperaments,
};
