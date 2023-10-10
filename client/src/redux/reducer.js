import {
	GET_DOGS,
	GET_TEMPERAMENTS,
	GET_DOG_DETAILS,
	GET_DOG_BY_NAME,
	CLEAR_DOG_DETAILS,
	CREATE_DOG,
	DELETE_DOG,
	RESET_PAGE,
	FILTER_BY_ORIGIN,
	FILTER_BY_TEMP,
	SORT_BY,
	RESET_FILTERS,
} from './actionType';

// Estado inicial
const initialState = {
	dogs: [],
	auxDogs: [],
	temperaments: [],
	detailDog: {},
	msg: '',
};

// Define un estado inicial para los filtros

export default function reducer(state = initialState, action) {
	const { payload, type } = action; // Desestructurar la acción

	// Switch para manejar diferentes acciones
	switch (type) {
		case RESET_FILTERS:
			return {
				...state,
				dogs: state.auxDogs, // Restablecer la lista de perros a su estado original
			};

		// Reiniciar el número de página
		case RESET_PAGE:
			return {
				...state,
				numPage: 1, // Establecer el número de página en 1
			};

		// Actualizar la lista de pokemones y la lista auxiliar
		case GET_DOGS:
			return {
				...state,
				dogs: payload, // Actualizar la lista de pokemones con los datos recibidos en payload
				auxDogs: payload, // Actualizar la lista auxiliar de pokemones con los mismos datos
			};

		// Actualizar la lista de tipos
		case GET_TEMPERAMENTS:
			return {
				...state,
				temperaments: payload, // Actualizar la lista de tipos con los datos recibidos en payload
			};

		// Filtrar por origen
		case FILTER_BY_ORIGIN:
			// Obtener la lista completa de pokemones
			const allDogsByOrigin = state.auxDogs;
			let originFiltered;

			// Verificar el valor del filtro recibido en 'payload'
			if (payload === 'All') originFiltered = allDogsByOrigin; // Si es 'All', mostrar todos los pokemones
			if (payload === 'API')
				originFiltered = allDogsByOrigin.filter((dog) => typeof dog.id === 'number'); // Si es 'PokeAPI', filtrar por aquellos con ID numérico
			if (payload === 'Created')
				originFiltered = allDogsByOrigin.filter((dog) => dog.id.toString().length > 30); // Si es 'Created', filtrar por aquellos con IDs como cadenas largas

			// Comprobar si se encontraron pokemones después del filtro
			if (originFiltered.length) {
				return {
					...state,
					dogs: originFiltered, // Actualizar la lista de pokemones con los filtrados
					msg: '',
				};
			} else {
				return {
					...state,
					msg: 'There are no created dog yet', // Mensaje si no se encontraron pokemones después del filtro
				};
			}

		// Filtrar por temperamento
		case FILTER_BY_TEMP:
			const allDogsByTemp = state.auxDogs;
			let tempFiltered;

			// Verificar el valor del filtro recibido en 'payload'
			if (payload === 'All') tempFiltered = allDogsByTemp;
			if (payload !== 'All')
				tempFiltered = allDogsByTemp.filter((dog) => dog.Temperaments?.includes(payload));

			if (tempFiltered.length) {
				return {
					...state,
					dogs: tempFiltered,
					msg: '',
				};
			} else {
				return {
					...state,
					msg: 'There are no loaded dog of the selected temp',
				};
			}

		case SORT_BY:
			const dogSorted = state.dogs.slice();
			let orderBy;

			// Verificar el criterio de ordenamiento especificado en 'payload'
			if (payload === 'A-Z') {
				orderBy = dogSorted.sort((a, b) => (a.name > b.name ? 1 : -1)); // Ordenar alfabéticamente de A a Z por nombre
			} else if (payload === 'Z-A') {
				orderBy = dogSorted.sort((a, b) => (a.name < b.name ? 1 : -1)); // Ordenar alfabéticamente de Z a A por nombre
			} else if (payload === 'weight-asc') {
				orderBy = dogSorted.sort((a, b) => a.minWeight - b.minWeight); // Ordenar por peso ascendente
			} else if (payload === 'weight-desc') {
				orderBy = dogSorted.sort((a, b) => b.maxWeight - a.maxWeight); // Ordenar por peso descendente
			} else if (payload === 'height-asc') {
				orderBy = dogSorted.sort((a, b) => a.minHeight - b.minHeight); // Ordenar por altura ascendente
			} else if (payload === 'height-desc') {
				orderBy = dogSorted.sort((a, b) => b.maxHeight - a.maxHeight); // Ordenar por altura descendente
			} else if (payload === 'lifeSpan-asc') {
				orderBy = dogSorted.sort((a, b) => a.minLifeSpan - b.minLifeSpan); // Ordenar por vida útil ascendente
			} else if (payload === 'lifeSpan-desc') {
				orderBy = dogSorted.sort((a, b) => b.maxLifeSpan - a.maxLifeSpan); // Ordenar por vida útil descendente
			}

			return {
				...state,
				dogs: orderBy,
			};

		// Agregar un nuevo pokemon a la lista
		case CREATE_DOG:
			return {
				...state,
				dogs: [...state.dogs, payload], // Agregar el nuevo pokemon a la lista existente
			};

		// Actualizar los detalles del pokemon
		case GET_DOG_DETAILS:
			return {
				...state,
				detailDog: payload, // Actualizar los detalles del pokemon con los datos recibidos en payload
			};

		// Borrar los detalles del pokemon
		case CLEAR_DOG_DETAILS:
			return {
				...state,
				detailDog: {}, // Limpiar los detalles del pokemon (dejarlo vacío)
			};

		// Obtener un pokemon por nombre
		case GET_DOG_BY_NAME:
			return {
				...state,
				detailDog: payload, // Actualizar los detalles del pokemon con los datos recibidos en payload
			};

		// Eliminar un pokemon de la lista
		case DELETE_DOG:
			return {
				...state,
				dogs: state.dogs.filter((dog) => dog.id !== payload), // Filtrar la lista de pokemones para eliminar el pokemon con el ID especificado
			};

		default:
			return state; // Devolver el estado sin cambios si la acción no coincide
	}
}
