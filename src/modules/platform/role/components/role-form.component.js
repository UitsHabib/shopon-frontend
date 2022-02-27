import { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import { createRole, updateRole, getRole } from "../role.actions";
import ToggleList from "../../../core/components/toggle-list.component";
import { getAllPermissions } from "../../permission/permission.actions";
import { roleCreateSchema } from "../role.schema";

const ToggleListSlider = (props) => (
    <ToggleList {...props} >
        {
            ({ id, name, label, value, isChecked, onChange, disabled }) =>
            <label key={id} className="form-label d-flex justify-content-between align-items-center col-12 col-sm-6">
                <span className="switch-label">{label}</span>
                <span className="switch">
                    <input name={name}
                        className="form-check-input"
                        type="checkbox"
                        value={value}
                        id={id}
                        checked={isChecked}
                        onChange={onChange}
                        disabled={disabled}
                    />
                    <span className="slider round"></span>
                </span>
            </label>
        }
    </ToggleList>
);

const RoleForm = ({ roleId, ...rest }) => {
    const dispatch = useDispatch();

    const role = useSelector(state => state.roleReducer.role);
    const permissionData = useSelector(state => state.permissionReducer.permissionData);
    
    useEffect(() => {
        if(roleId) dispatch(getRole(roleId));
    }, [roleId]);

    useEffect(() => {
        dispatch(getAllPermissions());
    }, []);

    return (
        <Modal 
            {...rest}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title><h3>{roleId ? 'Update Role' : 'Create Role'}</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div>
                        <Formik
                            initialValues={{
                                title: roleId ? role.title || '' : '',
                                description: roleId ? role.description || '' : '',
                                permissions: roleId && Array.isArray(role.role_permissions) ? role.role_permissions.map(rolePermission => rolePermission.permission.id) : [],
                            }}
                            validationSchema={roleCreateSchema}
                            enableReinitialize={true}
                            onSubmit={(values, action) => {
                                if(roleId) {
                                    dispatch(updateRole(roleId, values))
                                        .then(res => {
                                            toast.success('Successfuly Updated');
                                            rest.onHide();
                                            action.resetForm();
                                        })
                                        .catch(err => {
                                            const errorMessage = typeof err.response.data === 'string' ? err.response.data : err.response.statusText;
                                            toast.error(errorMessage);
                                        });
                                }
                                else {
                                    dispatch(createRole(values))
                                        .then(res => {
                                            toast.success('Successfuly Created');
                                            rest.onHide();
                                            action.resetForm();
                                        })
                                        .catch(err => {
                                            const errorMessage = typeof err.response.data === 'string' ? err.response.data : err.response.statusText;
                                            toast.error(errorMessage);
                                        });
                                }
                            }}
                        >
                            {formikProps => {
                                return (
                                    <Form onSubmit={formikProps.handleSubmit}>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="title" className="col-form-label" > Title </label> <span className="text-danger">*</span>
                                                    <Field type="text" className="form-control" id="title" name="title" />
                                                    <div className="invalid-feedback"><ErrorMessage name="title" /></div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="description" className="col-form-label" > Description </label> <span className="text-danger">*</span>
                                                    <Field type="text" className="form-control" id="description" name="description" component="textarea" />
                                                    <div className="invalid-feedback"><ErrorMessage name="description" /></div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="form-group">
                                                        <label className="form-label fw-bold">Select Permissions</label> <span className="text-danger">*</span>
                                                        {permissionData.permissions?.length ?
                                                            <div className="row">
                                                                <ToggleListSlider 
                                                                    name="permissions" 
                                                                    options={permissionData.permissions} 
                                                                    valueExtractor={item => item.id} 
                                                                    idExtractor={item => item.id} 
                                                                    labelExtractor={item => item.title} 
                                                                />
                                                            </div> :
                                                            <div>
                                                                No custom permission set found. 
                                                                <Link 
                                                                    className="text-secondary" 
                                                                    to={{ pathname: "/platform/permissions", state: { showCreateModal: true } }}  
                                                                > 
                                                                    Click here to create one.
                                                                </Link>
                                                            </div>
                                                        }
                                                        <div className="invalid-feedback col-12"><ErrorMessage name="permissionsError" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-block text-white btn-secondary mt-4 p-2">
                                            { roleId ? 'Update' : 'Create' }
                                        </button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>

                {/* <Modal.Footer>
                    <button variant="secondary">Close</button>
                    <button variant="primary">Save changes</button>
                </Modal.Footer> */}
            </Modal.Body>
        </Modal>
    );
};

export default RoleForm;
