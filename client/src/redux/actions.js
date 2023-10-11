import {
	GET_DOGS,
	GET_TEMPERAMENTS,
	GET_DOG_DETAILS,
	CLEAR_DOG_DETAILS,
	GET_DOG_BY_NAME,
	DELETE_DOG,
	FILTER_BY_ORIGIN,
	FILTER_BY_TEMP,
	SORT_BY,
	RESET_FILTERS,
} from './actionType';  // Importa los tipos de acciones desde el archivo 'actionType'

import axios from 'axios';  // Importa la librería Axios para realizar solicitudes HTTP

// Acción para restablecer los filtros
export const resetFilters = () => {
	return async function (dispatch) {
		try {
			dispatch({ type: RESET_FILTERS });
		} catch (error) {
			console.log(error.message);
		}
	};
};



// Acción para obtener la lista de razas de perros
export const getDogs = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get('http://localHost:3001/dogs');
			dispatch({
				type: GET_DOGS,
				payload: response.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para obtener la lista de temperamentos
export const getTemperaments = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get('http://localHost:3001/temperaments');
			dispatch({
				type: GET_TEMPERAMENTS,
				payload: response.data,
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

// Acción para filtrar por temperamento
export const filterByTemp = (payload) => {
	return {
		type: FILTER_BY_TEMP,
		payload,
	};
};

// Acción para ordenar la lista
export const sortBy = (payload) => {
	return {
		type: SORT_BY,
		payload,
	};
};



// Acción para obtener detalles de un perro
export const getDogDetails = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`http://localHost:3001/dogs/${payload}`);
			dispatch({
				type: GET_DOG_DETAILS,
				payload: response.data[0],
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para borrar los detalles de un perro
export const clearDogDetails = () => {
	return {
		type: CLEAR_DOG_DETAILS,
	};
};

// Acción para obtener una raza de perro por nombre
export const getBreedByName = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`http://localHost:3001/dogs?name=${payload}`);
			dispatch({
				type: GET_DOG_BY_NAME,
				payload: response.data[0],
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para eliminar un perro
export const deleteDog = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.delete(`http://localHost:3001/dogs/${payload}`);
			console.log(response.data);
			dispatch({
				type: DELETE_DOG,
				payload,
			});
			alert('El perro se eliminó correctamente');
		} catch (error) {
			console.log(error);
			alert('El perro no se pudo eliminar');
		}
	};
};
