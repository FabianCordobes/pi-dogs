// Importamos los modelos Dog y Temperament desde '../models'.
const { Dog, Temperament } = require('../db');

// Importamos las variables de configuración URL y API_KEY desde '../utils/config'.
const { URL, API_KEY } = require('../utils/config');

// Importamos la librería axios para hacer solicitudes HTTP.
const axios = require('axios');

// Función para obtener todos los perros desde la API y la base de datos.
const getAllDogs = async () => {
	// Hacemos una solicitud HTTP a la API de perros.
	let apiData = await axios.get(URL + '?api_key=' + API_KEY);

	// Mapeamos los datos de la API a un formato más manejable.
	const dogsAPI = apiData.data.map((dog) => ({
		id: dog.id,
		name: dog.name,
		image: dog.image.url,
		minHeight: parseInt(dog.height.metric.split('-')[0]),
		maxHeight: parseInt(dog.height.metric.split('-')[1]),
		minWeight: parseInt(dog.weight.metric.split('-')[0]),
		maxWeight: parseInt(dog.weight.metric.split('-')[1]),
		minLifeSpan: parseInt(dog.life_span.split('-')[0]),
		maxLifeSpan: parseInt(dog.life_span.split('-')[1]),
		Temperaments: dog.temperament?.split(', '), // Temperamentos separados por comas
		breed_group: dog.breed_group,
		db: false, // Indicamos que estos datos no están en la base de datos
	}));

	// Obtenemos los datos de perros desde la base de datos.
	let dbData = await Dog.findAll({
		include: {
			model: Temperament,
			through: { attributes: [] },
			attributes: ['name'],
		},
	});

	// Procesamos los datos de la base de datos para que tengan un formato similar al de la API.
	dbData = dbData?.map((dog) => {
		let mappedDog = {
			...dog.dataValues,
			Temperaments: dog.dataValues.temperaments.map((t) => t.name),
		};
		delete mappedDog.temperaments; // Eliminamos la propiedad temperaments para evitar duplicados
		return mappedDog;
	});

	// Combinamos los datos de la API y la base de datos en un solo arreglo.
	const allDogs = [...dogsAPI, ...dbData];

	return allDogs;
};

// Función para obtener perros por nombre.
const getDogsByName = async (name) => {
	const allDogs = await getAllDogs();

	// Filtramos los perros cuyo nombre incluye el nombre proporcionado, sin importar mayúsculas o minúsculas.
	const breedsByName = await allDogs.filter((breed) => {
		return breed.name.toLowerCase().includes(name.toLowerCase());
	});

	// Si no se encontraron razas con el nombre proporcionado, lanzamos un error.
	if (!breedsByName.length) throw new Error(`Dog not found`);

	return breedsByName;
};

// Función para obtener perros por ID.
const getDogsByID = async (id) => {
	const allDogs = await getAllDogs();

	// Filtramos los perros cuyo ID coincide con el ID proporcionado.
	const breedsByID = allDogs.filter((breed) => {
		return breed.id == id;
	});

	// Si no se encontraron razas con el ID proporcionado, lanzamos un error.
	if (!breedsByID.length) throw new Error(`Dog not found`);

	return breedsByID;
};

// Función para crear un nuevo perro en la base de datos.
const createDog = async (
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
) => {
	let dogs = await getAllDogs();

	// Verificamos si el perro ya existe en la base de datos o la API.
	let foundDog = dogs.find((dog) => dog.name.toLowerCase() === name.toLowerCase());

	// Si el perro ya existe, lanzamos un error.
	if (foundDog) throw new Error(`The breed ${name} already exists`);

	// Creamos el nuevo perro en la base de datos.
	const newDog = await Dog.create({
		name,
		image,
		minHeight,
		maxHeight,
		minWeight,
		maxWeight,
		minLifeSpan,
		maxLifeSpan,
		breed_group,
	});

	// Asociamos los temperamentos al nuevo perro.
	await newDog.addTemperaments(temperaments);

	// Obtenemos los temperamentos del perro y los devolvemos junto con los demás datos.
	let dog = await Dog.findByPk(newDog.id);
	let dogTemperaments = await dog.getTemperaments();
	let temperamentsNames = dogTemperaments.map((temperament) => temperament.name);

	return { ...dog.toJSON(), temperaments: temperamentsNames };
};

// Función para filtrar perros por temperamento.
const breedsFilteredByTemp = async (temperament) => {
	let dogs = await getAllDogs();
	console.log(temperament);
	console.log(dogs);
	return dogs.filter((dog) => dog.temperament.some((temp) => temperament.includes(temp)));
};

const deleteDog = async (id) => {};

// Exportamos todas las funciones para que estén disponibles en otros módulos.
module.exports = {
	getAllDogs,
	getDogsByName,
	getDogsByID,
	createDog,
	breedsFilteredByTemp,
};
