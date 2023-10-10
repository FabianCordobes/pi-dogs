import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './Home.module.css';
import Card from '../../components/Card/Card';
import {
	clearDogDetails,
	filterByOrigin,
	filterByTemp,
	getDogs,
	getTemperaments,
	resetFilters,
	sortBy,
} from '../../redux/actions';
import Pagination from '../../components/Pagination/Pagination';
import Filters from '../../components/Filters/Filters';
import Loading from '../../components/Loading/Loading';

const Home = () => {
	const dispatch = useDispatch();
	const allDogs = useSelector((state) => state.dogs);
	const allTemperaments = useSelector((state) => state.temperaments);
	const [currentPage, setCurrentPage] = useState(1);
	const dogsPerPage = 12;
	const lastDogOfPage = currentPage * dogsPerPage;
	const firstDogOfPage = lastDogOfPage - dogsPerPage;
	const currentDogs = allDogs && allDogs.slice(firstDogOfPage, lastDogOfPage);
	const pagination = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		dispatch(getDogs());
		dispatch(getTemperaments());
		dispatch(clearDogDetails());
		// console.log(allTemperaments);
		var value = '0px';
		document.getElementById('navbar').style.transform = `translate(0,${value})`;
	}, [dispatch]);

	const handleFilterByOrigin = (event) => {
		dispatch(filterByOrigin(event.target.value));
		setCurrentPage(1);
	};

	const handleFilterByTemp = (event) => {
		dispatch(filterByTemp(event.target.value));
		setCurrentPage(1);
	};

	const [order, setOrder] = useState('');

	const handleSort = (event) => {
		dispatch(sortBy(event.target.value));
		setCurrentPage(1);
		setOrder(event.target.value);
	};

	const handleResetFilters = () => {
		// Llama a la acción resetFilters aquí
		dispatch(resetFilters());
	};

	if (allDogs.length === 0)
	return <Loading />;
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
