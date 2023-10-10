// Importamos el controlador de perros y la función de validación de campos
const { controllerDogs } = require('../controllers');
const { validateDogCreationFields } = require('../utils/validations');
const { Dog } = require('../models');

// Controlador para obtener perros.
const getDogs = async (req, res) => {
	try {
		// Obtiene el parámetro 'name' de la solicitud si está presente.
		const { name } = req.query;
		if (name) {
			// Si se proporciona el parámetro 'name', obtenemos perros por nombre
			const dogsName = await controllerDogs.getDogsByName(name);
			res.status(200).json(dogsName);
		} else {
			// Si no se proporciona 'name', obtenemos todos los perros.
			const allDogs = await controllerDogs.getAllDogs();
			res.status(200).json(allDogs);
		}
	} catch (error) {
		// Manejo de errores: Verifica si el error es 404 (No encontrado) o 500 (Error interno del server).
		let status;
		if (error.message.startsWith('There')) {
			status = 404;
			res.status(status).json({ error: error.message });
		} else {
			status = 500;
			res.status(status).json({ error: error.message });
		}
	}
};

// Controlador para obtener un perro por ID.
const getDogsById = async (req, res) => {
	try {
		// Obtiene el parámetro 'id' de la solicitud.
		const id = req.params.id;
		// console.log(id);
		if (id) {
			// Si se proporciona el id, obtenemos el perro por su ID..
			const dog = await controllerDogs.getDogsByID(id);
			if (!dog.length) return res.status(404).json(`Dog not found`);
			return res.status(200).json(dog);
		} else {
			// Si no se proporciona el id, responde con un error 400 (solicitud incorrecta)
			return res.status(400).json('missing id');
		}
	} catch (error) {
		// Manejo de errores: Si ocurre un error, responde con un error 500
		res.status(500).json({ error: error.message });
	}
};

const getDogsByName = async (req, res) => {
	try {
		const name = req.query.name; // Accede correctamente al parámetro de consulta 'name'.

		if (name) {
			const dog = await controllerDogs.getDogsByName(name);
			if (!dog.length) return res.status(404).json('Dog not found');
			return res.status(200).json(dog);
		} else {
			return res.status(400).json('missing name');
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controlador para crear un nuevo perro.
const postDog = async (req, res) => {
	try {
		// Obtiene los campos del cuerpo de la solicitud.
		const {
			name,
			image,
			minHeight,
			maxHeight,
			minWeight,
			maxWeight,
			minLifeSpan,
			maxLifeSpan,
			temperaments,
			breed_group,
		} = req.body;

		// Valida los campos del perro utilizando la funcion de validacion
		validateDogCreationFields(req.body);

		try {
			// Intenta crear un nuevo perro utilizando el controlador.
			let newDog = await controllerDogs.createDog(
				name,
				image,
				minHeight,
				maxHeight,
				minWeight,
				maxWeight,
				minLifeSpan,
				maxLifeSpan,
				temperaments,
				breed_group
			);

			res.status(201).json(newDog); // Responde con un codigo 201 (creado) y el nuevo perro creado
		} catch (error) {
			// Capturar el error cuando el perro ya existe
			if (error.message.startsWith('The')) {
				res.status(400).json('Name already exists in the database'); // Responde con un error 400 (solicitud incorrecta) con un mensaje
			} else {
				throw error; // Relanzar cualquier otra excepción no esperada
			}
		}
	} catch (error) {
		// Manejo de errores: Si ocurre un error, responde con un error 500
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

const deleteDog = async (req, res) => {
	const { id } = req.params;
	// console.log(id);
	if (id.length < 30) res.json('ID must be a dog from the database');
	try {
		const dog = await Dog.findOne({ where: { id } });
		// console.log(pokemon);
		if (dog) {
			await dog.destroy();
			return res.json('Dog deleted').status(200);
		} else {
			return res.json('Dog not found').status(404);
		}
	} catch (error) {
		console.log(error);
	}
};

// Controlador para obtener perros filtrados por temperamento.
const getBreedsFilteredByTemp = async (req, res) => {
	try {
		// Obtenemos el parametro 'temperament' de la solicitud.
		const { temperament } = req.query;
		const dogs = await controllerDogs.breedsFilteredByTemp(temperament);
		res.status(200).json(dogs);
	} catch (error) {
		// Manejo de errores: Si ocurre un error, responde con un error 500
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getDogs,
	getDogsById,
	getDogsByName,
	postDog,
	getBreedsFilteredByTemp,
	deleteDog,
};
