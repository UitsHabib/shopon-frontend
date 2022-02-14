import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

import { updateUserSchema } from "../user.schema";

const api_endPoint = "http://localhost:5000/api";

const UpdateUser = (props) => {
    const usersID = props.location.state.data;
    const { path } = useRouteMatch();
    const [user, setUser] = useState();
    const [roles, setRoles] = useState();
    const [profiles, setProfiles] = useState();
    const [dataImported, setDataImported] = useState(false);

    const removeNull = (value) => {
        if (value === null) return "";
        if (!value) return "";
        return value;
    };

    async function updateUserAdmin(data) {
        try {
            const updatedUser = {
                profile_id: getProfile_id(data.profile_id),
                first_name: data.first_name,
                last_name : data.last_name,
                // email  : data.email,
                password  : data.password,
                role_id   : getRole_id(data.role_id),
            };

            await axios.patch(`http://localhost:5000/api/users/${usersID}`,updatedUser,{ withCredentials: true });
            
            alert(`User ${user.first_name} ${user.last_name} updated`);
            props.history.push("/platform/users");

            // props.history.push(`${props.history.state?.prevPath}`);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function getUser(user_id) {
        try {
            setDataImported(true);
            const {data} = await axios.get(`${api_endPoint}/users/${user_id}`,{ withCredentials: true });
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    }
    async function getRoles() {
        try {
            setDataImported(true);
            const {data} = await axios.get(`${api_endPoint}/roles`,{ withCredentials: true });
            setRoles(data);
        } catch (error) {
            console.log(error);
        }
    }
    async function getProfiles() {
        try {
            setDataImported(true);
            const {data} = await axios.get(`${api_endPoint}/profiles`,{ withCredentials: true });
            setProfiles(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getProfile_id = (title) => {
        if(title  && profiles){
        let profileID;
        profiles.filter(profile =>{ if (profile.title ===  title)profileID = profile.id;})
        return profileID;}
    }    
    const getRole_id = (title) => {
        if(title && roles){
        let roleID;
        roles.filter(role =>{ if(role.title ===  title)roleID = role.id; })
        return roleID;}
    }



    useEffect(() => {
        if (!dataImported) {
            getRoles();
            getProfiles();
            getUser(usersID);
        }
    }, [user, dataImported, roles , profiles]);

    return (
        <>
            <button
                className="btn btn-success"
                onClick={() => {
                    // props.history.push(`${props.history.state?.prevPath}`);
                    setDataImported(false);
                    props.history.push("/platform/users");
                    // console.log(`${props.history.state?.prevPath}`);
                }}
                style={{ margin: "20px", marginLeft: "85%" }}
            >
                Go Back
            </button>
            <br />
            <div className="mx-5 text-center">
                <h3>Update User</h3>
            </div>
            {user && profiles && roles ? (
                <div className="card bg-light " style={{ margin: "30px auto", maxWidth: "45rem" }}>
                    <Formik
                        initialValues={{
                            profile_id      : removeNull(profiles.find((profile) => profile.id === user.profile_id).title ),
                            first_name      : user.first_name,
                            last_name       : user.last_name,
                            email           : user.email,
                            password        : removeNull(user.password),
                            confirm_password: removeNull(user.confirm_password),
                            role_id         :  removeNull(roles.find((role) => role.id === user.role_id).title )
                        }}
                        validationSchema={updateUserSchema}
                        onSubmit={(values, actions) => {
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

                                <div
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
                                        disabled={true}
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
                                        htmlFor="profile_id"
                                    >
                                        Select Profile
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        className="form-control"
                                        as="select"
                                        id="profile_id"
                                        name="profile_id"
                                    >
                                        {
                                            profiles ?
                                            profiles.map((profile , index)=>{
                                                return <option key={index} >{profile.title}</option>;
                                            })
                                            : ""
                                        }
                                    </Field>
                                    <div className="invalid-feedback d-block">
                                        <ErrorMessage name="profile_id" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="role_id"
                                    >
                                        Select Role
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        className="form-control"
                                        as="select"
                                        id="role_id"
                                        name="role_id"
                                    >
                                        {
                                            roles ?
                                            roles.map((role , index)=>{
                                                return <option key={index} >{role.title}</option>;
                                            })
                                            : ""
                                        }

                                    </Field>
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
