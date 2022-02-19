import { Formik, Field, Form } from "formik";
import { SignInSchema } from "../customer.schema";
import { toast } from "react-toastify";

function UpdateCustomer({ onUpdateProfile, isUpdate, item, onCloseModal }) {
    console.log(item);
    return (
        <div className="modal" style={{ display: isUpdate ? "block" : "none" }}>
            <div className="modal-dialog">
                <div
                    className="modal-content"
                    style={{
                        width: "100%",
                        marginLeft: "10%",
                        marginTop: "10%",
                        border: "1px solid gray",
                        boxShadow: "1px 1px 10px gray",
                        borderRadius: "10px",
                        padding: "20px",
                    }}
                >
                    <div className="container">
                        <div className="modal-header">
                            <h5 className="modal-title">Update a user</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={onCloseModal}
                            >
                                <span>&times;</span>
                            </button>
                        </div>

                        <Formik
                            initialValues={{
                                id: item.id,
                                first_name: item.first_name,
                                last_name: item.last_name,
                                email: item.email,
                                gender: item.gender,
                                ip_address: item.ip_address,
                            }}
                            onSubmit={(values) => {
                                toast("Customer Updated", {
                                    backgroundColor: "#8329C5",
                                    color: "#ffffff",
                                });
                                console.log(values);
                                onUpdateProfile(values);

                                // alert(JSON.stringify(values, null, 2));
                            }}
                            validationSchema={SignInSchema}
                            enableReinitialize
                        >
                            {({ errors }) => {
                                return (
                                    <Form className="px-4 py-3">
                                        <div className="row g-3">
                                            <div className="col">
                                                <label
                                                    htmlFor="first_name"
                                                    className="col-form-label"
                                                >
                                                    First Name
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="first_name"
                                                    name="first_name"
                                                />
                                                {errors.first_name ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.first_name}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col">
                                                <label
                                                    htmlFor="last_name"
                                                    className="col-form-label"
                                                >
                                                    Last Name
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="last_name"
                                                    name="last_name"
                                                />
                                                {errors.last_name ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.last_name}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col">
                                                <label
                                                    htmlFor="email"
                                                    className="col-form-label"
                                                >
                                                    Email
                                                </label>
                                                <Field
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                />
                                                {errors.email ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.email}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col">
                                                <label
                                                    htmlFor="gender"
                                                    className="col-form-label"
                                                >
                                                    Gender
                                                </label>
                                                <Field
                                                    type="select"
                                                    className="form-select"
                                                    id="gender"
                                                    name="gender"
                                                    as="select"
                                                >
                                                    <option value="choose">
                                                        Choose...
                                                    </option>
                                                    <option value="Male">
                                                        Male
                                                    </option>
                                                    <option value="Female">
                                                        Female
                                                    </option>
                                                </Field>

                                                {errors.gender ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.gender}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col">
                                                <label
                                                    htmlFor="ip_address"
                                                    className="col-form-label"
                                                >
                                                    Ip Address
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="ip_address"
                                                    name="ip_address"
                                                    values=""
                                                />
                                                {errors.ip_address ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.ip_address}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-primary m-2"
                                            type="submit"
                                        >
                                            Update
                                        </button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCustomer;
