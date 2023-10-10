import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from './Navbar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import title from '/public/dog.png';
import { useMedia } from 'react-use';

const Navbar = () => {
	const [isNavVisible, setIsNavVisible] = useState(true); // Estado para controlar la visibilidad de la barra de navegación
	const [prevScrollPos, setPrevScrollPos] = useState(0);

	const [isOpen, setIsOpen] = useState(false);
	const isMobile = useMedia('(max-width: 768px)');

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.pageYOffset;

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
			{isMobile ? (
				<>
					<button
						onClick={handleCloseMenu}
						style={{ fontSize: '2rem', marginRight: '20px', borderRadius: '8px' }}>
						{isOpen ? 'X' : '<'}
					</button>
					{isOpen && (
						<div className={`${style.navMenu} ${isOpen ? style['menuOpen'] : ''}`}>
							<SearchBar handleCloseMenu={handleCloseMenu} />
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-around',
								}}>
								<div className={style.linkContainer}>
									<NavLink
										to={'/home'}
										activeClassName={style.activeLink}
										onClick={handleCloseMenu}>
										Home
									</NavLink>
								</div>

								<div className={style.linkContainer}>
									<NavLink
										to={'/create'}
										activeClassName={style.activeLink}
										onClick={handleCloseMenu}>
										Create Dog
									</NavLink>
								</div>
							</div>
						</div>
					)}
				</>
			) : (
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
			)}
		</nav>
	);
};

export default Navbar;
