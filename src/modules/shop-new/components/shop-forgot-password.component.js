import React from 'react';
import axios from 'axios';
import { forgotPasswordSchema } from '../shop.schema';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ForgotPassword = (props) => {
	const handleForgot = (values) => {
		console.log(values);
	};

	return (
		<div className="d-flex flex-wrap justify-content-center mt-5">
			<div className="card" style={{ width: ' 25rem ', height: 'auto' }}>
				<div className="card-body">
					<h5 className="d-flex flex-wrap justify-content-center">
						Forgot Password
					</h5>
					<Formik
						initialValues={{
							email: '',
						}}
						onSubmit={(values, actions) => {
							handleForgot(values);
							actions.setSubmitting(false);
						}}
						validationSchema={forgotPasswordSchema}
					>
						{(formikProps) => {
							return (
								<Form onSubmit={formikProps.handleSubmit}>
									<div className="form-group mb-3">
										<label htmlFor="email" className="form-label">
											Email Address
										</label>
										<Field
											type="email"
											className="form-control"
											id="email"
											name="email"
										/>
										<div className="invalid-feedback d-block">
											<ErrorMessage name="email" />
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

export default ForgotPassword;
