import style from './Pagination.module.css';

const Pagination = ({ allDogs, dogsPerPage, pagination, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className={style.nav}>
			<div className={style.divPagination}>
				{currentPage === 1 ? (
					<button
						disabled
						className={`${style.pageItem} ${style.num}`}>
						&lt;
					</button>
				) : (
					currentPage > 1 && (
						<button
							onClick={() => pagination(currentPage - 1)}
							className={`${style.pageItem} ${style.num}`}>
							&lt;
						</button>
					)
				)}
				{pageNumbers &&
					pageNumbers.map((number) => (
						<button
							key={number}
							onClick={() => pagination(number)}
							className={
								number === currentPage
									? `${style.current} ${style.num}`
									: `${style.pageItem} ${style.num}`
							}>
							{number}
						</button>
					))}
				{currentPage === pageNumbers.length ? (
					<button
						className={`${style.pageItem} ${style.num}`}
						disabled>
						&gt;
					</button>
				) : (
					currentPage <= pageNumbers.length - 1 && (
						<button
							className={`${style.pageItem} ${style.num}`}
							onClick={() => pagination(currentPage + 1)}>
							&gt;
						</button>
					)
				)}
			</div>
		</nav>
	);
};

export default Pagination;
