import { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";

import { getServices } from "../permission.actions";
import PermissionSchema from "../permission.schema";
import CheckboxGroup from "./checkbox-group.component";

const PermissionForm = ({ onSubmit, initialValues, buttonName }) => {
    const [services, setServices] = useState([]);

    const getserviceData = async () => {
        try {
            const { data } = await getServices();
            setServices(data.services);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getserviceData();
    }, []);

    return (
        <div className="row justify-content-center">
            <div className="col-5">
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={async (values, action) => {
                        await onSubmit(values);
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

                            <button className="btn btn-primary" type="submit">{buttonName}</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PermissionForm;
