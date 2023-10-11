import style from './Detail.module.css'; // Importa los estilos CSS específicos para Detail desde './Detail.module.css'.
import { Link, useParams } from 'react-router-dom'; // Importa el componente Link y useParams de 'react-router-dom' para enlaces y obtener parámetros de la URL.
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de 'react-router-dom' para navegar programáticamente.
import { useEffect } from 'react'; // Importa useState y useEffect de React para manejar estado local y efectos secundarios.
import imageArrow from '../../assets/goBack.png'; // Importa una imagen de una flecha desde la ubicación de assets.
import { useDispatch, useSelector } from 'react-redux'; // Importa useDispatch y useSelector de React Redux para acceder a la tienda y despachar acciones.
import { clearDogDetails, deleteDog, getBreedByName } from '../../redux/actions'; // Importa acciones de Redux desde 'actions.js'.
import Loading from '../../components/Loading/Loading'; // Importa el componente Loading desde su ubicación.
import ErrorPage from '../../components/ErrorPage/ErrorPage'; // Importa el componente ErrorPage desde su ubicación.

const DetailName = () => {
	const navigate = useNavigate(); // Obtiene la función para navegar programáticamente.
	const { name } = useParams(); // Obtiene el parámetro 'name' de la URL.

	const dispatch = useDispatch(); // Obtiene la función dispatch de Redux.

	const breed = useSelector((state) => state.detailDog); // Accede a los detalles del perro desde el estado global de Redux.

	useEffect(() => {
		dispatch(clearDogDetails()); // Limpia los detalles del perro.
		dispatch(getBreedByName(name)); // Obtiene los detalles del perro con el nombre especificado.

		var value = '0px';
		document.getElementById('navbar').style.transform = `translate(0, ${value})`; // Configura el estilo del elemento con ID 'navbar'.
	}, [name, dispatch]);

	const handleDelete = () => {
		dispatch(deleteDog(breed.id)); // Envía una acción para eliminar el perro con el ID especificado.
		navigate('/home'); // Navega a la ruta '/home'.
	};

	if (breed === 'Dog not found') return <ErrorPage />; // Si no se encuentra el perro, muestra una página de error.
	if (breed.name === undefined) return <Loading />;
	// Si los detalles del perro no se han cargado todavía, muestra un componente de carga.
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
							<button onClick={handleDelete}> Delete Dog </button>
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
								<p>
									<div className={style.characteristic}>Height: </div>
									{breed.minHeight && breed.maxHeight
										? `${breed.minHeight} - ${breed.maxHeight} cm`
										: breed.minHeight
										? `${breed.minHeight} cm`
										: breed.maxHeight
										? `${breed.maxHeight} cm`
										: 'N/A'}
								</p>

								<p>
									<div className={style.characteristic}>Weight:</div>
									{breed.minWeight && breed.maxWeight
										? `${breed.minWeight} - ${breed.maxWeight} kg`
										: breed.minWeight
										? `${breed.minWeight} kg`
										: breed.maxWeight
										? `${breed.maxWeight} kg`
										: 'N/A'}
								</p>

								<p>
									<div className={style.characteristic}>Life Span: </div>
									{breed.minLifeSpan && breed.maxLifeSpan
										? `${breed.minLifeSpan} - ${breed.maxLifeSpan} years`
										: breed.minLifeSpan
										? `${breed.minLifeSpan} years`
										: breed.maxLifeSpan
										? `${breed.maxLifeSpan} years`
										: 'N/A'}
								</p>

								<p>
									<div className={style.characteristic}>Breed Group: </div>
									{breed.breed_group ? `${breed.breed_group}` : 'N/A'}
								</p>
								{breed.temperaments ? (
									<p>
										<div className={style.characteristic}>Temperaments: </div>
										{breed.Temperament?.join(', ')}
									</p>
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

export default DetailName;
