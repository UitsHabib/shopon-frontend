import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import _ from 'lodash';
import axios from 'axios';

import roleSchema from '../role.schema';

const RoleUpdate = () => {
	const { id } = useRouteMatch().params;
	const [role, setRole] = useState({});
	const [permissions, setPermissions] = useState([]);
	const [currentPermissions, setCurrentPermissions] = useState([]);
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	const fetchRole = async () => {
		try {
			const { data } = await axios.get(
				`http://localhost:5000/api/roles/${id}`,
				{ withCredentials: true }
			);
			setRole(data);
			setLoading(false);
		} catch (error) {
			console.error('Error: ', error);
		}
	};

	const fetchPermission = async () => {
		try {
			const { data } = await axios.get(
				'http://localhost:5000/api/permissions',
				{ withCredentials: true }
			);
			setPermissions(data);
		} catch (error) {
			console.error('Error: ', error);
		}
	};

	const updateRole = async (role) => {
		setCurrentPermissions([...role.permissions]);

		role.permissions.forEach(
			(permission, index) => (role.permissions[index] = parseInt(permission))
		);
		console.log(role);
		try {
			const { data } = await axios.patch(
				`http://localhost:5000/api/roles/${id}`,
				{ ...role },
				{ withCredentials: true }
			);
			setLoading(true);
			// fetchRole();
			history.push('/platform/roles');
			// console.log(data);
		} catch (error) {
			console.error('Error: ', error);
		}
	};

	useEffect(() => {
		fetchRole();
		fetchPermission();
	}, []);

	useEffect(() => {
		if (_.isEmpty(role)) return;

		// console.log('Inside role useEffect ', role.role_permissions);
		const permissionsList = role.role_permissions.map((permission) =>
			permission.permission.id.toString()
		);
		setCurrentPermissions(permissionsList);
	}, [role]);

	return (
		<>
			{loading ? (
				<div className="d-flex justify-content-center mt-5">
					<div
						className="spinner-border"
						role="status"
						style={{ height: '100px', width: '100px' }}
					>
						<span className="sr-only"></span>
					</div>
				</div>
			) : (
				<>
					{role ? (
						<div className="container mt-5">
							<Formik
								enableReinitialize
								initialValues={{
									title: role.title || '',
									description: role.description || '',
									permissions: currentPermissions || [],
								}}
								validationSchema={roleSchema}
								onSubmit={(values, actions) => {
									updateRole(values);
									// console.log(values);
									actions.setSubmitting(false);
								}}
							>
								{(formikProps) => (
									<Form
										onSubmit={formikProps.handleSubmit}
										className="d-flex flex-column justify-content-center align-item-center"
									>
										<div className="form-group">
											<label htmlFor="title" className="form-label h4">
												Title
											</label>
											<Field
												className="form-control"
												type="text"
												id="title"
												name="title"
												style={{ borderRadius: '15px' }}
											/>
											<div className="invalid-feedback d-block h6">
												<ErrorMessage name="title" />
											</div>
										</div>

										<div className="form-group mt-4">
											<label htmlFor="description" className="form-label h4">
												Description
											</label>
											<Field
												component="textarea"
												className="form-control"
												type="textarea"
												id="description"
												name="description"
												cols="5"
												rows="5"
												style={{ borderRadius: '15px' }}
											/>
											<div className="invalid-feedback d-block h6">
												<ErrorMessage name="description" />
											</div>
										</div>

										<label htmlFor="permissions" className="mt-3 h4">
											Select permissions
										</label>
										{permissions.map((permission) => {
											return (
												<div className="form-check" key={permission.id}>
													<label
														className="form-check-label"
														htmlFor="permission"
													>
														{' '}
														{permission.title}
													</label>
													<Field
														type="checkbox"
														name="permissions"
														value={permission.id.toString()}
														className="form-check-input"
													/>
												</div>
											);
										})}
										<div className="invalid-feedback d-block h6">
											<ErrorMessage name="permissions" />
										</div>
										<button
											type="submit"
											className="btn btn-success align-self-center"
										>
											Update
										</button>
									</Form>
								)}
							</Formik>
						</div>
					) : (
						<div className="d-flex justify-content-center mt-5">
							<div
								className="spinner-border"
								role="status"
								style={{ height: '100px', width: '100px' }}
							>
								<span className="sr-only"></span>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default RoleUpdate;
