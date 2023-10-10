import {
	GET_DOGS,
	GET_TEMPERAMENTS,
	CREATE_DOG,
	GET_DOG_DETAILS,
	CLEAR_DOG_DETAILS,
	GET_DOG_BY_NAME,
	DELETE_DOG,
	RESET_PAGE,
	FILTER_BY_ORIGIN,
	FILTER_BY_TEMP,
	SORT_BY,
	RESET_FILTERS,
} from './actionType';

import axios from 'axios';

export const resetFilters = () => {
	return async function (dispatch) {
		try {
			dispatch({ type: RESET_FILTERS }); // Despacha la acción RESET_FILTERS
		} catch (error) {
			console.log(error.message);
		}
	};
};

// Acción para resetear el número de página
export function resetPage() {
	return {
		type: RESET_PAGE,
	};
}

// Acción para obtener la lista de pokemones
export const getDogs = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get('http://localHost:3001/dogs');
			dispatch({
				type: GET_DOGS,
				payload: response.data, // Actualizar la lista de pokemones con los datos recibidos en payload
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para obtener la lista de tipos
export const getTemperaments = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get('http://localHost:3001/temperaments');
			dispatch({
				type: GET_TEMPERAMENTS,
				payload: response.data, // Actualizar la lista de tipos con los datos recibidos en payload
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para filtrar por origen
export const filterByOrigin = (payload) => {
	return {
		type: FILTER_BY_ORIGIN,
		payload,
	};
};

// Acción para filtrar por tipo
export const filterByTemp = (payload) => {
	return {
		type: FILTER_BY_TEMP,
		payload,
	};
};

// Acción para ordenar la lista de pokemones
export const sortBy = (payload) => {
	return {
		type: SORT_BY,
		payload,
	};
};


export const createDog = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.post('http://localHost:3001/dogs', payload);

			if (response.data !== 'Name already exists in the database') {
				dispatch({
					type: CREATE_DOG,
					payload: response.data, // Agregar el nuevo pokemon a la lista existente
				});
				alert('El pokemon ha sido creado correctamente');
			} else {
				alert(response.data); // Mostrar una alerta si el nombre del pokemon ya existe
			}
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para obtener los detalles de un pokemon
export const getDogDetails = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`http://localHost:3001/dogs/${payload}`);
			dispatch({
				type: GET_DOG_DETAILS,
				payload: response.data[0], // Actualizar los detalles del pokemon con los datos recibidos en payload
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para borrar los detalles de un pokemon
export const clearDogDetails = () => {
	return {
		type: CLEAR_DOG_DETAILS,
	};
};

// Acción para obtener un pokemon por nombre
export const getBreedByName = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`http://localhost:3001/dogs?name=${payload}`);
			dispatch({
				type: GET_DOG_BY_NAME,
				payload: response.data[0],
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para eliminar un pokemon de la lista
export const deleteDog = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.delete(`http://localHost:3001/dogs/${payload}`);
			console.log(response.data);
			dispatch({
				type: DELETE_DOG,
				payload, // Eliminar el pokemon con el ID especificado de la lista
			});
			alert('El dog se elimino correctamente');
		} catch (error) {
			console.log(error);
			alert('El dog no se pudo eliminar');
		}
	};
};
