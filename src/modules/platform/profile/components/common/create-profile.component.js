import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
// import signUpSchema from "../schema/signUp.schema";

const CreateProfile = () => {
	async function handleSubmit(data) {
		try {
			const response = await axios.post(
				"http://localhost:5000/api/profiles",
				data,
				{ withCredentials: true }
			);
			window.location.href = "http://localhost:3000/platform/profiles";
		} catch (error) {
			console.log(error.response);
            // window.location.href = "http://localhost:3000/platform/profiles";
			// alert("Error happened!");
		}
	}
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
						console.log(values.permissions);
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
								<label
									className="form-label"
									htmlFor="description"
								>
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

							<div id="checkbox-group">Permissions</div>
							<br />
							<div role="group" aria-labelledby="checkbox-group">
								<label style={{ marginRight: "5px" }}>
									<Field
										type="checkbox"
										name="permissions"
										value="1"
									/>
									1
								</label>
								<label style={{ marginRight: "5px" }}>
									<Field
										type="checkbox"
										name="permissions"
										value="2"
									/>
									2
								</label>
								<label style={{ marginRight: "5px" }}>
									<Field
										type="checkbox"
										name="permissions"
										value="3"
									/>
									3
								</label>
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
