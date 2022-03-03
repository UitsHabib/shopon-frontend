import { SignInSchema } from "../user.schema";
import { Formik, Field, form, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createUser } from "../user.actions";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { roleActions } from "../../role";
import { getProfiles } from "../user.actions";

 const UserForm = ({...rest}) => {
    
    const dispatch = useDispatch()

    const roles = useSelector(state => state.roleReducer.roleData.roles);
    const profiles = useSelector(state => state.userReducer.profileData.profiles);

    // roles?.map(role=> console.log(role.title));

    const handleSubmit = (values) => {
        console.log(values);
        const newAdmin = {
            profile_id: values.profile_id,
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
            confirm_password: values.confirmPassword,
            role_id: values.role_id,
        };
        dispatch(createUser(newAdmin))
        .then(response=> {
            toast("User Added Successfully", {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
            rest.onHide();
            
        })
        .catch(err => {
            toast.warn(err.response.data, {
                backgroundColor: "#ce0d0d",
                color: "#ffffff",
            });
        })
    };

    useEffect(() => {
        dispatch(roleActions.getRoles());
        dispatch(getProfiles());
    }, []);
    return(
        <Modal 
            {...rest}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title><h3>Create User</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                firstName: "",
                                lastName: "",
                                confirmPassword: "",
                                role_id: "",
                                profile_id: "",
                            }}
                            validationSchema={SignInSchema }
                            onSubmit={(values,action) => {
                                action.setSubmitting(false);
                                handleSubmit(values);
                            }}
                        >
                        {(formikProps) => {
                            return (
                                <form className="px-4 py-3" onSubmit={formikProps.handleSubmit}>
                                    {/* fname */}
                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="firstName"
                                                className="col-form-label"
                                            >
                                                First Name <span style={{'color':'red'}}> *</span>
                                            </label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                name="firstName"
                                            />
                                            <ErrorMessage name="firstName" />
                                        </div>
                                    </div>
                                    {/* lname */}
                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="lastName"
                                                className="col-form-label"
                                            >
                                                Last Name <span style={{'color':'red'}}> *</span>
                                            </label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                name="lastName"
                                            />
                                             <ErrorMessage name="lastName" />
                                        </div>
                                    </div>
                                    {/* email */}
                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="email"
                                                className="col-form-label"
                                            >
                                                Email <span style={{'color':'red'}}> *</span>
                                            </label>
                                            <Field
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                            />
                                             <ErrorMessage name="email" />
                                        </div>
                                    </div>
                                    {/* select profile */}
                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="profile_id"
                                                className="col-form-label"
                                            >
                                                Select Profile <span style={{'color':'red'}}> *</span>
                                            </label>
                                            <Field
                                                type="select"
                                                id="profile_id"
                                                name="profile_id"
                                                className="form-select"
                                                as="select"
                                            >
                                                <option value="choose">
                                                    Choose...
                                                </option>
                                                {profiles?.map((profile) => {
                                                    return (
                                                        <option
                                                            key={profile.id}
                                                            value={profile.id}
                                                        >
                                                            {profile.title}
                                                        </option>
                                                    );
                                                })}
                                            </Field>
                                             <ErrorMessage name="profile_id" />
                                        </div>
                                    </div>
                                    {/* select role */}
                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="role_id"
                                                className="col-form-label"
                                            >
                                                Select Role
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
                                                {roles?.map((role) => {
                                                    return (
                                                        <option
                                                            key={role.id}
                                                            value={role.id}
                                                        >
                                                            {role.title}
                                                        </option>
                                                    );
                                                })}
                                            </Field>
                                             <ErrorMessage name="role_id" />
                                        </div>
                                    </div>
                                    {/* pass */}
                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="password"
                                                className="col-form-label"
                                            >
                                                Password <span style={{'color':'red'}}> *</span>
                                            </label>
                                            <Field
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                            />
                                            <ErrorMessage name="password" />
                                        </div>
                                    </div>
                                     {/* cpassword */}           
                                    <div className="row g-3">
                                        <div className="col">
                                            <label
                                                htmlFor="confirmPassword"
                                                className="col-form-label"
                                            >
                                                Confirm Password <span style={{'color':'red'}}> *</span>
                                            </label>
                                            <Field
                                                type="password"
                                                className="form-control"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                values=""
                                            />
                                            <ErrorMessage name="confirmPassword" />
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Create
                                    </button>
                                </form>
                            );
                        }}
                        </Formik>
                    </div>

            
            </Modal.Body>
        </Modal>

    );
}

export default UserForm;