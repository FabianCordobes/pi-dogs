import { useEffect } from 'react'; // Importa useEffect de React para manejar efectos secundarios.
import style from './Landing.module.css'; // Importa estilos CSS específicos para Landing desde './Landing.module.css'.
import dogGif from '../../assets/dog.gif'; // Importa una imagen de un perro desde la ubicación de assets.
import { Link } from 'react-router-dom'; // Importa el componente Link de 'react-router-dom' para navegar entre rutas.

const Landing = () => {
	// Utiliza useEffect para ejecutar código después de que el componente se monta.
	useEffect(() => {
		var value = '-500px';
		// Configura el estilo del elemento con ID 'navbar' para que se mueva verticalmente.
		document.getElementById('navbar').style.transform = `translate(0,${value})`;
	}, []);

	return (
		<div className={`${style.landingCont}`}>
			<div>
				<h1 className={`${style.title}`}>Welcome to my dog app!</h1>{' '}
			</div>

			<div className={`${style.gifCont}`}>
				<img
					src={dogGif}
					alt="Blue dog gif"
					className={`${style.dogGif}`}
				/>
			</div>

			<div className={`${style.linkCont}`}>
				<Link
					to={'/home'}
					className={`${style.link} ${style.blink}`}>
					Let's Go!{' '}
				</Link>
			</div>
		</div>
	);
};

export default Landing;
