import { Field, Form, Formik, ErrorMessage } from 'formik';
import PermissionSchema from './schema/permission.schema';
import React, { useState } from 'react';
import axios from "axios";
const api_endPoint = "http://localhost:5000/api";
const Permission = (props) => {
    const [users, setUsers] = useState([]);
    const [permission, setPermission] = useState([]);


    // const handlePermission = async () => {

    //     const url = "http://localhost:5000/api/permissions";
    //     await axios.post(url, permission)
    //         .then((res) => {
    //             console.log(res);
    //             setPermission(res.data);
    //         })
    //         .catch((err) => console.log(err));
    // }

    // async function handleLogin(data) {
    //     try {
    //         const response = await axios.post(
    //             "http://localhost:5000/api/login",
    //             data, { withCredentials: true }
    //         );
    //         localStorage.setItem("access_token", response.data.access_token);
    //         console.log(response);
    //         // const access_token = response.headers["Set-Cookie"];
    //         // console.log(access_token);
    //         console.log("logged in ");
    //         // getUsers();

    //         // const navigate = useNavigate();
    //         //  navigate('/') ;
    //         // props.history.push("/");

    //         // window.location.href = "/";
    //     } catch (error) {
    //         console.log(error);
    //         alert("Error happened");
    //     }
    // }

    async function handleAddPermission(data) {
        try {
            const createUser = {
                title: data.title,
                type: data.type,
                description: data.description,
                services: data.services
            }
            const response = await axios.post(
                `http://localhost:5000/api/permissions`, createUser, { withCredentials: true });

            // props.history.push(`${props.history.state?.prevPath}`)
        }

        catch (error) {
            console.log(error);
            alert("Error happened");
        }
    }



    return (
        <Formik
            initialValues={{
                title: '',
                type: '',
                description: '',
                services: ''
            }}
            validationSchema={PermissionSchema}
            onSubmit={(values, actions) => {
                handleAddPermission(values);
                console.log(values);
                actions.setSubmitting(false);
            }}
        >
            {formikProps => (
                <Form onSubmit={formikProps.handleSubmit}>
                    <div className='form p-5'>
                        <div className="form-group">
                            <label className="form-label" htmlFor="title">Title<span className="text-danger">*</span> </label>
                            <Field className="form-control" type="text" id="title" name="title" />
                            <div className="invalid-feedback d-block"><ErrorMessage name="title" />  </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="type">Type</label>
                            <Field className="form-control" type="type" id="type" name="type" />
                            <div className="invalid-feedback d-block"><ErrorMessage name="type" />  </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="description">Description<span className="text-danger">*</span> </label>
                            <Field className="form-control" type="description" id="description" name="description" />
                            <div className="invalid-feedback d-block"><ErrorMessage name="description" />  </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="services">Services</label>
                            <Field className="form-control" type="services" id="services" name="services" />
                            <div className="invalid-feedback d-block"><ErrorMessage name="services" />  </div>
                        </div>

                        <button type="submit" className="btn btn-primary"> Submit </button>
                    </div>
                </Form>
            )}
        </Formik>
    );

}

export default Permission;
