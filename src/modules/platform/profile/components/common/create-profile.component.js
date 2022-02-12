import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import signUpSchema from "../schema/signUp.schema";
import "react-datepicker/dist/react-datepicker.css";

const CreateProfile = () => {
	return (
		<div>
			<div
				style={{
					textAlign: "center",
					width: "50%",
					marginLeft: "25%",
					marginTop: "10%",
					border: "1px solid gray",
					boxShadow: "1px 1px 10px gray",
					borderRadius: "10px",
					padding: "20px",
				}}
			>
				<Formik
					initialValues={{
						title: "",
						description: "",
						permissions: [],
					}}
					// validationSchema={signUpSchema}
					onSubmit={(values, actions) => {
						console.log(values);
						actions.setSubmitting(false);
					}}
				>
					{(formikProps) => (
						<Form onSubmit={formikProps.handleSubmit}>
							<div className="form-group">
								<label className="form-label" htmlFor="title">
									Title{" "}
									<span className="text-danger">*</span>
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
									Description{" "}
									<span className="text-danger">*</span>
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

							<div className="form-group">
								<label className="form-label" htmlFor="permissions">
									Permissions <span className="text-danger">*</span>
								</label>
								<Field
									id="permissions"
									name="permissions"
									type="text"
									className="form-control"
								></Field>
								<div className="invalid-feedback d-block">
									<ErrorMessage name="permissions" />
								</div>
							</div>

							<button className="btn btn-primary" type="submit">
								Add new profile
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default CreateProfile;
