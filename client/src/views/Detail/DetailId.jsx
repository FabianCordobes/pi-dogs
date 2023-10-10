import style from './Detail.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import imageArrow from '../../assets/goBack.png';
// import imgLP from '../../assets/lifeSpan.png';
// import imgW from '../../assets/weight.png';
// import imgH from '../../assets/height.png';
// import imgTemp from '../../assets/temp.png';
// import imgBG from '../../assets/breedGroup.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearDogDetails, deleteDog, getDogDetails } from '../../redux/actions';
import Loading from '../../components/Loading/Loading';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
// import ReactLoading from "react-loading";
const Detail = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const breed = useSelector((state) => state.detailDog);

	// const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		// Limpiar los detalles del Pokémon al montar el componente y obtener los detalles
		dispatch(clearDogDetails());
		dispatch(getDogDetails(id));
		// console.log(breed.id);

		// Manipulación del estilo del elemento 'navbar'
		var value = '0px';
		document.getElementById('navbar').style.transform = `translate(0, ${value})`;
	}, [id, dispatch]);

	const handleDelete = () => {
		dispatch(deleteDog(breed.id));
		navigate('/home');
	};

	// if (pokemonDetail === 'Pokemon not found') return <PokeNotFound />;

	if (breed === 'Dog not found') return <ErrorPage />;
	if (breed.name === undefined) return <Loading />;
	else {
		return (
			<div className={style.contenedorPadre}>
				<div className={style.container1}>
					<div className={style.containerName}>
						<Link
							to={'/home'}
							className={style.buttonBack}>
							<img
								src={imageArrow}
								alt="arrow"
								className={style.arrow}
							/>
						</Link>

						<h1 className={style.name}>{breed.name}</h1>

						{breed && breed?.id?.length > 30 && (
							<button onClick={handleDelete}> Delete Pokemon </button>
						)}
					</div>

					<div className={style.container2}>
						<div className={style.imageContainer}>
							<img
								src={breed.image}
								alt="Dog"
								className={style.image}
							/>
						</div>

						<div className={style.infoContainer}>
							<h2 className={style.characteristic1}>Breed characteristics</h2>

							<div className={style.characteristicContainer}>
								<div>
									<div className={style.characteristic}>Height: </div>
									<div className={style.charValue}>
										{breed.minHeight && breed.maxHeight
											? `${breed.minHeight} - ${breed.maxHeight} cm`
											: breed.minHeight
											? `${breed.minHeight} cm`
											: breed.maxHeight
											? `${breed.maxHeight} cm`
											: 'N/A'}
									</div>
								</div>

								<div>
									<div className={style.characteristic}>Weight:</div>
									<div className={style.charValue}>
										{breed.minWeight && breed.maxWeight
											? `${breed.minWeight} - ${breed.maxWeight} kg`
											: breed.minWeight
											? `${breed.minWeight} kg`
											: breed.maxWeight
											? `${breed.maxWeight} kg`
											: 'N/A'}
									</div>
								</div>

								<div>
									<div className={style.characteristic}>Life Span: </div>
									<div className={style.charValue}>
										{breed.minLifeSpan && breed.maxLifeSpan
											? `${breed.minLifeSpan} - ${breed.maxLifeSpan} years`
											: breed.minLifeSpan
											? `${breed.minLifeSpan} years`
											: breed.maxLifeSpan
											? `${breed.maxLifeSpan} years`
											: 'N/A'}
									</div>
								</div>

								<div>
									<div className={style.characteristic}>Breed Group: </div>
									<div className={style.charValue}>{breed.breed_group ? `${breed.breed_group}` : 'N/A'}</div>
								</div>
								{breed.temperaments ? (
									<div>
										<div className={style.characteristic}>Temperaments: </div>
										{breed.Temperament?.join(', ')}
									</div>
								) : (
									<p>
										<div className={style.characteristic}>Temperaments:</div>
										{breed.Temperaments?.join(', ')}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Detail;
