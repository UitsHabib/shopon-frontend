import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { CustomerSignUpSchema } from "../customer.schema";
import { signUpCustomer } from "../customer.actions";

const CustomerSignUp = (props) => {
    const [apiError, setapiError] = useState(null);

    const handleSubmit = async (values) => {
        const newCustomer = {
            username: values.username,
            email: values.email,
            password: values.password,
            confirm_password: values.confirm_password,
        };

        try {
            const response = await signUpCustomer(newCustomer);
            if (response) {
                toast("User Added Successfully", {
                    backgroundColor: "#8329C5",
                    color: "#ffffff",
                });
            }
        } catch (e) {
            console.log(e.response.data);
            toast.warn(e.response.data, {
                backgroundColor: "#ce0d0d",
                color: "#ffffff",
            });
            if (
                e.response.data ===
                "Already registered with this email address."
            ) {
                setapiError(e.response.data);
            }
        }
    };

    return (
        <div className="d-flex flex-wrap justify-content-center mt-5">
            <div className="card" style={{ width: " 50rem ", height: "auto" }}>
                <div className="card-body">
                    <h5 className="d-flex flex-wrap justify-content-center">
                        Customer SignUp Form
                    </h5>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            username: "",
                            confirm_password: "",
                        }}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values);
                            handleSubmit(values);
                            resetForm();
                        }}
                        validationSchema={CustomerSignUpSchema}
                    >
                        {({ errors }) => {
                            return (
                                <Form className="px-4 py-3">
                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="username"
                                                className="col-form-label"
                                            >
                                                UserName
                                            </label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name="username"
                                            />
                                            {errors.username ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.username}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="email"
                                                className="col-form-label"
                                            >
                                                Email
                                            </label>
                                            <Field
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                            />
                                            {errors.email ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.email}
                                                </div>
                                            ) : null}
                                            {apiError ? (
                                                <div className="invalid-feedback d-block">
                                                    {apiError}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="password"
                                                className="col-form-label"
                                            >
                                                Password
                                            </label>
                                            <Field
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                            />
                                            {errors.password ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.password}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="confirm_password"
                                                className="col-form-label"
                                            >
                                                Confirm Password
                                            </label>
                                            <Field
                                                type="password"
                                                className="form-control"
                                                id="confirm_password"
                                                name="confirm_password"
                                                values=""
                                            />
                                            {errors.confirm_password ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.confirm_password}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary m-2"
                                        type="submit"
                                    >
                                        Create
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

export default CustomerSignUp;
