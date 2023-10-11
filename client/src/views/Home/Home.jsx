import { useEffect, useState } from 'react'; // Importa useEffect y useState de React para manejar efectos secundarios y estado local.
import { useDispatch, useSelector } from 'react-redux'; // Importa useDispatch y useSelector de React Redux para acceder a la tienda y despachar acciones.
import { Link } from 'react-router-dom'; // Importa el componente Link de 'react-router-dom' para navegar entre rutas.
import style from './Home.module.css'; // Importa estilos CSS específicos para Home desde './Home.module.css'.
import Card from '../../components/Card/Card'; // Importa el componente Card desde su ubicación.
import {
	clearDogDetails,
	filterByOrigin,
	filterByTemp,
	getDogs,
	getTemperaments,
	resetFilters,
	sortBy,
} from '../../redux/actions'; // Importa acciones de Redux desde 'actions.js'.
import Pagination from '../../components/Pagination/Pagination'; // Importa el componente Pagination desde su ubicación.
import Filters from '../../components/Filters/Filters'; // Importa el componente Filters desde su ubicación.
import Loading from '../../components/Loading/Loading'; // Importa el componente Loading desde su ubicación.

const Home = () => {
	const dispatch = useDispatch();

	const allDogs = useSelector((state) => state.dogs); // Accede a la lista de perros desde el estado global de Redux.

	const allTemperaments = useSelector((state) => state.temperaments); // Accede a la lista de temperamentos desde el estado global de Redux.

	const [currentPage, setCurrentPage] = useState(1); // Define el estado local para la página actual.

	const dogsPerPage = 12; // Define la cantidad de perros a mostrar por página.

	const lastDogOfPage = currentPage * dogsPerPage; // Calcula el último perro de la página actual.

	const firstDogOfPage = lastDogOfPage - dogsPerPage; // Calcula el primer perro de la página actual.

	const currentDogs = allDogs && allDogs.slice(firstDogOfPage, lastDogOfPage); // Obtiene los perros de la página actual.
	
	const pagination = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		dispatch(getDogs()); // Obtiene la lista de perros al cargar la página.
		dispatch(getTemperaments()); // Obtiene la lista de temperamentos al cargar la página.
		dispatch(clearDogDetails()); // Limpia los detalles del perro seleccionado.
		var value = '0px';
		document.getElementById('navbar').style.transform = `translate(0,${value})`; // Configura el estilo del elemento con ID 'navbar'.
	}, [dispatch]);

	const handleFilterByOrigin = (event) => {
		dispatch(filterByOrigin(event.target.value)); // Aplica un filtro por origen de perro.
		setCurrentPage(1); // Reinicia la página actual a la primera.
	};

	const handleFilterByTemp = (event) => {
		dispatch(filterByTemp(event.target.value)); // Aplica un filtro por temperamento.
		setCurrentPage(1); // Reinicia la página actual a la primera.
	};

	const [order, setOrder] = useState(''); // Define el estado local para el orden de la lista de perros.

	const handleSort = (event) => {
		dispatch(sortBy(event.target.value)); // Aplica un orden a la lista de perros.
		setCurrentPage(1); // Reinicia la página actual a la primera.
		setOrder(event.target.value); // Actualiza el estado del orden.
	};

	const handleResetFilters = () => {
		dispatch(resetFilters()); // Reinicia los filtros.
	};

	if (allDogs.length === 0)
		return <Loading />; // Si no se han cargado datos de perros, muestra un componente de carga.
	else {
		return (
			<div className={style.homeContainer}>
				<div className={style.homeHeader}>
					<Filters
						handleResetFilters={handleResetFilters}
						handleFilterByOrigin={handleFilterByOrigin}
						handleFilterByTemp={handleFilterByTemp}
						handleSort={handleSort}
						order={order}
						allTemperaments={allTemperaments}
					/>
					<Pagination
						dogsPerPage={dogsPerPage}
						allDogs={allDogs.length}
						pagination={pagination}
						currentPage={currentPage}
					/>
				</div>

				<div className={style.cardsContainer}>
					<div className={style.cardContainer}>
						{currentDogs?.map((dog) => (
							<Link
								to={`/dogs/${dog.id}`}
								key={dog.id}
								className={style.cardLink}>
								<Card
									key={dog.id}
									name={dog.name}
									image={dog.image}
									temperaments={dog.Temperaments}
								/>
							</Link>
						))}
					</div>
					<div className={style.paginationBottom}>
						<Pagination
							dogsPerPage={dogsPerPage}
							allDogs={allDogs.length}
							pagination={pagination}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</div>
		);
	}
};

export default Home;
