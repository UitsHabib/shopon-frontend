import _ from 'lodash';
import React from 'react';

const Pagination = ({
	currentPage,
	totalNoOfItems,
	itemsPerPage,
	updateCurrentPage,
}) => {
	const totalPages = Math.ceil(totalNoOfItems / itemsPerPage);
	const pages = _.range(1, totalPages + 1, 1);

	return (
		<nav aria-label="Page navigation example" className="m-auto">
			<ul className="pagination">
				{currentPage > 1 ? (
					<li className="page-item">
						<button
							type="button"
							onClick={() =>
								currentPage - 1 > 0 ? updateCurrentPage(currentPage - 1) : null
							}
							className="page-link"
						>
							Previous
						</button>
					</li>
				) : null}
				{pages.map((page) => (
					<li
						key={page}
						className={`page-item ${page === currentPage ? 'active' : ''}`}
					>
						<button
							type="button"
							onClick={() => updateCurrentPage(page)}
							className="page-link"
						>
							{page}
						</button>
					</li>
				))}
				{currentPage < totalPages ? (
					<li className="page-item">
						<button
							type="button"
							onClick={() =>
								currentPage + 1 <= totalPages
									? updateCurrentPage(currentPage + 1)
									: null
							}
							className="page-link"
						>
							Next
						</button>
					</li>
				) : null}
			</ul>
		</nav>
	);
};

export default Pagination;
