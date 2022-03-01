import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { Field, Form, Formik, ErrorMessage } from "formik";

import { createPermission, getPermission, updatePermission } from "../permission.actions";
import { getServices } from "../../services/service.actions";
import PermissionSchema from "../permission.schema";
import CheckboxGroup from "./checkbox-group.component";

const PermissionForm = ({ permissionId, ...rest }) => {
    const dispatch = useDispatch();

    const permission = useSelector(state => state.permissionReducer.permission);
    const serviceData = useSelector(state => state.serviceReducer.serviceData);

    useEffect(() => {
        if(permissionId) dispatch(getPermission(permissionId));
    }, [dispatch, permissionId]);

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

    return (
        <Modal 
            {...rest}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title><h3>{permissionId ? 'Update Permission' : 'Create Permission'}</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div>
                        <Formik
                            enableReinitialize
                            initialValues={
                                { 
                                    title: permissionId ? permission.title || '' : '',
                                    description: permissionId ? permission.description || '' : '',
                                    services: permissionId && Array.isArray(permission.permission_services) ? permission.permission_services.map(permission_service => permission_service.service.id) : [],
                                }
                            }
                            onSubmit={(values, action) => {
                                if(permissionId) {
                                    dispatch(updatePermission(permissionId, values))
                                        .then(res => {
                                            toast.success('Successfuly Updated');
                                            rest.onHide();
                                            action.resetForm();
                                        })
                                        .catch(err => {
                                            const errorMessage = typeof err.response.data === 'string' ? err.response.data : err.response.statusText;
                                            toast.error(errorMessage);
                                        })

                                } else {
                                    dispatch(createPermission(values))
                                        .then(res => {
                                            toast.success("Successfuly Created");
                                            rest.onHide();
                                            action.resetForm();
                                        })
                                        .catch(err => {
                                            toast.error(err);
                                        })
                                }
                                action.resetForm();
                                action.setSubmitting(false);
                            }}
                            validationSchema={PermissionSchema}
                        >
                            {(formikProps) => (
                                <Form onSubmit={formikProps.handleSubmit}>
                                    <label><b>Title </b><span className="text-danger">*</span></label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        placeholder="Title"
                                        name="title"
                                    />
                                    <div className="invalid-feedback d-block mb-3">
                                        <ErrorMessage name="title" />
                                    </div>

                                    <label><b>Description </b><span className="text-danger">*</span></label>
                                    <Field
                                        className="form-control"
                                        as="textarea"
                                        placeholder="Description"
                                        name="description"
                                    />
                                    <div className="invalid-feedback d-block mb-3">
                                        <ErrorMessage name="description" />
                                    </div>

                                    <label><b>Services </b><span className="text-danger">*</span></label>
                                    <CheckboxGroup name="services" options={serviceData.services} />
                                    <div className="invalid-feedback d-block mb-3">
                                        <ErrorMessage name="services" />
                                    </div>

                                    <button type="submit" className="btn btn-block text-white btn-secondary mt-4 p-2">
                                        { permissionId ? 'Update' : 'Create' }
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
            </Modal.Body>
        </Modal>
    );
};

export default PermissionForm;
