import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { getProfile, updateProfile, createProfile } from "../profile.actions";
import { permissionActions } from "../../permission";
import profileSchema from "../profile.schema";
import CheckboxGroup from "./checkbox-group.component";

const ProfileForm = ({ profileId, ...rest }) => {
    const { getPermissions } = permissionActions

    const dispatch = useDispatch();

    const profile = useSelector(state => state.profileReducer.profile);
    const permissionData = useSelector(state => state.permissionReducer.permissionData);

    useEffect(() => {
        if(profileId) dispatch(getProfile(profileId));
    }, [profileId]);

    useEffect(() => {
        dispatch(getPermissions(1));
    }, []);

    return (
        <Modal {...rest} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title><h3>{profileId ? 'Update Profile' : 'Create Profile'}</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    enableReinitialize
                    initialValues={
                        { 
                            title: profileId ? profile.title || '' : '',
                            description: profileId ? profile.description || '' : '',
                            permissions: profileId && Array.isArray(profile.profile_permissions) ? profile.profile_permissions.map(profile_permission => profile_permission.permission.id) : [],
                        }
                    }
                    onSubmit={(values, action) => {
                        if(profileId) {
                            dispatch(updateProfile(profileId, values))
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
                            dispatch(createProfile(values))
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
                    validationSchema={profileSchema}
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

                            <label><b>Permissions </b><span className="text-danger">*</span></label>
                            <CheckboxGroup name="permissions" options={permissionData.permissions} />
                            <div className="invalid-feedback d-block mb-3">
                                <ErrorMessage name="permissions" />
                            </div>

                            <button type="submit" className="btn btn-block text-white btn-secondary mt-4 p-2">
                                { profileId ? 'Update' : 'Create' }
                            </button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileForm;