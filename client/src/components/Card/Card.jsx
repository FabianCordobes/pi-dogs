import style from './Card.module.css';  

const Card = ({ name, image, temperaments }) => {
	return (
		<div className={style.cardContainer}>  {/* // Contenedor principal de la tarjeta */}
			<h2>{name}</h2>  {/* // Muestra el nombre del perro */}

			<img
				className={style.cardImg}
				src={image}
				alt={name}
			/> {/* // Muestra la imagen del perro con su nombre como atributo 'alt' */}

			<div className={style.cardTempCont}>  {/* // Contenedor de temperamentos */}
				{temperaments &&
					temperaments.map((temperament, index) => <p className={style.cardP} key={index}>{temperament}</p>)}
				{/* Comprueba si existen temperamentos y, si es así, los muestra en párrafos con estilo */}
			</div>
		</div>
	);
};

export default Card;  // Exporta el componente Card
