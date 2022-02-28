import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSchema } from "../customer.schema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { customerLogin } from "../customer.actions";

const CustomerLogin = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    async function handleLogin(data) {
        dispatch(customerLogin(data))
            .then((response) => {
                props.location.state && props.location.state.from.pathname
                    ? history.push(props.location.state.from.pathname)
                    : history.push("/");

                toast.success("Logged in Successfully", {
                    backgroundColor: "#8329C5",
                    color: "#ffffff",
                });
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    backgroundColor: "#8329C5",
                    color: "#ffffff",
                });
            });
    }

    return (
        <>
            {props.location.state && props.location.state.inactive ? (
                <div className="w-100 d-flex justify-content-center">
                    <div
                        className="card text-center"
                        style={{ width: "25rem" }}
                    >
                        <div className="card-body text-danger h6 my-0">
                            You've been logged out due to inactivity!
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="d-flex flex-wrap justify-content-center mt-5">
                <div
                    className="card"
                    style={{ width: " 25rem ", height: "auto" }}
                >
                    <div className="card-body">
                        <h5 className="d-flex flex-wrap justify-content-center">
                            Login Form
                        </h5>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            onSubmit={(values, actions) => {
                                handleLogin(values);
                                actions.setSubmitting(false);
                            }}
                            validationSchema={loginSchema}
                        >
                            {(formikprops) => {
                                return (
                                    <Form onSubmit={formikprops.handleSubmit}>
                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor="email"
                                                className="form-label"
                                            >
                                                Email Addresss
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

                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor="password"
                                                className="form-label"
                                            >
                                                Password
                                            </label>
                                            <Field
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                            />
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="password" />
                                            </div>
                                        </div>

                                        <Link
                                            className="d-flex justify-content-end"
                                            to="/forgot-password"
                                        >
                                            Forgot Password?
                                        </Link>

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Login
                                        </button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerLogin;
