import {toast} from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

import { updateUserSchema } from "../user.schema";
import { getProfiles, getRoles, getUser, updateUser } from "../user.actions";

const UpdateUser = (props) => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const usersID = props.location.state.data;
    
    const [user, setUser] = useState();
    const [roles, setRoles] = useState();
    const [profiles, setProfiles] = useState();
    const [dataImported, setDataImported] = useState(false);
    const [reload, setReload] = useState(1);

    const removeNull = (value) => {
        if (value === null) return "";
        if (!value) return "";
        return value;
    };

    async function handleUpdateUser(data) {
        try {
            const updatedUser = {
                profile_id: getProfile_id(data.profile_id),
                first_name: data.first_name,
                last_name : data.last_name,
                // email  : data.email,
                password  : data.password,
                role_id   : getRole_id(data.role_id),
            };

            await updateUser( usersID , updatedUser );
            
            toast.success(`User ${user.first_name} ${user.last_name} updated`, 
            { backgroundColor: '#8329C5', color: '#ffffff', });
            props.history.push("/platform/users");

            // props.history.push(`${props.history.state?.prevPath}`);
        } catch (error) {
            toast.warning(error.response.data, { backgroundColor: '#8329C5', color: '#ffffff', })
        }
    }

    const getRole_id = title => roles.find((role) => role.title === title).id;
    
    async function getUserDetails(user_id) {
        try {
            setDataImported(true);
            const {data} = await getUser(user_id);
            console.log("data" ,data);
            // setUser(data);
        } catch (error) {
            toast.warning(error.response.data, { backgroundColor: '#8329C5', color: '#ffffff', })
        }
    }
    async function getRolesList() {
        try {
            setDataImported(true);
            const {data} = await getRoles();
            // setRoles(data);
        } catch (error) {
            toast.warning(error.response.data, { backgroundColor: '#8329C5', color: '#ffffff', })
        }
    }
    async function getProfilesList() {
        try {
            setDataImported(true);
            const {data} = await getProfiles();
            // setProfiles(data);
        } catch (error) {
            toast.warning(error.response.data, { backgroundColor: '#8329C5', color: '#ffffff', })
        }
    }
    
    const nroles = useSelector((state) => state.userReducer.roles);
    const nuser = useSelector((state) => state.userReducer.user);
    const nprofiles = useSelector((state) => state.userReducer.profiles);
    const setAll = () =>{

        if(!roles)
        setRoles(nroles);
        if(!user)
        setUser(nuser);
        if(!profiles)
        setProfiles( nprofiles);
        
        console.log("User : " , user);
        console.log("profiles : " , profiles);
        console.log("Roles : " , roles)
        console.log("User : " , nuser);
        console.log("profiles : " , nprofiles);
        console.log("Roles : " , nroles)
    }

    const getProfile_id = title => profiles.find((profile) => profile.title === title).id;
    
   
    useEffect(() => {
        // if (!dataImported) {
            if(!profiles)
            dispatch(getProfiles());
            if(!roles)
            dispatch(getRoles());
            if(!user)
            dispatch(getUser(usersID));
            // setReload(!reload);

            // getRolesList();
            // getProfilesList();
            
            setAll();


            // getUserDetails(usersID);
        // } 
        if(reload <5){
            console.log(reload);
            setReload(reload +1);}
        if(user && profiles && roles ) 
        {
            console.log("User : " , user);
            console.log("profiles : " , profiles);
            console.log("Roles : " , roles);
            setDataImported(true);
        }   
    }, [dataImported  , user, profiles , roles ]);
    
    
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
                            handleUpdateUser(values);
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
                        User Not Found!
                    </p>
                </div>
            )}
        </>
    );
};

export default UpdateUser;
