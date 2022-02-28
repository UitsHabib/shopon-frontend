import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";

import { getServices } from "../permission.actions";
import PermissionSchema from "../permission.schema";
import CheckboxGroup from "./checkbox-group.component";

const PermissionForm = ({ onSubmit, initialValues, buttonName }) => {
    const dispatch = useDispatch();

    const services = useSelector(state => state.permissionReducer.services);

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

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
                            <label htmlFor="title" className="mb-1">
                                <b>Title</b> 
                                <span className="text-danger"> *</span>
                            </label>
                            <Field
                                className="form-control"
                                id="title"
                                placeholder="Title"
                                name="title"
                            />
                            <div className="invalid-feedback d-block mb-3">
                                <ErrorMessage name="title" />
                            </div>

                            <label htmlFor="description" className="mb-1">
                                <b>Description </b>
                                <span className="text-danger"> *</span>
                            </label>
                            <Field
                                className="form-control"
                                id="description"
                                as="textarea"
                                placeholder="Description"
                                name="description"
                            />
                            <div className="invalid-feedback d-block mb-3">
                                <ErrorMessage name="description" />
                            </div>

                            <label htmlFor="title" className="mb-1">
                                <b>Services</b> 
                                <span className="text-danger"> *</span>
                            </label>
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
