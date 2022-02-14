import { SignInSchema } from "../user.schema";
import { Formik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";

const UserForm = () => {
    const [apiError, setapiError] = useState(null);
    const [role, setrole] = useState([]);

    const ApiSubmit = async (values) => {
        const newAdmin = {
            profile_id: 1,
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
            confirm_password: values.confirmPassword,
            role_id: values.role_id,
        };
        console.log(values);
        console.log(newAdmin);
        try {
            const response = await axios.post(
                "http://localhost:5000/api/users",
                newAdmin,
                { withCredentials: true }
            );
            console.log(response);
            if (response) {
                alert("User added");
            }
        } catch (e) {
            console.log(e.response.data);
            if (
                e.response.data ===
                "Already registered with this email address."
            ) {
                setapiError(e.response.data);
            }
        }
    };

    const getrole = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/roles",
                { withCredentials: true }
            );
            console.log(response.data);
            setrole(response.data);
        } catch (e) {
            console.log(e.response.data);
        }
    };
    useEffect(() => {
        getrole();
    }, []);

    return (
        <div
            className="container"
            style={{ maxWidth: "600px", backgroundColor: "#e3f2fd" }}
        >
            <h5 style={{ textAlign: "center" }}>Creat a New admin</h5>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    confirmPassword: "",
                    role_id: "",
                }}
                onSubmit={(values) => {
                    // console.log(values);
                    // alert(JSON.stringify(values, null, 2));
                    ApiSubmit(values);
                }}
                validationSchema={SignInSchema}
            >
                {({ errors }) => {
                    return (
                        <Form>
                            <div className="row g-3">
                                <div className="col">
                                    <label
                                        htmlFor="firstName"
                                        className="col-form-label"
                                    >
                                        First Name
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                    />
                                    {errors.firstName ? (
                                        <div className="invalid-feedback d-block">
                                            {errors.firstName}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label
                                        htmlFor="lastName"
                                        className="col-form-label"
                                    >
                                        Last Name
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                    />
                                    {errors.lastName ? (
                                        <div className="invalid-feedback d-block">
                                            {errors.lastName}
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
                                        htmlFor="confirmPassword"
                                        className="col-form-label"
                                    >
                                        Confirm Password
                                    </label>
                                    <Field
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        values=""
                                    />
                                    {errors.confirmPassword ? (
                                        <div className="invalid-feedback d-block">
                                            {errors.confirmPassword}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label
                                        htmlFor="role_id"
                                        className="col-form-label"
                                    >
                                        Role ID
                                    </label>
                                    <Field
                                        type="select"
                                        id="role_id"
                                        name="role_id"
                                        className="form-select"
                                        as="select"
                                    >
                                        <option value="choose">
                                            Choose...
                                        </option>
                                        {role.map((item) => {
                                            return (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.title}
                                                </option>
                                            );
                                        })}
                                    </Field>
                                    {errors.role_id ? (
                                        <div className="invalid-feedback d-block">
                                            {errors.role_id}
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <button
                                className="btn btn-primary m-2"
                                type="submit"
                            >
                                Register
                            </button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default UserForm;
