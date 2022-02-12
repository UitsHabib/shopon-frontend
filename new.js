import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import updateAdminSchema from "./updateAdmin.schema";
const api_endPoint = "http://localhost:5000/api";

const UpdteAdmin = (props) => {
    console.log(props);

    const [users, setUsers] = useState([]);

    const [admin, setAdmin] = useState({
        email: "habiburrahman3089@gmail.com",
        password: "P@ssword123",
    });

    async function handleLogin(data) {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/login",
                data, { withCredentials: true }
            );
            localStorage.setItem("access_token", response.data.access_token);
            console.log(response);
            // const access_token = response.headers["Set-Cookie"];
            // console.log(access_token);
            console.log("loged in ");
            getUsers();

            // const navigate = useNavigate();
            //  navigate('/') ;
            // props.history.push("/");

            // window.location.href = "/";
        } catch (error) {
            console.log(error);
            alert("Error happened");
        }
    }
    async function updateUserAdmin(data) {
        try {
            const updatedUser = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                role_id: data.role_id,
            };
            const response = await axios.patch(
                `http://localhost:5000/api/users/${props.location.state.data}`,
                updatedUser, { withCredentials: true }
            );
            console.log(response);

            // window.location.href = "/p";
        } catch (error) {
            console.log(error);
            alert("Error happened");
        }
    }

    async function getUsers() {
        try {
            /** request to this api , then it will give response*/
            // const response = await axios.get(`${api_endPoint}/users` ,{headers : });
            const response = await axios.get(`${api_endPoint}/users`, { withCredentials: true });
            // const response = await axios.get(
            //     "http://localhost:5000/api/users/1"
            // );
            console.log(response);
            setUsers(response.data);
            console.log(response);
            console.log(response.data);

            // promise
            //     .then((response) => {
            //         console.log(response);
            //         const data = response.data;
            //         setUsers(data);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //         console.log('Eita error');
            //     });

            console.log("Himel");
        } catch (error) {
            console.log("Eita error");
            console.log(error);
        }
    }
    useEffect(() => {
        handleLogin(admin);
        // getUsers();
    }, []);

    return (
        <>
            <button
                onClick={() => {
                    props.history.push("/p");
                }}
                style={{ margin: "20px", marginLeft: "90%" }}
            >
                Go Back
            </button>
            <br />
            update user {props.location.state?.data}
            <hr />
            <div
                className="card bg-light"
                style={{ margin: "auto", maxWidth: "45rem" }}
            >
                <Formik
                    initialValues={{
                        first_name: "",
                        last_name: "",
                        email: "",
                        password: "",
                        confirm_password: "",
                        agree: "",
                        role_id: "",
                    }}
                    validationSchema={updateAdminSchema}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        console.log(values.first_name);
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
                                    htmlFor="first_name"
                                >
                                    First Name
                                    <span className="text-danger">*</span>{" "}
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
                                    <span className="text-danger">*</span>{" "}
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

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">
                                    Email<span className="text-danger">*</span>{" "}
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
                            </div>

                            <div className="form-group">
                                <label
                                    className="form-label"
                                    htmlFor="password"
                                >
                                    Password
                                    <span className="text-danger">*</span>{" "}
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
                                    <span className="text-danger">*</span>{" "}
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
                                <label className="form-label" htmlFor="role_id">
                                    Role ID
                                    <span className="text-danger">*</span>{" "}
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

                            <button type="submit" className="btn btn-warning">
                                Update
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default UpdteAdmin;
