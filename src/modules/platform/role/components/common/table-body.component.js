import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
Modal.setAppElement('#app');

const TableBody = (props) => {
	const { items: rows, columns } = props;
	const [currentRole, setCurrentRole] = useState({});
	const [isModal, setIsModal] = useState(false);

	const handleClick = (row) => {
		console.log(row.id);
		setCurrentRole(row);
		setIsModal(true);
	};

	return (
		<>
			<Modal
				isOpen={isModal}
				onRequestClose={() => setIsModal(false)}
				style={{
					overlay: {
						position: 'fixed',
						zIndex: '4',
						backdropFilter: 'blur(8px)',
					},
					content: {
						top: '10%',
						left: '20%',
						right: '20%',
						bottom: '10%',
						boxShadow: '3px 1px 29px -2px rgba(25,135,84,0.49)',
						border: '1px solid #ccc',
						overflow: 'auto',
						borderRadius: '15px',
						padding: '20px',
					},
				}}
			>
				<div className="">
					<Link
						className="btn btn-success"
						to={`/platform/roles/update/${currentRole.id}`}
					>
						Update
					</Link>

					<ul className="list-group list-group-flush d-flex justify-content-center align-items-center">
						<li className="list-group-item d-flex flex-row">
							<span className="text-primary">Title</span>
							<p>: {currentRole.title}</p>
						</li>
						<li className="list-group-item d-flex flex-row">
							<span className="text-primary">Slug</span>
							<p>: {currentRole.slug}</p>
						</li>
						<li className="list-group-item d-flex flex-row">
							<span className="text-primary">Type</span>
							<p>: {currentRole.type}</p>
						</li>
						<li className="list-group-item d-flex flex-row">
							<span className="text-primary">Description</span>
							<p>: {currentRole.description}</p>
						</li>
						<li className="list-group-item d-flex flex-row">
							<span className="text-primary">Created at</span>
							<p>: {currentRole.created_at}</p>
						</li>
						<li className="list-group-item d-flex flex-row">
							<span className="text-primary">Updated at</span>
							<p>: {currentRole.updated_at}</p>
						</li>
						<li className="list-group-item d-flex flex-row">
							<span className="text-primary">Permission</span>
							<p>
								:
								{currentRole.role_permissions &&
									currentRole.role_permissions.map((data) => {
										return <span> {data.permission.title}</span>;
									})}
							</p>
						</li>
					</ul>
				</div>
			</Modal>
			<tbody>
				{rows.map((row) => {
					return (
						<tr key={row.id} onClick={() => handleClick(row)}>
							{columns.map((data) => (
								<React.Fragment key={row.id + data.key}>
									{data.content(row, data.key)}
								</React.Fragment>
							))}
						</tr>
					);
				})}
			</tbody>
		</>
	);
};

export default TableBody;
