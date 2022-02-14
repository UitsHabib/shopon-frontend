import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { formatRelative } from 'date-fns';

import useService from '../hooks/useService';

const ServiceDetails = () => {
	const { id: serviceId } = useParams();
	const history = useHistory();

	const {
		title,
		created_by: createdBy,
		created_at: createdAt,
		updated_at: updatedAt,
		updated_by: updatedBy,
	} = useService({ id: serviceId });

	return (
		<div className="d-flex flex-column flex-wrap justify-content-sm-center">
			<table className="table table-bordered table-striped w-50">
				<thead>
					<tr>
						<th scope="row" colSpan="2" className="text-center">
							{title}
						</th>
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
			<button
				type="button"
				onClick={() => history.push('/platform/services')}
				className="btn btn-primary w-25"
			>
				Go Back
			</button>
		</div>
	);
};

export default ServiceDetails;
