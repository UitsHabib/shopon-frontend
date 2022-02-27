import React from "react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage  } from "formik";

import { updateMyProfileSchema } from "../../shop.schema";
import { updateShopProfile } from "../../shop.actions";

const UpdateMyShopProfile = (props) => {
    const dispatch = useDispatch();

    const loggedInShop = useSelector((state) => state.shopReducer.loggedInShop);
    const currentdate = new Date();

    async function handleUpdateMyProfile(newMyProfile) {
        dispatch(
            updateShopProfile(newMyProfile)).then((res) => {
                window.location.href = "/my-shop-profile";
                toast.success("Profile Updated Successfully", {
                    backgroundColor: "#8329C5",
                    color: "#ffffff",
                });
            })
        .catch((err) => {
            toast.error(err.response.data, {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        });
    }

    return (
        <div className="d-flex flex-wrap justify-content-center">
            <div
                className="card mt-4"
                style={{ width: "30rem", height: "auto" }}
            >
                <h5 className=" mt-4 d-flex flex-wrap justify-content-center">
                    Update Your Profile
                </h5>

                <Formik
                    initialValues={{
                        id: loggedInShop.id,
                        name: loggedInShop.name,
                        description: loggedInShop.description
                            ? loggedInShop.description
                            : "",
                        email: loggedInShop.email,
                        license_number: loggedInShop.license_number
                            ? loggedInShop.license_number
                            : "",
                        updated_at: moment(currentdate).format(
                            "dddd, MMMM Do YYYY, h:mm:ss a"
                        ),
                    }}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        handleUpdateMyProfile(values);
                        actions.setSubmitting(false);
                    }}
                    validationSchema={updateMyProfileSchema}
                >
                    {(formikprops) => {
                        return (
                            <Form onSubmit={formikprops.handleSubmit}>
                                <div className="m-4">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="id"
                                            className="form-label"
                                        >
                                            ID
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="id"
                                            name="id"
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="id" />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="name"
                                            className="form-label"
                                        >
                                            Shop Name{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="name" />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            Email Address
                                        </label>
                                        <Field
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="email" />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="description"
                                            className="form-label"
                                        >
                                            Description
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            name="description"
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="description" />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="license_number"
                                            className="form-label"
                                        >
                                            License No.
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="license_number"
                                            name="license_number"
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="license_number" />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="is_active"
                                            className="form-label"
                                        >
                                            Status
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            is_active="is_active"
                                            name="is_active"
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="is_active" />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="updated_at"
                                            className="form-label"
                                        >
                                            Updated At
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            updated_at="updated_at"
                                            name="updated_at"
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback d-block">
                                            <ErrorMessage name="updated_at" />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap justify-content-between">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Update
                                        </button>
                                        <Link
                                            to="/my-shop-profile"
                                            className="btn btn-danger"
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default UpdateMyShopProfile;
