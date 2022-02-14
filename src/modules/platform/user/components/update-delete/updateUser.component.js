import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { updateUserSchema } from "../../user.schema";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
const api_endPoint = "http://localhost:5000/api";

const UpdateUser = (props) => {
    const usersID = props.location.state.data;
    const { path } = useRouteMatch();
    const [user, setUser] = useState();
    const [loggedIn, setLoggedIn] = useState(false);

    const removeNull = (value) => {
        if (value === null) return "";
        if (!value) return "";
        return value;
    };

    async function updateUserAdmin(data) {
        try {
            console.log("up date data : ", data);
            const updatedUser = {
                profile_id: data.profile_id,
                first_name: data.first_name,
                last_name: data.last_name,
                // email: data.email,
                password: data.password,
                role_id: data.role_id,
            };
            console.log("up dated user : ", updatedUser);
            const response = await axios.patch(
                `http://localhost:5000/api/users/${usersID}`,
                updatedUser,
                { withCredentials: true }
            );
            console.log(response);

            alert(`User ${usersID} updated`);

            props.history.push(`${props.history.state?.prevPath}`);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function getUser(user_id) {
        try {
            setLoggedIn(true);
            const response = await axios.get(
                `${api_endPoint}/users/${user_id}`,
                { withCredentials: true }
            );

            console.log("Response : ", response);
            console.log("Response.data : ", response.data);

            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (!loggedIn) {
            console.log("User ID : ", usersID);
            getUser(usersID);
        }
    }, [user, loggedIn]);

    return (
        <>
            <button
                className="btn btn-success"
                onClick={() => {
                    props.history.push(`${props.history.state?.prevPath}`);
                }}
                style={{ margin: "20px", marginLeft: "85%" }}
            >
                Go Back
            </button>
            <br />
            <div className="mx-5 text-center">
                <h3>Updating user {usersID}</h3>
            </div>
            <hr />
            {user ? (
                <div
                    className="card bg-light "
                    style={{ margin: "auto", maxWidth: "45rem" }}
                >
                    <Formik
                        initialValues={{
                            profile_id: user.profile_id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            password: removeNull(user.password),
                            confirm_password: removeNull(user.confirm_password),
                            role_id: removeNull(user.role_id),
                        }}
                        validationSchema={updateUserSchema}
                        onSubmit={(values, actions) => {
                            console.log(values);
                            console.log(values.first_name);
                            updateUserAdmin(values);
                            actions.setSubmitting(false);
                        }}
                    >
                        {(formikProps) => (
                            <Form
                                onSubmit={formikProps.handleSubmit}
                                className="px-4 py-3"
                            >
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="profile_id"
                                    >
                                        Profile ID
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        id="profile_id"
                                        name="profile_id"
                                    />
                                    <div className="invalid-feedback d-block">
                                        <ErrorMessage name="profile_id" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="first_name"
                                    >
                                        First Name
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                    />
                                    <div className="invalid-feedback d-block">
                                        <ErrorMessage name="first_name" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="last_name"
                                    >
                                        Last Name
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                    />
                                    <div className="invalid-feedback d-block">
                                        <ErrorMessage name="last_name" />
                                    </div>
                                </div>

                                {/* <div
                                    className="form-group"
                                >
                                    <label
                                        className="form-label"
                                        htmlFor="email"
                                    >
                                        Email
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        className="form-control"
                                        type="email"
                                        id="email"
                                        name="email"
                                    />
                                    <div className="invalid-feedback d-block">
                                        <ErrorMessage name="email" />
                                    </div>
                                </div> */}

                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="password"
                                    >
                                        Password
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        className="form-control"
                                        type="password"
                                        id="password"
                                        name="password"
                                    />
                                    <div className="invalid-feedback d-block">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="confirm_password"
                                    >
                                        Confirm Password
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        className="form-control"
                                        type="confirm_password"
                                        id="confirm_password"
                                        name="confirm_password"
                                    />
                                    <div className="invalid-feedback d-block">
                                        <ErrorMessage name="confirm_password" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="role_id"
                                    >
                                        Role ID
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        id="role_id"
                                        name="role_id"
                                    />
                                    <div className="invalid-feedback d-block">
                                        <ErrorMessage name="role_id" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger "
                                    style={{ margin: "20px 40% " }}
                                >
                                    Update
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            ) : (
                <div className="mx-auto text-center w-50">
                    <p className="text-white bg-dark text-xl font-weight-bold">
                        There is no user of ID {usersID}
                    </p>
                </div>
            )}
        </>
    );
};

export default UpdateUser;
