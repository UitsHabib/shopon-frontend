import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

import getLoggedInUser from "../../../../../core/service/get-logged-in-user";
import { updateMyProfileSchema } from "../my-profille.schema"

const UpdateMyProfile = (props) => {
    const history = useHistory();
    const { path } = useRouteMatch();
    
    //const [roles, setRoles] = useState(["Role 1", "Role 2", "Role 3", "Role 4", "Role 5"]);

    const [currentUser, setCurrentUser] = useState(getLoggedInUser());
    //currentUser.role_id = ["Role 1", "Role 2"];
    //console.log(currentUser.role_id);

    const api = "http://localhost:5000/api";

    async function updateMyProfile(newMyProfile) {
        const newProfile = {
            first_name: newMyProfile.first_name,
            last_name: newMyProfile.last_name,
            status: newMyProfile.status,
            phone: newMyProfile.phone,
        };

        try {
            const { data } = await axios.patch(
                `${api}/users/${currentUser.id}`,
                newProfile,
                { withCredentials: true }
            );
            //console.log(data);
            localStorage.setItem("loggedInUser", JSON.stringify(data));
            history.push("/my-profile");
            
        } catch (error) {
            alert("Error Happend!");
        }
    }

    // async function getRoles() {
    //     try {
    //         const { data } = await axios.get(`${api}/roles`, {
    //             withCredentials: true,
    //         });
    //         //console.log(data);
    //         //setRoles(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getRoles();
    // }, []);

    return (
        <div className="d-flex flex-wrap justify-content-center">
            <div
                className="card mt-4"
                style={{ width: "30rem", height: "auto" }}
            >
                <h5 className=" mt-4 d-flex flex-wrap justify-content-center">
                    Update Your Profile
                </h5>

                <Formik
                    initialValues={{
                        id: currentUser.id,
                        profile_id: currentUser.profile_id,
                        first_name: currentUser.first_name,
                        last_name: currentUser.last_name,
                        email: currentUser.email,
                        phone: currentUser.phone ? currentUser.phone : "",
                    }}

                    onSubmit={(values, actions) => {
                        //console.log(values);
                        updateMyProfile(values);
                        actions.setSubmitting(false);
                    }}
                    
                    validationSchema={updateMyProfileSchema}
                >
                    {(formikprops) => {
                        return (
                            <Form onSubmit={formikprops.handleSubmit}>
                                <div className="m-4">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="id"
                                            className="form-label"
                                        >
                                            ID
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="id"
                                            name="id"
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="id" />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="first_name"
                                            className="form-label"
                                        >
                                            First Name
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="first_name"
                                            name="first_name"
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="first_name" />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="last_name"
                                            className="form-label"
                                        >
                                            Last Name
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="last_name"
                                            name="last_name"
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="last_name" />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            Email Address
                                        </label>
                                        <Field
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="email" />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="phone"
                                            className="form-label"
                                        >
                                            Phone No.
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="phone" />
                                        </div>
                                    </div>

                                    {/* <div className="form-group mb-3">
                                        <label
                                            htmlFor="role_id"
                                            className="form-label"
                                        >
                                            Roles 
                                        </label>
                                        <br />
                                        {roles.map((role, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Field
                                                        type="checkbox"
                                                        value={role}
                                                        className="mx-2 leading-tight"
                                                        id="role_id"
                                                        name="role_id"
                                                    />
                                                    <span className="text-sm">
                                                        {role}
                                                    </span>
                                                    <div className="invalid-feedback d-block">
                                                        <ErrorMessage name="role_id" />
                                                    </div>
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="status"
                                            className="form-label"
                                        >
                                            Active Status
                                        </label>
                                        <Field
                                            name="status"
                                            value="On"
                                            className="mx-2 leading-tight"
                                            type="radio"
                                        />
                                        <span className="text-sm">On</span>
                                        <Field
                                            name="status"
                                            value="Off"
                                            className="mx-2 leading-tight"
                                            type="radio"
                                        />
                                        <span className="text-sm">
                                           Off
                                        </span>
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="status" />
                                        </div>
                                    </div> */}

                                    <div className="d-flex flex-wrap justify-content-between">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Update
                                        </button>
                                        <Link to="/my-profile"
                                            className="btn btn-danger"
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default UpdateMyProfile;
