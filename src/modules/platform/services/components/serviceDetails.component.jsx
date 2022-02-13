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
			<p className="alert alert-secondary text-xl font-bold">Id: {id}</p>
			<p className="alert alert-secondary text-xl font-bold">Title: {title}</p>
			<p className="alert alert-secondary text-xl font-bold">
				Created By: {createdBy?.first_name}
			</p>
			<p className="alert alert-secondary text-xl font-bold">
				Created At: {createdAt}
			</p>
			<p className="alert alert-secondary text-xl font-bold">
				Updated By: {updatedBy?.first_name}
			</p>
			<p className="alert alert-secondary text-xl font-bold">
				Updated At: {updatedAt}
			</p>
		</div>
	);
};

export default ServiceDetails;
