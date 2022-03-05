import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { updateMyProfileSchema } from '../../user.schema';
import { updateMyProfile } from './my-profile.action';

const UpdateMyProfile = (props) => {
	const history = useHistory();

	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
    
	async function handleUpdateMyProfile(newMyProfile) {
		try {
			const { data } = await updateMyProfile(newMyProfile);
			localStorage.setItem('loggedInUser', JSON.stringify(data));
			history.push('/my-profile');
            toast.success('Profile Updated Successfully', {
				backgroundColor: '#8329C5',
				color: '#ffffff',
			})
		} catch (error) {
			toast.error('Profile Updatation Failed', {
				backgroundColor: '#8329C5',
				color: '#ffffff',
			})
		}
	}

	return (
		<div className="d-flex flex-wrap justify-content-center">
			<div className="card mt-4" style={{ width: '30rem', height: 'auto' }}>
				<h5 className=" mt-4 d-flex flex-wrap justify-content-center">
					Update Your Profile
				</h5>

				<Formik
					initialValues={{
						id: loggedInUser.id,
						profile_id: loggedInUser.profile_id,
						first_name: loggedInUser.first_name,
						last_name: loggedInUser.last_name,
						email: loggedInUser.email,
						phone: loggedInUser.phone ? loggedInUser.phone : '',
					}}
					onSubmit={(values, actions) => {
						handleUpdateMyProfile(values);
						actions.setSubmitting(false);
					}}
					validationSchema={updateMyProfileSchema}
				>
					{(formikprops) => {
						return (
							<Form onSubmit={formikprops.handleSubmit}>
								<div className="m-4">
									<div className="form-group mb-3">
										<label htmlFor="id" className="form-label">
											ID
										</label>
										<Field
											type="text"
											className="form-control"
											id="id"
											name="id"
											disabled={true}
										/>
										<div className="invalid-feedback d-block">
											<ErrorMessage name="id" />
										</div>
									</div>

									<div className="form-group mb-3">
										<label htmlFor="first_name" className="form-label">
											First Name <span className="text-danger">*</span>
										</label>
										<Field
											type="text"
											className="form-control"
											id="first_name"
											name="first_name"
										/>
										<div className="invalid-feedback d-block">
											<ErrorMessage name="first_name" />
										</div>
									</div>

									<div className="form-group mb-3">
										<label htmlFor="last_name" className="form-label">
											Last Name <span className="text-danger">*</span>
										</label>
										<Field
											type="text"
											className="form-control"
											id="last_name"
											name="last_name"
										/>
										<div className="invalid-feedback d-block">
											<ErrorMessage name="last_name" />
										</div>
									</div>

									<div className="form-group mb-3">
										<label htmlFor="email" className="form-label">
											Email Address 
										</label>
										<Field
											type="email"
											className="form-control"
											id="email"
											name="email"
											disabled={true}
										/>
										<div className="invalid-feedback d-block">
											<ErrorMessage name="email" />
										</div>
									</div>

									<div className="form-group mb-3">
										<label htmlFor="phone" className="form-label">
											Phone No.
										</label>
										<Field
											type="text"
											className="form-control"
											id="phone"
											name="phone"
										/>
										<div className="invalid-feedback d-block">
											<ErrorMessage name="phone" />
										</div>
									</div>

									<div className="d-flex flex-wrap justify-content-between">
										<button type="submit" className="btn btn-primary">
											Update
										</button>
										<Link to="/my-profile" className="btn btn-danger">
											Cancel
										</Link>
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default UpdateMyProfile;
