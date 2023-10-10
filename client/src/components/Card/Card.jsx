import style from './Card.module.css';

const Card = ({ name, image, temperaments }) => {
	return (
		<div className={style.cardContainer}>
			<h2>{name}</h2>

			<img
				className={style.cardImg}
				src={image}
				alt={name}
			/>

			<div className={style.cardTempCont}>
				{temperaments &&
					temperaments.map((temperament, index) => <p className={style.cardP} key={index}>{temperament}</p>)}
			</div>
		</div>
	);
};

export default Card;
