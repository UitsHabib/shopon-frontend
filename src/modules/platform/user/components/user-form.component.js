import { useEffect, useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";
import {toast} from "react-toastify";
import Modal from 'react-bootstrap/Modal';

import { updateUserSchema } from "../user.schema";
import { getUser, updateUser, createUser } from "../user.actions";
import {getRoles} from "../../role/role.actions"
import {getProfiles} from "../../profile/profile.actions"

const UserForm = (props) => {
    const dispatch = useDispatch();
    const userID = props.id;
    const updating = props.updating === "true" ? true : false;
    const {resetAction , toggleNeedToFecthUsers , ...rest} = props;
    
    const [dataImported, setDataImported] = useState(false);
   
    const roles = useSelector((state) => state.roleReducer.roleData.roles);
    const user = useSelector((state) => state.userReducer.user);
    const profiles = useSelector((state) => state.profileReducer?.profileData?.profiles);
    
    function handleUpdateUser(data) {
            const updatedUser = {
                profile_id: data.profile_id,
                first_name: data.first_name,
                last_name : data.last_name,
                role_id   : data.role_id,
            };
            if(!updating){
                updatedUser.email  = data.email;
                updatedUser.password = data.password; 
                updatedUser.confirm_password = data.confirm_password;
            }

            if(updating){ 
                dispatch(updateUser( userID , updatedUser ))
                    .then(() => {
                        toast.success(`User ${user.first_name} ${user.last_name} updated`);
                        rest.onHide();
                        toggleNeedToFecthUsers();
                        resetAction({});
                    })
                    .catch(err => {
                        const errorMessage = typeof err.response?.data === 'string' ? err.response?.data : err.response?.statusText;
                        toast.error(errorMessage);
                    });}
                else {
                    dispatch(createUser(updatedUser))
                        .then(() => {
                            toast.success('Successfuly Created');
                            rest.onHide();
                            toggleNeedToFecthUsers();
                            resetAction({});
                        })
                        .catch(err => {
                            const errorMessage = typeof err.response.data === 'string' ? err.response.data : err.response.statusText;
                            toast.error(errorMessage);
                        });
                }
    }
 
    useEffect(() => {
            dispatch(getProfiles()); 
            dispatch(getRoles());
            if(userID)
                dispatch(getUser(userID));
            
            if(!dataImported)
                setDataImported(true);   
    }, [dataImported , dispatch , userID]);
    
    
    return (
        <> 
            <Modal 
            {...rest}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="mx-5 text-center">
                        <h3> {updating ? "Update" : "Create" } User</h3>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            {dataImported && (updating ? userID===user?.id : true) ? (
                <div className="card bg-light " style={{ margin: "30px auto", maxWidth: "45rem" }}>
                    <Formik
                        initialValues={{
                            profile_id      : updating ? (user?.profile ? user?.profile.id : "") : "",
                            first_name      : updating ? (user?.first_name) : "",
                            last_name       : updating ? (user?.last_name) : "",
                            email           : updating ? (user?.email) : "",
                            password        : updating ? "1" : "",
                            confirm_password: updating ? "1" : "",
                            role_id         : updating ? (user?.role ? user.role.id : "") : "" 
                        }}
                        validationSchema={updateUserSchema}
                        onSubmit={(values, actions) => {
                            handleUpdateUser(values);
                            actions.setSubmitting(true);
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
                                        disabled={updating}
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
                                    { updating ? "Update" : "Create"}
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
            </Modal.Body>
        </Modal>
        </>
    );
};

export default UserForm;
