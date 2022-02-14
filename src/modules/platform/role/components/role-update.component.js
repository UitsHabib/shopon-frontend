import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import roleSchema from '../role.schema';

const RoleUpdate = () => {
	const { id } = useRouteMatch().params;
	const [role, setRole] = useState({});
	const fetchRole = async () => {
		try {
			const { data } = await axios.get(
				`http://localhost:5000/api/roles/${id}`,
				{ withCredentials: true }
			);
			setRole(data);
		} catch (error) {
			console.error('Error: ', error);
		}
	};

	const updateRole = (role) => {
		console.log(role);
		// 	try {
		// 		const response = await axios.patch(
		// 				`http://localhost:5000/api/roles/${id}`,
		// 				{  },
		// 				{ withCredentials: true }
		// 		);
		// 		setRoles([...roles]);
		// 		setModalState(false);
		// } catch (error) {
		// 		console.error('Error: ', error);
		// }
	};

	useEffect(() => {
		fetchRole();
	}, []);

	return (
		<>
			{role ? (
				<>
					<p>Title = {role.title}</p>
					<Formik
						enableReinitialize
						initialValues={{
							title: role.title,
							description: role.description,
						}}
						validationSchema={roleSchema}
						onSubmit={(values, actions) => {
							updateRole(values);
							console.log(values);
							actions.setSubmitting(false);
						}}
					>
						{(formikProps) => (
							<Form onSubmit={formikProps.handleSubmit}>
								<div className="form-group">
									<label htmlFor="title" className="form-label">
										Title
									</label>
									<Field
										className="form-control"
										type="text"
										id="title"
										name="title"
									/>
									<div className="invalid-feedback d-block">
										<ErrorMessage name="title" />
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="description" className="form-label">
										Description
									</label>
									<Field
										className="form-control"
										type="text"
										id="description"
										name="description"
									/>
									<div className="invalid-feedback d-block">
										<ErrorMessage name="description" />
									</div>
								</div>

								<button type="submit" className="btn btn-primary">
									Update
								</button>
							</Form>
						)}
					</Formik>
				</>
			) : (
				<p>No role</p>
			)}
		</>
	);
};

export default RoleUpdate;
