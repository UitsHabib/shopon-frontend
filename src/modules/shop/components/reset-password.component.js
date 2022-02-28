import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { resetPasswordSchema } from '../shop.schema';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ResetPassword = (props) => {
	const handleReset = (values) => {
		console.log(values);
	};

	return (
		<div className="d-flex flex-wrap justify-content-center mt-5">
			<div className="card" style={{ width: ' 25rem ', height: 'auto' }}>
				<div className="card-body">
					<h5 className="d-flex flex-wrap justify-content-center">
						Reset Password
					</h5>
					<Formik
						initialValues={{
							newPassword: '',
							confirmPassword: '',
						}}
						onSubmit={(values, actions) => {
							handleReset(values);
							actions.setSubmitting(false);
						}}
						validationSchema={resetPasswordSchema}
					>
						{(formikProps) => {
							return (
								<Form onSubmit={formikProps.handleSubmit}>
									<div className="form-group mb-3">
										<label htmlFor="newPassword" className="form-label">
											Password
										</label>
										<Field
											type="password"
											className="form-control"
											id="newPassword"
											name="newPassword"
										/>
										<div className="invalid-feedback d-block">
											<ErrorMessage name="newPassword" />
										</div>
									</div>
									<div className="form-group mb-3">
										<label htmlFor="confirmPassword" className="form-label">
											Confirm Password
										</label>
										<Field
											type="password"
											className="form-control"
											id="confirmPassword"
											name="confirmPassword"
										/>
										<div className="invalid-feedback d-block">
											<ErrorMessage name="confirmPassword" />
										</div>
									</div>

									<button type="submit" className="btn btn-primary">
										Submit
									</button>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
