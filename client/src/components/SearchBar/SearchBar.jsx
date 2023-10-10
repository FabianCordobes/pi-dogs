// import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './SearchBar.module.css';
// import axios from 'axios';
import { getBreedByName } from '../../redux/actions';
import { Link } from 'react-router-dom';

const SearchBar = ({handleCloseMenu}) => {
	const [name, setName] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(getBreedByName(name));
	};

	const handleChange = (event) => {
		event.preventDefault();
		setName(event.target.value);
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
				<Link to={`/dogs/search/${name}`} onClick={handleCloseMenu}>
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
