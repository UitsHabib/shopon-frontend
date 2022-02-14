import React from 'react';
import { useParams } from 'react-router-dom';

import { formatRelative } from 'date-fns';

import useService from '../hooks/useService';

const ServiceDetails = () => {
	const { id: serviceId } = useParams();

	const {
		title,
		created_by: createdBy,
		created_at: createdAt,
		updated_at: updatedAt,
		updated_by: updatedBy,
	} = useService({ id: serviceId });

	return (
		<div className="d-flex flex-wrap justify-content-xl-center">
			<table className="table table-bordered table-striped w-50">
				<thead>
					<tr>
						<td colSpan="2" className="text-center">
							{title}
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Created By</th>
						<td>{createdBy?.first_name}</td>
					</tr>
					<tr>
						<th scope="row">Created At</th>
						<td>
							{createdAt
								? formatRelative(Date.parse(createdAt), new Date())
								: null}
						</td>
					</tr>
					<tr>
						<th scope="row">Updated By</th>
						<td>{updatedBy?.first_name}</td>
					</tr>
					<tr>
						<th scope="row">Updated At</th>
						<td>
							{createdAt
								? formatRelative(Date.parse(updatedAt), new Date())
								: null}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default ServiceDetails;
