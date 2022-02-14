import { useEffect, useState } from "react";
import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import PermissionSchema from "../permission.schema";
import CheckboxGroup from "./checkboxGroup.component";

const baseUrl = "http://localhost:5000";

const PermissionForm = ({ onPermissionSubmit, initialValues }) => {
    const [services, setServices] = useState([]);

    const getServices = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/services`, {
                withCredentials: true,
            });
            setServices(response.data.services);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    return (
        <div className="row justify-content-center">
            <div className="col-5">
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={async (values, action) => {
                        await onPermissionSubmit(values);
                        action.resetForm();
                        action.setSubmitting(false);
                    }}
                    validationSchema={PermissionSchema}
                >
                    {(formikProps) => (
                        <Form onSubmit={formikProps.handleSubmit}>
                            <Field
                                className="form-control"
                                as="textarea"
                                placeholder="Title"
                                name="title"
                            />
                            <div className="invalid-feedback d-block mb-3">
                                <ErrorMessage name="title" />
                            </div>

                            <Field
                                className="form-control"
                                as="textarea"
                                placeholder="Description"
                                name="description"
                            />
                            <div className="invalid-feedback d-block mb-3">
                                <ErrorMessage name="description" />
                            </div>

                            <div>Services</div>
                            <CheckboxGroup name="services" options={services} />
                            <div className="invalid-feedback d-block mb-3">
                                <ErrorMessage name="services" />
                            </div>

                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PermissionForm;
