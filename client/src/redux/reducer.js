import {
	GET_DOGS,
	GET_TEMPERAMENTS,
	GET_DOG_DETAILS,
	GET_DOG_BY_NAME,
	CLEAR_DOG_DETAILS,
	DELETE_DOG,
	FILTER_BY_ORIGIN,
	FILTER_BY_TEMP,
	SORT_BY,
	RESET_FILTERS,
} from './actionType'; // Importa los tipos de acciones desde el archivo 'actionType'

// Estado inicial de la aplicación
const initialState = {
	dogs: [], // Almacena la lista de razas de perros
	auxDogs: [], // Almacena una copia auxiliar de la lista de razas de perros
	temperaments: [], // Almacena la lista de temperamentos
	detailDog: {}, // Almacena los detalles de un perro
	msg: '', // Almacena mensajes de estado
};

// Reducer que maneja el estado de la aplicación
export default function reducer(state = initialState, action) {
	const { payload, type } = action; // Desestructura el tipo y los datos de la acción

	switch (type) {
		case RESET_FILTERS:
			// Acción para restablecer los filtros
			return {
				...state,
				dogs: state.auxDogs, // Restablece la lista de razas de perros a su estado auxiliar original
			};

		case GET_DOGS:
			// Acción para obtener la lista de razas de perros
			return {
				...state,
				dogs: payload, // Actualiza la lista de razas de perros con los datos recibidos
				auxDogs: payload, // Actualiza la lista auxiliar de razas de perros con los mismos datos
			};

		case GET_TEMPERAMENTS:
			// Acción para obtener la lista de temperamentos
			return {
				...state,
				temperaments: payload, // Actualiza la lista de temperamentos
			};

		case FILTER_BY_ORIGIN:
			// Acción para filtrar razas de perros por origen
			const allDogsByOrigin = state.auxDogs; // Obtiene todas las razas desde la lista auxiliar
			let originFiltered;

			if (payload === 'All') originFiltered = allDogsByOrigin; // Si el filtro es "All," muestra todas las razas
			if (payload === 'API')
				originFiltered = allDogsByOrigin.filter((dog) => typeof dog.id === 'number'); // Filtra las razas de la API
			if (payload === 'Created')
				originFiltered = allDogsByOrigin.filter((dog) => dog.id.toString().length > 30); // Filtra las razas creadas localmente

			if (originFiltered.length) {
				// Si hay razas después de aplicar el filtro
				return {
					...state,
					dogs: originFiltered, // Actualiza la lista de razas de perros
					msg: '', // Restablece el mensaje de estado
				};
			} else {
				// Si no hay razas después del filtro
				return {
					...state,
					msg: 'There are no created dog yet', // Muestra un mensaje de estado
				};
			}

		case FILTER_BY_TEMP:
			// Acción para filtrar razas de perros por temperamento
			const allDogsByTemp = state.auxDogs; // Obtiene todas las razas desde la lista auxiliar
			let tempFiltered;

			if (payload === 'All') tempFiltered = allDogsByTemp; // Si el filtro es "All," muestra todas las razas
			if (payload !== 'All')
				tempFiltered = allDogsByTemp.filter((dog) => dog.Temperaments?.includes(payload)); // Filtra las razas por temperamento

			if (tempFiltered.length) {
				// Si hay razas después de aplicar el filtro
				return {
					...state,
					dogs: tempFiltered, // Actualiza la lista de razas de perros
					msg: '', // Restablece el mensaje de estado
				};
			} else {
				// Si no hay razas después del filtro
				return {
					...state,
					msg: 'There are no loaded dog of the selected temp', // Muestra un mensaje de estado
				};
			}

		case SORT_BY:
			// Acción para ordenar la lista de razas de perros
			const dogSorted = state.dogs.slice(); // Crea una copia de la lista de razas para ordenar
			let orderBy;

			// Aplica diferentes métodos de ordenamiento según el filtro recibido
			if (payload === 'A-Z') {
				orderBy = dogSorted.sort((a, b) => (a.name > b.name ? 1 : -1)); // Ordena alfabéticamente de A a Z
			} else if (payload === 'Z-A') {
				orderBy = dogSorted.sort((a, b) => (a.name < b.name ? 1 : -1)); // Ordena alfabéticamente de Z a A
			} else if (payload === 'weight-asc') {
				orderBy = dogSorted.sort((a, b) => a.minWeight - b.minWeight); // Ordena por peso ascendente
			} else if (payload === 'weight-desc') {
				orderBy = dogSorted.sort((a, b) => b.maxWeight - a.maxWeight); // Ordena por peso descendente
			} else if (payload === 'height-asc') {
				orderBy = dogSorted.sort((a, b) => a.minHeight - b.minHeight); // Ordena por altura ascendente
			} else if (payload === 'height-desc') {
				orderBy = dogSorted.sort((a, b) => b.maxHeight - a.maxHeight); // Ordena por altura descendente
			} else if (payload === 'lifeSpan-asc') {
				orderBy = dogSorted.sort((a, b) => a.minLifeSpan - b.minLifeSpan); // Ordena por vida útil ascendente
			} else if (payload === 'lifeSpan-desc') {
				orderBy = dogSorted.sort((a, b) => b.maxLifeSpan - a.maxLifeSpan); // Ordena por vida útil descendente
			}

			return {
				...state,
				dogs: orderBy, // Actualiza la lista de razas de perros ordenada
			};

		case GET_DOG_DETAILS:
			// Acción para obtener los detalles de un perro
			return {
				...state,
				detailDog: payload, // Actualiza los detalles del perro con los datos recibidos
			};

		case CLEAR_DOG_DETAILS:
			// Acción para borrar los detalles de un perro
			return {
				...state,
				detailDog: {}, // Restablece los detalles del perro a un objeto vacío
			};

		case GET_DOG_BY_NAME:
			// Acción para buscar un perro por nombre
			return {
				...state,
				detailDog: payload, // Actualiza los detalles del perro con los datos del perro encontrado
			};

		case DELETE_DOG:
			// Acción para eliminar un perro
			return {
				...state,
				dogs: state.dogs.filter((dog) => dog.id !== payload), // Filtra la lista de perros, excluyendo el perro eliminado
			};

		default:
			return state; // Devuelve el estado sin cambios si la acción no coincide con ningún caso
	}
}
