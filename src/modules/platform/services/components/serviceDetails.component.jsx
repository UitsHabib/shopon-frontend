import React from "react";
import { Modal, Button } from "react-bootstrap";

import { formatRelative } from "date-fns";

const ServiceDetails = ({ service, onHide }) => {
	const {
		title,
		created_by: createdBy,
		created_at: createdAt,
		updated_at: updatedAt,
		updated_by: updatedBy,
		slug,
	} = service;

	return (
		<Modal
			show={true}
			onHide={onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<table className="table table-bordered table-striped p-2">
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
						<tr>
							<th scope="row">Slug</th>
							<td>{slug}</td>
						</tr>
					</tbody>
				</table>
			</Modal.Body>
			<Modal.Footer>
				<Button type="button" onClick={onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ServiceDetails;
