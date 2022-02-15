import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { createSchema } from '../../profile.schema';
import { useRouteMatch } from 'react-router-dom';
import CheckboxGroup from '../../../permission/components/checkboxGroup.component';

const api_endpoint = 'http://localhost:5000';

const CreateProfile = () => {
	const { path } = useRouteMatch();

	//fetch permission data from database
	const [permissions, setPermissions] = useState([]);

	const getPermissions = async () => {
		try {
			const { data } = await axios.get(`${api_endpoint}/api/permissions`, {
				withCredentials: true,
			});
			// console.log(data);
			setPermissions(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPermissions();
	}, []);

	//create or post profile data into database
	async function handleSubmit(data) {
		console.log(data);
		try {
			const response = await axios.post(`${api_endpoint}/api/profiles`, data, {
				withCredentials: true,
			});
			window.location.href = 'http://localhost:3000/platform/profiles';
		} catch (error) {
			alert(error.response.data);
		}
	}

	const handleCancel = () => {
		window.location.href = 'http://localhost:3000/platform/profiles';
	};
	return (
		<div>
			<div
				style={{
					textAlign: 'center',
					width: '50%',
					marginLeft: '25%',
					marginTop: '10%',
					border: '1px solid gray',
					boxShadow: '1px 1px 10px gray',
					borderRadius: '10px',
					padding: '20px',
				}}
			>
				<Formik
					initialValues={{
						title: '',
						description: '',
						permissions: [],
					}}
					validationSchema={createSchema}
					onSubmit={(values, actions) => {
						// console.log(values.permissions);
						handleSubmit(values);
						actions.setSubmitting(false);
					}}
				>
					{(formikProps) => (
						<Form onSubmit={formikProps.handleSubmit}>
							<div className="form-group">
								<label className="form-label" htmlFor="title">
									Title <span className="text-danger">*</span>
								</label>
								<Field
									id="title"
									name="title"
									type="text"
									className="form-control"
								></Field>
								<div className="invalid-feedback d-block">
									<ErrorMessage name="title" />
								</div>
							</div>
							<div className="form-group">
								<label className="form-label" htmlFor="description">
									Description <span className="text-danger">*</span>
								</label>
								<Field
									id="description"
									name="description"
									type="text"
									className="form-control"
								></Field>
								<div className="invalid-feedback d-block">
									<ErrorMessage name="description" />
								</div>
							</div>

							<div id="checkbox-group">Permissions <span className="text-danger">*</span></div>
							<div role="group" aria-labelledby="checkbox-group" style={{textAlign: 'left'}}>
								{permissions.map((permission) => (
                                    <React.Fragment key={permission.id}>
									<label>
										<Field type="checkbox" name="permissions" value={permission.id.toString()} />
										{" "}{permission.title}
									</label>
                                    <br />
                                    </React.Fragment>
								))}
							</div>
							<br />
							<button className="btn btn-primary" type="submit">
								Add Profile
							</button>{' '}
							<button
								className="btn btn-danger"
								type="button"
								onClick={handleCancel}
							>
								Cancel
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default CreateProfile;
