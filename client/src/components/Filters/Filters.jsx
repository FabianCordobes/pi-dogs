import { useState } from 'react';
import style from './Filters.module.css';

const Filters = ({
	handleFilterByOrigin,
	handleFilterByTemp,
	handleSort,
	order,
	allTemperaments,
	handleResetFilters,
}) => {
	// Agregar estados locales para rastrear los valores seleccionados en los select
	const [selectedOrigin, setSelectedOrigin] = useState('default');
	const [selectedType, setSelectedType] = useState('default');
	const [selectedSort, setSelectedSort] = useState('default');

	// Definir función para manejar el restablecimiento de filtros
	const resetFilters = () => {
		// Restablecer estados locales a sus valores por defecto
		setSelectedOrigin('default');
		setSelectedType('default');
		setSelectedSort('default');

		// Llamar a la función para restablecer los filtros
		handleResetFilters();
	};

	return (
		<div className={style.filtersContainer}>
			<div className={style.originFilter}>
				<select
					value={selectedOrigin} // Usar 'value' en lugar de 'defaultValue'
					onChange={(e) => {
						setSelectedOrigin(e.target.value);
						handleFilterByOrigin(e);
					}}>
					<option
						value={'default'}
						hidden>
						Origin
					</option>
					<option value="All">All</option>
					<option value="API">API</option>
					<option value="Created">Created</option>
				</select>
			</div>

			<div className={style.typeFilter}>
				<select
					value={selectedType} // Usar 'value' en lugar de 'defaultValue'
					onChange={(e) => {
						setSelectedType(e.target.value);
						handleFilterByTemp(e);
					}}>
					<option
						value={'default'}
						hidden>
						Type
					</option>
					<option value="All">All</option>
					{allTemperaments.map((temperament) => (
						<option
							key={temperament.id}
							value={temperament.name}>
							{temperament.name}
						</option>
					))}
				</select>
			</div>

			<div className={style.sortFilter}>
				<select
					value={selectedSort} // Usar 'value' en lugar de 'defaultValue'
					onChange={(e) => {
						setSelectedSort(e.target.value);
						handleSort(e);
					}}>
					<option
						value={'default'}
						hidden>
						Order
					</option>
					<option value="A-Z">A-Z</option>
					<option value="Z-A">Z-A</option>
					<option value="weight-asc">weight-asc</option>
					<option value="weight-desc">weight-desc</option>
					<option value="height-asc">height-asc</option>
					<option value="height-desc">height-desc</option>
					<option value="lifeSpan-asc">lifeSpan-asc</option>
					<option value="lifeSpan-desc">lifeSpan-desc</option>
				</select>
			</div>

			<div>
				<button onClick={resetFilters}>Reset Filters</button>
			</div>
		</div>
	);
};

export default Filters;
