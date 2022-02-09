import React from 'react';
import { Link } from 'react-router-dom';
import useServices from '../hooks/useServices';

import Table from '../../common/components/table/table.component';
import servicesMetadata from './services.metadata';

const Services = () => {
	const { services } = useServices({});
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
		<div>
			<h1>Services</h1>
			<Table data={services} metadata={updatedServicesMetadata} />
		</div>
	);
};

export default Services;
