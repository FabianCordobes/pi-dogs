// Importación de módulos y recursos
import style from './CreateDog.module.css'; // Importa el archivo CSS local
import { useState, useEffect } from 'react'; // Importa useState y useEffect de React
import { useDispatch, useSelector } from 'react-redux'; // Importa useDispatch y useSelector de React Redux
import { getTemperaments } from '../../redux/actions'; // Importa una acción de Redux
import validate from '../../validators/validators'; // Importa una función de validación
import axios from 'axios'; // Importa la librería Axios para realizar solicitudes HTTP
import formImgCheck from '../../assets/check.png'; // Importa una imagen

// Componente CreateDog
const CreateDog = () => {
	const dispatch = useDispatch(); // Obtiene la función dispatch de Redux

	// ESTADOS GLOBALES
	const allTemperaments = useSelector((state) => state.temperaments); // Obtiene datos del estado global usando useSelector

	useEffect(() => {
		dispatch(getTemperaments()); // Ejecuta una acción para obtener datos de temperamentos cuando el componente se monta
	}, [dispatch]);

	// ESTADOS LOCALES
	const [form, setForm] = useState({
		// Define el estado local 'form' con un objeto inicial vacío y la función 'setForm' para actualizarlo
		name: '', // Propiedades iniciales del objeto 'form'
		image: '',
		minHeight: '',
		maxHeight: '',
		minWeight: '',
		maxWeight: '',
		minLifeSpan: '',
		maxLifeSpan: '',
		temperaments: [], // Inicialmente una matriz vacía para los temperamentos seleccionados
		breed_group: '',
	});

	const [errors, setErrors] = useState({}); // Define el estado local 'errors' y la función 'setErrors' para gestionar errores de validación

	const [showAlert, setShowAlert] = useState(false); // Estado para mostrar una alerta

	const [alertTimeout, setAlertTimeout] = useState(null); // Estado para el tiempo de espera de la alerta

	// HANDLERS
	const changeHandler = (event) => {
		// Manejador para los cambios en los campos de entrada
		const newState = { ...form }; // Crea una copia del objeto 'form'
		setErrors(validate({ ...newState, [event.target.name]: event.target.value })); // Valida los campos actualizados
		setForm({ ...newState, [event.target.name]: event.target.value }); // Actualiza el objeto 'form'
	};

	const submitHandler = (event) => {
		// Manejador para enviar el formulario
		const endpoint = 'http://localHost:3001/dogs'; // URL del servidor donde se enviará el formulario

		event.preventDefault(); // Previene la recarga de la página al enviar el formulario

		// Realiza una solicitud POST al servidor con los datos del formulario
		const response = axios
			.post(endpoint, {
				...form,
				temperaments: form.temperaments.map((temp) => temp.id),
			})
			.then((res) => {
				// Maneja la respuesta exitosa
				setShowAlert(true); // Muestra una alerta
				setForm({
					// Restablece los campos del formulario
					name: '',
					image: '',
					minHeight: '',
					maxHeight: '',
					minWeight: '',
					maxWeight: '',
					minLifeSpan: '',
					maxLifeSpan: '',
					temperaments: [],
					breed_group: '',
				});
			})
			.catch((error) => {
				// Maneja errores en la solicitud
				if (error.response && error.response.status === 400) {
					alert('Error: ' + error.response.data.error);
				} else {
					console.log(error);
				}
			});
	};

	const selectHandler = (event) => {
		// Manejador para la selección de temperamentos
		if (
			event.target.value &&
			!form.temperaments.some((temp) => temp.name === event.target.value)
		) {
			const selectedTemperamentName = event.target.value;
			const selectedTemperamentID = event.target.options[event.target.selectedIndex].id;
			const newState = { ...form };

			newState.temperaments = [
				...newState.temperaments,
				{ id: selectedTemperamentID, name: selectedTemperamentName },
			];
			setErrors(validate(newState));
			setForm(newState);
		}
	};

	const deleteTemperament = (temperament) => {
		// Manejador para eliminar un temperamento seleccionado
		let newTemps = form.temperaments.filter((temp) => temp !== temperament);
		setForm({
			...form,
			temperaments: newTemps,
		});
		setErrors(
			validate({
				...form,
				temperaments: newTemps,
			})
		);
	};

	// USE-EFFECT

	useEffect(() => {
		// Efecto para mostrar una alerta
		if (showAlert) {
			setAlertTimeout(
				setTimeout(() => {
					setShowAlert(false);
				}, 3000)
			);
		}
		return () => {
			clearTimeout(alertTimeout);
		};
	}, [showAlert]);

	return (
		<div className={style.container}>
			<form
				className={style.formContainer}
				onSubmit={submitHandler}>
				<div className={style.form}>
					<p className={style.heading}>Create a new dog</p>
					{showAlert && ( // Mostrar la alerta si showAlert es verdadero
						<h4 className={style.alert}>
							The Breed was successfully created{' '}
							<img
								src={formImgCheck}
								alt="Dog"
								className={style.imageCheck}
							/>
						</h4>
					)}

					{/* name - image */}
					<div className={style.inputsContainer}>
						<div className={style.left}>
							<div>
								<label>Name: </label>
								<input
									type="text"
									placeholder="Black Mongrel"
									value={form.name}
									onChange={changeHandler}
									name="name"
									className={style.input}
								/>
								{errors.name && <p className={style.errors}>{errors.name}</p>}
							</div>

							{/* height */}
							<div>
								<label>Min. Height: </label>
								<input
									type="number"
									value={form.minHeight}
									onChange={changeHandler}
									name="minHeight"
									className={style.input}
								/>
								{errors.minHeight && <p className={style.errors}>{errors.minHeight}</p>}
							</div>

							<div>
								<label>Max. Height: </label>
								<input
									type="number"
									value={form.maxHeight}
									onChange={changeHandler}
									name="maxHeight"
									className={style.input}
								/>
								{errors.maxHeight && <p className={style.errors}>{errors.maxHeight}</p>}
							</div>

							{/* weight */}
							<div>
								<label>Min. Weight: </label>
								<input
									type="number"
									value={form.minWeight}
									onChange={changeHandler}
									name="minWeight"
									className={style.input}
								/>
								{errors.minWeight && <p className={style.errors}>{errors.minWeight}</p>}
							</div>

							<div>
								<label>Max. Weight: </label>
								<input
									type="number"
									value={form.maxWeight}
									onChange={changeHandler}
									name="maxWeight"
									className={style.input}
								/>
								{errors.maxWeight && <p className={style.errors}>{errors.maxWeight}</p>}
							</div>
						</div>

						<div className={style.right}>
							{/* life span */}
							<div>
								<label>Image: </label>
								<input
									type="url"
									placeholder="Insert URL"
									value={form.image}
									onChange={changeHandler}
									name="image"
									className={style.input}
								/>
								{errors.image && <p className={style.errors}>{errors.image}</p>}
							</div>

							<div>
								<label>Min. Life Span: </label>
								<input
									type="number"
									value={form.minLifeSpan}
									onChange={changeHandler}
									name="minLifeSpan"
									className={style.input}
								/>
								{errors.minLifeSpan && (
									<p className={style.errors}>{errors.minLifeSpan}</p>
								)}
							</div>

							<div>
								<label>Max. Life Span: </label>
								<input
									type="number"
									value={form.maxLifeSpan}
									onChange={changeHandler}
									name="maxLifeSpan"
									className={style.input}
								/>
								{errors.maxLifeSpan && (
									<p className={style.errors}>{errors.maxLifeSpan}</p>
								)}
							</div>

							{/* breed - temp */}
							<div>
								<label>Breed Group: </label>
								<input
									type="text"
									placeholder="toy, small, medium or large"
									value={form.breed_group}
									onChange={changeHandler}
									name="breed_group"
									className={style.input}
								/>
								{errors.breed_group && (
									<p className={style.errors}>{errors.breed_group}</p>
								)}
							</div>

							<div>
								<label>Temperaments: </label>
								<select
									name="temperaments"
									onChange={selectHandler}
									defaultValue="Select one or more typical temperaments of the breed"
									className={style.option}>
									<option className={style.option}>
										Select one or more typical temperaments
									</option>
									{allTemperaments?.map((temperament) => (
										<option
											key={temperament.id}
											id={temperament.id}
											value={temperament.name}
											className={style.option}>
											{temperament.name}
										</option>
									))}
								</select>

								{errors.temperaments && (
									<p className={style.errors}>{errors.temperaments}</p>
								)}
							</div>
						</div>
					</div>

					{/* <br /> */}

					<h4>Selected Temperaments:</h4>
					<div>
						{form.temperaments &&
							form.temperaments.map((temperament) => (
								<button
									key={temperament.id}
									onClick={() => deleteTemperament(temperament)}
									className={style.selectedTemp}>
									{temperament.name}
								</button>
							))}
					</div>

					{/* <br /> */}

					<button
						type="submit"
						disabled={
							!form.name ||
							!form.image ||
							!form.minHeight ||
							!form.maxHeight ||
							!form.minWeight ||
							!form.maxWeight ||
							!form.minLifeSpan ||
							!form.maxLifeSpan ||
							!form.temperaments.length
						}
						className={style.button}>
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateDog;
