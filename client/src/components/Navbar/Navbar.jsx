import { useState, useEffect } from 'react'; // Importa useState y useEffect de React
import { Link, NavLink } from 'react-router-dom'; // Importa Link y NavLink para la navegación
import style from './Navbar.module.css'; // Importa el archivo CSS local
import SearchBar from '../SearchBar/SearchBar'; // Importa el componente SearchBar
import title from '/public/dog.png'; // Importa la imagen del título del sitio

const Navbar = () => {
	// Estado para controlar la visibilidad de la barra de navegación
	const [isNavVisible, setIsNavVisible] = useState(true);
	// Almacena la posición de desplazamiento previa
	const [prevScrollPos, setPrevScrollPos] = useState(0);

	// Estado para controlar si el menú móvil está abierto o cerrado
	const [isOpen, setIsOpen] = useState(false);
	// Detecta si la pantalla es de tamaño móvil

	useEffect(() => {
		// Función para manejar el desplazamiento de la página
		const handleScroll = () => {
			const currentScrollPos = window.pageYOffset;

			// Comprueba si se está desplazando hacia abajo o arriba
			if (currentScrollPos > prevScrollPos) {
				setIsNavVisible(false); // Oculta la barra al hacer scroll hacia abajo
			} else {
				setIsNavVisible(true); // Muestra la barra al hacer scroll hacia arriba
			}

			setPrevScrollPos(currentScrollPos);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [prevScrollPos]);

	// Función para abrir o cerrar el menú móvil
	const handleCloseMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav
			id="navbar"
			className={`${style.nav} ${isNavVisible ? '' : style.hidden}`}>
			<div className={style.logoContainer}>
				<Link to={'/home'}>
					<img
						src={title}
						alt="Title"
					/>
				</Link>
			</div>

			<>
				<div className={style.linkContainer}>
					<NavLink
						to="/home"
						activeClassName={style.activeLink}>
						Home
					</NavLink>
				</div>
				<SearchBar />
				<div className={style.linkContainer}>
					<NavLink
						to="/create"
						activeClassName={style.activeLink}>
						Create Dog
					</NavLink>
				</div>
			</>
		</nav>
	);
};

export default Navbar; // Exporta el componente Navbar
