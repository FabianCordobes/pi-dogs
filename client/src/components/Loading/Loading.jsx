import LoadingImg from '../../assets/loading_dog.gif';
import style from './Loading.module.css';

const Loading = () => {
	const handleReload = () => {
		window.location.replace('');
	};

	return (
		<div className={style.loading}>
			<img
				src={LoadingImg}
				alt="Loading"
				width="250"
				height="250"
			/>
			<button
				className={style.btn}
				onClick={handleReload}>
				reload
			</button>
		</div>
	);
};

export default Loading;
