import React from "react";
import { useHistory, Link } from "react-router-dom";
import { registerSchema } from "../shop.schema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import { shopRegister } from "../shop.actions";
import { useDispatch } from "react-redux";

const ShopRegister = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    async function handleRegister(data) {
        const newShop = {
            name: data.name,
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            license_number: data.license_number,
        };
        dispatch(shopRegister(newShop))
            .then((response) => {
                props.location.state && props.location.state.from.pathname
                ? history.push(props.location.state.from.pathname)
                : history.push("/shop-login");
                toast.success("Shop Registered Successfully", {
                    backgroundColor: "#8329C5",
                    color: "#ffffff",
                });
            })
            .catch((error) => {
                toast.error(error, {
                    backgroundColor: "#8329C5",
                    color: "#ffffff",
                });
            });
    }

    return (
        <>
            <div className="d-flex flex-wrap justify-content-center mt-5">
                <div
                    className="card"
                    style={{ width: " 40rem ", height: "auto" }}
                >
                    <div className="card-body">
                        <h5 className="d-flex flex-wrap justify-content-center">
                            Register
                        </h5>
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                                confirm_password: "",
                                license_number: "",
                            }}
                            onSubmit={(values, actions) => {
                                handleRegister(values);
                                actions.setSubmitting(false);
                            }}
                            validationSchema={registerSchema}
                        >
                            {(formikprops) => {
                                return (
                                    <Form onSubmit={formikprops.handleSubmit}>
                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor="name"
                                                className="form-label"
                                            >
                                                Shop Name{" "}
                                                <span className="text-danger">
                                                    {" "}
                                                    *{" "}
                                                </span>
                                            </label>
                                            <Field
                                                type="name"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                            />
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="name" />
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor="email"
                                                className="form-label"
                                            >
                                                Email Addresss{" "}
                                                <span className="text-danger">
                                                    {" "}
                                                    *{" "}
                                                </span>
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
                                                Password{" "}
                                                <span className="text-danger">
                                                    {" "}
                                                    *{" "}
                                                </span>
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

                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor="confirm_password"
                                                className="form-label"
                                            >
                                                Confirm Password{" "}
                                                <span className="text-danger">
                                                    {" "}
                                                    *{" "}
                                                </span>
                                            </label>
                                            <Field
                                                type="password"
                                                className="form-control"
                                                id="confirm_password"
                                                name="confirm_password"
                                            />
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="confirm_password" />
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor="license_number"
                                                className="form-label"
                                            >
                                                License Number{" "}
                                                <span className="text-danger">
                                                    {" "}
                                                    *{" "}
                                                </span>
                                            </label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="license_number"
                                                name="license_number"
                                            />
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="license_number" />
                                            </div>
                                        </div>
                                        <p>Already have an account? Click <Link to="/shop-login">Login</Link> to continue.</p>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Register
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

export default ShopRegister;
