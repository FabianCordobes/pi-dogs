import { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './SearchBar.module.css';
import { getBreedByName } from '../../redux/actions';
import { Link } from 'react-router-dom';

const SearchBar = ({ handleCloseMenu }) => {
	const [name, setName] = useState('');
	const dispatch = useDispatch();

	// Función para manejar la presentación de la búsqueda
	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(getBreedByName(name)); // Llama a la acción para buscar razas por nombre
	};

	// Función para manejar cambios en el campo de entrada
	const handleChange = (event) => {
		event.preventDefault();
		setName(event.target.value); // Actualiza el estado 'name' con el valor del campo de entrada
	};

	return (
		<div>
			<form
				className={style.form}
				onSubmit={handleSubmit}>
				<input
					className={style.input}
					type="text"
					onChange={(e) => handleChange(e)}
					value={name}
					name="id"
					placeholder="Insert name..."
				/>
				<Link
					to={`/dogs/search/${name}`} // Crea un enlace a la página de resultados de búsqueda
					onClick={handleCloseMenu}>
					<button
						className={style.button}
						type="submit"
						value={'Search'}
						onClick={() => {
							setName('');
						}}>
						Search
					</button>
				</Link>
			</form>
		</div>
	);
};

export default SearchBar;
