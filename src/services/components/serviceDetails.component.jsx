import React from 'react';
import { useParams } from 'react-router-dom';
import useService from '../hooks/useService';

const ServiceDetails = () => {
	const { id: serviceId } = useParams();

	const {
		id,
		title,
		created_by: createdBy,
		created_at: createdAt,
		updated_at: updatedAt,
		updated_by: updatedBy,
	} = useService({ id: serviceId });

	return (
		<div>
			<p>{id}</p>
			<p>{title}</p>
			<p>{createdBy?.first_name}</p>
			<p>{createdAt}</p>
			<p>{updatedBy?.first_name}</p>
			<p>{updatedAt}</p>
		</div>
	);
};

export default ServiceDetails;
