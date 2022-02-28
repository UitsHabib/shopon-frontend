import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

import { NewProductSchema } from "../products.schema";
import { addNewProduct, getProduct, updateProduct } from "../products.actions";
import ToggleList from "../../../../core/components/toggle-list.component"

const ToggleListSlider = (props) => (
    <ToggleList {...props}>
        {({ id, name, label, value, isChecked, onChange, disabled }) => (
            <label
                key={id}
                className="form-label d-flex justify-content-between align-items-center col-12 col-sm-6"
            >
                <span className="switch-label">{label}</span>
                <span className="switch">
                    <input
                        name={name}
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
        )}
    </ToggleList>
);

const ProductForm = ({ productId, needToFetch, fetch, ...rest }) => {
    const dispatch = useDispatch();

    const product = useSelector((state) => state.productsReducer.product);

    const categories = ["123"];

    useEffect(() => {
        if (productId) dispatch(getProduct(productId));
    }, [productId]);

    return (
        <Modal {...rest} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>{productId ? "Update Product" : "Add Product"}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Formik
                        initialValues={{
                            id: productId ? product.id || "" : "",
                            name: productId ? product.name || "" : "",
                            category_id: productId ? product.category_id || "" : "",
                            description: productId ? product.description || "" : "",
                            price: productId ? product.price || "" : "",
                            discount: productId ? product.discount || "0" : "0",
                            stock_quantity: productId ? product.stock_quantity || "" : "",
                        }}
                        validationSchema={NewProductSchema}
                        enableReinitialize={true}
                        onSubmit={(values, action) => {
                            if (productId) {
                                dispatch(updateProduct(values))
                                    .then((res) => {
                                        toast.success("Successfuly Updated");
                                        fetch(!needToFetch);
                                        rest.onHide();
                                        action.resetForm();
                                    })
                                    .catch((err) => {
                                        const errorMessage = typeof err.response.data === "string" ? err.response.data : err.response.statusText;
                                        toast.error(errorMessage);
                                    });
                            } else {
                                dispatch(addNewProduct(values))
                                    .then((res) => {
                                        toast.success("Successfuly Created");
                                        fetch(!needToFetch);
                                        rest.onHide();
                                        action.resetForm();
                                    })
                                    .catch((err) => {
                                        const errorMessage = typeof err.response.data === "string" ? err.response.data : err.response.statusText;
                                        toast.error(errorMessage);
                                    });
                            }
                        }}
                    >
                        {(formikProps) => {
                            return (
                                <Form onSubmit={formikProps.handleSubmit}>
                                    <div className="m-4">
                                        <div className="form-group mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Product Name{" "}
                                                <span className="text-danger"> * </span>
                                            </label>
                                            <Field
                                                type="text"
                                                className="form-control required"
                                                id="name"
                                                name="name"
                                            />
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="name" />
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="category_id" className="form-label">
                                                Category{" "} <span className="text-danger"> * </span>
                                            </label>
                                            <Field
                                                type="number"
                                                className="form-control"
                                                id="category_id"
                                                name="category_id"
                                                as="select"
                                            >
                                                <option value="">Click to Select A Category</option>
                                                {
                                                    categories.map(category => {
                                                        return <option value={`${category}`}>
                                                        {`${category}`}
                                                    </option>
                                                    })
                                                }
                                                
                                            </Field>
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="category_id" />
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="description" className="form-label">
                                                Description{" "}<span className="text-danger"> * </span>
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
                                            <label htmlFor="price" className="form-label">
                                                Price{" "} <span className="text-danger"> * </span>
                                            </label>
                                            <Field
                                                type="number"
                                                className="form-control"
                                                id="price"
                                                name="price"
                                            />
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="price" />
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="discount" className="form-label">
                                                Discount (%)
                                            </label>
                                            <Field
                                                type="string"
                                                className="form-control"
                                                id="discount"
                                                name="discount"
                                            />
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="discount" />
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="stock_quantity" className="form-label">
                                                Available Quantity{" "} <span className="text-danger"> * </span>
                                            </label>
                                            <Field
                                                type="number"
                                                className="form-control"
                                                id="stock_quantity"
                                                name="stock_quantity"
                                                min="0"
                                            />
                                            <div className="invalid-feedback d-block">
                                                <ErrorMessage name="stock_quantity" />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-block text-white btn-secondary mt-4 p-2">
                                        {productId ? "Update" : "Add"}
                                    </button>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ProductForm;
