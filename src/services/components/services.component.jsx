import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useServices from '../hooks/useServices';

import Table from '../../common/components/table/table.component';
import Pagination from '../../common/components/pagination.component';

import servicesMetadata from './services.metadata';

const Services = () => {
	const [paginate, updatePage] = useState({ currentPage: 1, itemsPerPage: 2 });
	const { services, meta } = useServices(paginate);
	const totalNoOfItems = meta?.total || 0;

	const updatedServicesMetadata = {
		...servicesMetadata,
		action: {
			render: (_, { id }) => (
				<Link to={`${id}`} className="btn btn-primary">
					Details
				</Link>
			),
		},
	};

	return (
		<div className="flex flex-col">
			<h1>Services</h1>
			<Table data={services} metadata={updatedServicesMetadata} />
			<Pagination
				currentPage={paginate.currentPage}
				totalNoOfItems={totalNoOfItems}
				itemsPerPage={paginate.itemsPerPage}
				updateCurrentPage={(page) =>
					updatePage((prevPaginate) => ({ ...prevPaginate, currentPage: page }))
				}
			/>
		</div>
	);
};

export default Services;
