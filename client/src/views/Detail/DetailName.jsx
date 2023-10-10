import style from './Detail.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import imageArrow from '../../assets/goBack.png';
import imgLP from '../../assets/lifeSpan.png';
import imgW from '../../assets/weight.png';
import imgH from '../../assets/height.png';
import imgTemp from '../../assets/temp.png';
import imgBG from '../../assets/breedGroup.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearDogDetails, deleteDog, getBreedByName } from '../../redux/actions';
import Loading from '../../components/Loading/Loading';
// import NotFound from '../../components/NotFound/NotFound';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
// import ReactLoading from "react-loading";

const DetailName = () => {
	const navigate = useNavigate();
	const { name } = useParams();

	const dispatch = useDispatch();

	const breed = useSelector((state) => state.detailDog);

	useEffect(() => {
		// Limpiar los detalles del Pokémon al montar el componente y obtener los detalles
		dispatch(clearDogDetails());
		dispatch(getBreedByName(name));
		// console.log(breed);
		// Manipulación del estilo del elemento 'navbar'
		var value = '0px';
		document.getElementById('navbar').style.transform = `translate(0, ${value})`;

		// console.log(name);
	}, [name, dispatch]);

	const handleDelete = () => {
		// Manejar la eliminación de un Pokémon
		dispatch(deleteDog(breed.id));
		navigate('/home'); // Redirigir al usuario a la página de inicio
	};

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
							{/* Mostrar el componente de carga mientras loading es true */}
							{/* {loading ? (
				 <ReactLoading type={"spin"} color={"#1594cbc1"} height={50} width={50} />
			  ) : ( */}
							<img
								src={breed.image}
								alt="Dog"
								className={style.image}
							/>
							{/* )} */}
						</div>

						<div className={style.infoContainer}>
							<h2 className={style.characteristic1}>Breed characteristics</h2>

							<div className={style.characteristicContainer}>
								<p>
									<div className={style.characteristic}>
										<img
											src={imgH}
											alt="weight"
											className={style.img}
										/>{' '}
										Height:{' '}
									</div>
									{breed.minHeight && breed.maxHeight
										? `${breed.minHeight} - ${breed.maxHeight} cm`
										: breed.minHeight
										? `${breed.minHeight} cm`
										: breed.maxHeight
										? `${breed.maxHeight} cm`
										: 'N/A'}
								</p>

								<p>
									<div className={style.characteristic}>
										<img
											src={imgW}
											alt="weight"
											className={style.img}
										/>{' '}
										Weight:
									</div>
									{breed.minWeight && breed.maxWeight
										? `${breed.minWeight} - ${breed.maxWeight} kg`
										: breed.minWeight
										? `${breed.minWeight} kg`
										: breed.maxWeight
										? `${breed.maxWeight} kg`
										: 'N/A'}
								</p>

								<p>
									<div className={style.characteristic}>
										<img
											src={imgLP}
											alt="weight"
											className={style.img}
										/>{' '}
										Life Span:{' '}
									</div>
									{breed.minLifeSpan && breed.maxLifeSpan
										? `${breed.minLifeSpan} - ${breed.maxLifeSpan} years`
										: breed.minLifeSpan
										? `${breed.minLifeSpan} years`
										: breed.maxLifeSpan
										? `${breed.maxLifeSpan} years`
										: 'N/A'}
								</p>

								<p>
									<div className={style.characteristic}>
										<img
											src={imgBG}
											alt="weight"
											className={style.img}
										/>{' '}
										Breed Group:{' '}
									</div>
									{breed.breed_group ? `${breed.breed_group}` : 'N/A'}
								</p>
								{breed.temperaments ? (
									<p>
										<div className={style.characteristic}>
											<img
												src={imgTemp}
												alt="weight"
												className={style.img}
											/>{' '}
											Temperaments:{' '}
										</div>
										{breed.Temperament?.join(', ')}
									</p>
								) : (
									<p>
										<div className={style.characteristic}>
											<img
												src={imgTemp}
												alt="weight"
												className={style.img}
											/>{' '}
											Temperaments:
										</div>
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

export default DetailName;
