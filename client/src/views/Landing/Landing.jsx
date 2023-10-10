import { useEffect } from 'react';
import style from './Landing.module.css';
import dogGif from '../../assets/dog.gif';
import { Link } from 'react-router-dom';

const Landing = () => {
	useEffect(() => {
		var value = '-500px';
		document.getElementById('navbar').style.transform = `translate(0,${value})`;
	}, []);

	return (
		<div className={`${style.landingCont}`}>
			{/* <div>
				<img
					className={style.huellasDownLeft}
					src={huellas}
					alt="Huellas de perro"
				/>
				<img
					className={style.huellasDownRight}
					src={huellas}
					alt="Huellas de perro"
				/>
        <img
					className={style.huellasTopLeft}
					src={huellas}
					alt="Huellas de perro"
				/>
        <img
					className={style.huellasTopRight}
					src={huellas}
					alt="Huellas de perro"
				/>
			</div> */}

			<div>
				<h1 className={`${style.title}`}>Welcome to my dog app!</h1>
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
					Let's Go!
				</Link>
			</div>
		</div>
	);
};

export default Landing;
