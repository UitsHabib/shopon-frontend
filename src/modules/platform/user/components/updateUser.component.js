import { useEffect, useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useRouteMatch } from "react-router-dom"; 
import {toast} from "react-toastify";

import { updateUserSchema } from "../user.schema";
import { getProfiles, getRoles, getUser, updateUser } from "../user.actions";

const UpdateUser = (props) => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const userID = props.location.state.data;
    
    const [dataImported, setDataImported] = useState(false);
   
    const roles = useSelector((state) => state.userReducer.roles);
    const user = useSelector((state) => state.userReducer.user);
    const profiles = useSelector((state) => state.userReducer.profiles);
    
    async function handleUpdateUser(data) {
        try {
            const updatedUser = {
                profile_id: data.profile_id,
                first_name: data.first_name,
                last_name : data.last_name,
                // email  : data.email,
                password  : data.password,
                role_id   : data.role_id,
            };
            console.log(updatedUser , data);
            await updateUser( userID , updatedUser );
            
            toast.success(`User ${user.first_name} ${user.last_name} updated`, 
            { backgroundColor: '#8329C5', color: '#ffffff', });
            props.history.push("/platform/users");
        } catch (error) {
            console.log(error);
            toast.warning(error.response, { backgroundColor: '#8329C5', color: '#ffffff', })
        }
    }
 
    useEffect(() => {
            dispatch(getProfiles()); 
            dispatch(getRoles());
            dispatch(getUser(userID));
            
            if(!dataImported)
                setDataImported(true);   
    }, [dataImported]);
    
    
    return (
        <>
            <button
                className="btn btn-success"
                onClick={() => {
                    setDataImported(false);
                    props.history.push("/platform/users");
                }}
                style={{ margin: "20px", marginLeft: "85%" }}
                >
                Go Back
            </button>
            <br />
            <div className="mx-5 text-center">
                <h3>Update User</h3>
            </div>
            {dataImported && user?.id ===userID && profiles && roles  ? (
                <div className="card bg-light " style={{ margin: "30px auto", maxWidth: "45rem" }}>
                    <Formik
                        initialValues={{
                            profile_id      : user.profile ? user.profile.id : "",
                            first_name      : user.first_name,
                            last_name       : user.last_name,
                            email           : user.email,
                            password        : user.password ? user.password : "" ,
                            confirm_password: user.confirm_password,
                            role_id         : user.role ? user.role.id : ""
                        }}
                        validationSchema={updateUserSchema}
                        onSubmit={(values, actions) => {
                            handleUpdateUser(values);
                            console.log(values);
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
                                        <option value={""} disabled={true}> Select a Profile </option>
                                        {
                                            profiles ?
                                            profiles.map((profile , index)=>  <option key={index} value={profile.id} >{profile.title}</option>)
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
                                         <option value={""} disabled={true}> Select a Role </option>
                                        {
                                            roles ?
                                            roles.map((role , index)=>  <option key={index} value={role.id} >{role.title}</option>)
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
                        User Not Found!
                    </p>
                </div>
            )}
        </>
    );
};

export default UpdateUser;
