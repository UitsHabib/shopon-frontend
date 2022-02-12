import React, { useState } from 'react';
import { Link, useRouteMatch  } from 'react-router-dom';
import useServices from '../hooks/useServices';

import { Table, Pagination } from '../common/components';

import servicesMetadata from './services.metadata';

const Services = () => {
	const [paginate, updatePage] = useState({ currentPage: 1, itemsPerPage: 2 });
	const { services, meta } = useServices(paginate);
	const { path } = useRouteMatch();

	const updatedServicesMetadata = {
		...servicesMetadata,
		action: {
			render: (_, { id }) => (
				<Link to={`${path}/${id}`} className="btn btn-primary">
					Details
				</Link>
			),
		},
	};
	const totalNoOfItems = meta?.total || 0;

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
