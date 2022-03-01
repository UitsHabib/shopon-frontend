import React, { useState } from 'react';
import _ from 'lodash';

import TableHeader from './tableHeader.component';
import TableBody from './tableBody.component';

import { getFilteredColumns, getSortingColumns } from './tableUtility';

const Table = (props) => {
	const { metadata } = props;

	const filteredColumns = getFilteredColumns(metadata);
	const sortingColumns = getSortingColumns(filteredColumns);

	const [sort, setSort] = useState({
		column: sortingColumns[0],
		order: 'asc',
	});

	const getOrganizedData = () => {
		const { data: rawData } = props;

		// sort the data
		const data = _.orderBy(rawData, [sort.column], [sort.order]);

		return data;
	};

	const updateSort = ({ column, order }) => {
		if (!(sortingColumns.includes(column) && /^(a|de)sc$/.test(order))) return;
		setSort({
			column,
			order,
		});
	};

	const data = getOrganizedData();

	return (
		<div className="d-flex flex-column">
			<table className="table">
				<TableHeader
					columns={filteredColumns}
					sort={sort}
					updateSort={updateSort}
				/>
				<TableBody data={data} metadata={metadata} />
			</table>
		</div>
	);
};

export default Table;
