import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { Field, Form, Formik, ErrorMessage } from "formik";

import CheckboxGroup from "./checkbox-group.component";
import {
    createProfile,
    getPermissions,
    getProfile,
    updateProfile,
} from "../profile.actions";
import { profileCreateSchema } from "../profile.schema";

const ProfileForm = ({ profileId, ...rest }) => {
    const dispatch = useDispatch();

    const [permissions, setPermissions] = useState([]);

    const profile = useSelector((state) => state.profileReducer.profile);

    //fetch permission data from database
    async function getPermissionList() {
        try {
            const { data } = await getPermissions();
            setPermissions(data.permissions);
        } catch {
            console.log("error while getting permissions");
        }
    }

    useEffect(() => {
        getPermissionList();
    }, []);

    useEffect(() => {
        if (profileId) dispatch(getProfile(profileId));
    }, [dispatch, profileId]);

    return (
        <Modal {...rest} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>{profileId ? "Update Profile" : "Create Profile"}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            title: profileId ? profile.title || "" : "",
                            description: profileId
                                ? profile.description || ""
                                : "",
                            permissions:
                                profileId &&
                                Array.isArray(profile.profile_permissions)
                                    ? profile.profile_permissions.map(
                                          (profile_permission) =>
                                              profile_permission.permission.id
                                      )
                                    : [],
                        }}
                        onSubmit={(values, action) => {
                            if (profileId) {
                                dispatch(
                                    updateProfile(
                                        profileId,
                                        values.title,
                                        values.description,
                                        values.permissions
                                    )
                                )
                                    .then((res) => {
                                        toast.success("Successfuly Updated");
                                        rest.onHide();
                                        action.resetForm();
                                    })
                                    .catch((err) => {
                                        const errorMessage =
                                            typeof err.response.data ===
                                            "string"
                                                ? err.response.data
                                                : err.response.statusText;
                                        toast.error(errorMessage);
                                    });
                            } else {
                                dispatch(createProfile(values))
                                    .then((res) => {
                                        toast.success("Successfully Created");
                                        rest.onHide();
                                        action.resetForm();
                                    })
                                    .catch((err) => {
                                        toast.error("Already profile exits");
                                    });
                            }
                            action.resetForm();
                            action.setSubmitting(false);
                        }}
                        validationSchema={profileCreateSchema}
                    >
                        {(formikProps) => (
                            <Form onSubmit={formikProps.handleSubmit}>
                                <label>
                                    <b>Title </b>
                                    <span className="text-danger">*</span>
                                </label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                />
                                <div className="invalid-feedback d-block mb-3">
                                    <ErrorMessage name="title" />
                                </div>

                                <label>
                                    <b>Description </b>
                                    <span className="text-danger">*</span>
                                </label>
                                <Field
                                    className="form-control"
                                    as="textarea"
                                    placeholder="Description"
                                    name="description"
                                />
                                <div className="invalid-feedback d-block mb-3">
                                    <ErrorMessage name="description" />
                                </div>

                                <label>
                                    <b>Select Permission</b>{" "}
                                    <span className="text-danger">*</span>{" "}
                                    <i
                                        type="button"
                                        className="bi bi-question-circle-fill"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="At least one permission is required"
                                    ></i>
                                </label>
                                <CheckboxGroup
                                    name="permissions"
                                    options={permissions}
                                />
                                <div className="invalid-feedback d-block mb-3">
                                    <ErrorMessage name="permissions" />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-block text-white btn-secondary mt-4 p-2"
                                >
                                    {profileId ? "Update" : "Create"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileForm;
