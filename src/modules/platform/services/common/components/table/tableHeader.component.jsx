/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-plusplus */
import propTypes from 'prop-types';
import React from 'react';

const TableHeader = ({ columns, sort, updateSort }) => {
	const headers = Object.fromEntries(
		Object.entries(columns).map(([key, { header }]) =>
			header !== undefined ? [key, header] : [key, key.toUpperCase()]
		)
	);

	const getSortingIcon = (column) => {
		return column === sort.column ? (
			<i
				className={`mx-2 bi bi-sort-${sort.order === 'asc' ? 'up' : 'down'}`}
			/>
		) : undefined;
	};

	const handleOnClick = (column) => {
		if (column === sort.column) {
			updateSort({ column, order: sort.order === 'asc' ? 'desc' : 'asc' });
		} else {
			updateSort({ column, order: 'asc' });
		}
	};

	let nonce = 0;
	return (
		<thead>
			<tr>
				{Object.keys(headers).map((column) => (
					<th scope="col" key={nonce++} onClick={() => handleOnClick(column)}>
						{headers[column]}
						{getSortingIcon(column)}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
