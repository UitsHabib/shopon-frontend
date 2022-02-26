import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from 'formik';

import {
    getPaginatedProducts,
    getAllProducts,
    getSortedProducts,
    deleteProduct,
    updateProduct,
    addNewProduct,
} from "../products.actions";
import Pagination from "./common/pagination.component";
import { toast } from "react-toastify";
import Table from "./common/table.component";
import { ModalForProduct } from "./common/modalForProduct.component";
import moment from "moment";
import { NewProductSchema } from "../products.schema";

const Products = (props) => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();

    const totalItems = useSelector(
        (state) => state.shopProductsReducer.totalProducts
    );
    // const paginatedProducts = useSelector(
    //     (state) => state.shopProductsReducer.paginatedProductList
    // );

    const sortedProducts = useSelector(
        (state) => state.shopProductsReducer.sortedProductList
    );

    const productsPerPage = 5;
    const [activePage, setActivePage] = useState(1);
    const [sortColumn, setSortColumn] = useState({
        path: "id",
        order: "asc",
    });

    const [targetProduct, setTargetProduct] = useState({});
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [updateDetailModal, setUpdateDetailModal] = useState(false);
    const [deleteDetailModal, setDeleteDetailModal] = useState(false);
    const [needToFetch, setNeedToFetch] = useState(false);
    const [addNewProductShow, setAddNewProductShow] = useState(false);

    const now = new Date();
    const dateString = moment(now).format("DD-MM-YYYY");

    const columns = [
        {
            label: "ID",
            path: "id",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Product Name",
            path: "name",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Category ID",
            path: "category_id",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Description",
            path: "description",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Price",
            path: "price",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Discount",
            path: "discount",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Available Quantity",
            path: "stock_quantity",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Action",
            path: "action",
            content: (targetProduct) => (
                <Dropdown>
                    <Dropdown.Toggle
                        variant="outline-success"
                        id="dropdown-basic"
                    >
                        <i className="bi bi-pencil-square"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => {
                                setShowDetailModal((prev) => !prev);
                                setTargetProduct(targetProduct);
                            }}
                        >
                            Product Details
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setUpdateDetailModal((prev) => !prev);
                                setTargetProduct(targetProduct);
                            }}
                        >
                            Update
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setDeleteDetailModal((prev) => !prev);
                                setTargetProduct(targetProduct);
                            }}
                        >
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ),
        },
    ];

    async function handleAddnewProduct(newProduct) {
        try {
            await addNewProduct(newProduct);
            setNeedToFetch(!needToFetch);
            setAddNewProductShow(!addNewProductShow);
            toast.success("Product Added Successfully", {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        } catch(error) {
            toast.error(error.response.data, {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        }
    }

    function handleClickPage(activePage) {
        setActivePage(activePage);
    }

    function handleSort(sortColumn) {
        setSortColumn(sortColumn);
    }

    async function handleUpdateProduct(updatedProduct) {
        try {
            await updateProduct(updatedProduct);
            setNeedToFetch(!needToFetch);
            toast.success("Product Updated Successfully", {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        } catch (error) {
            toast.error("Product Updatation Failed", {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        }
    }

    async function handleDeleteProduct(targetProduct) {
        try {
            await deleteProduct(targetProduct.id);
            setNeedToFetch(!needToFetch);
            toast.success("Product Has Been Deleted Successfully", {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        } catch (error) {
            toast.error("Product Deletion Failed", {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        }
    }

    useEffect(() => {
        dispatch(getAllProducts(1, null, null, null));
    }, [needToFetch]);

    // useEffect(() => {
    //     dispatch(getPaginatedProducts(activePage, productsPerPage));
    // }, [activePage]);

    useEffect(() => {
        dispatch(
            getSortedProducts(
                activePage,
                productsPerPage,
                sortColumn.path,
                sortColumn.order
            )
        );
    }, [sortColumn, activePage, needToFetch]);

    return (
        <>
            <div className="d-flex flex-wrap justify-content-between mx-5">
                <h5 className="my-3">Shop Table</h5>
                <Button
                    className="my-3"
                    variant="success"
                    onClick={() => setAddNewProductShow(!addNewProductShow)}
                >
                    Add New Product
                </Button>
                {addNewProductShow && (
					<>
						<Modal show={() => setAddNewProductShow(!addNewProductShow)} onHide={() => setAddNewProductShow(!addNewProductShow)}>
							<Modal.Header closeButton>
								<Modal.Title>Add New Product</Modal.Title>
							</Modal.Header>
							<Modal.Body>
                            <Formik
									initialValues={{
										name: '',
										category_id: '',
										description: '',
										price: 0,
                                        discount: '0',
                                        stock_quantity: 0,
									}}
									onSubmit={(values, actions) => {
                                        console.log(values);
										handleAddnewProduct(values);
										actions.setSubmitting(false);
									}}
									validationSchema={NewProductSchema}
								>
									{(formikprops) => {
										return (
											<Form onSubmit={formikprops.handleSubmit}>
												<div className="m-4">
													<div className="form-group mb-3">
														<label htmlFor="name" className="form-label">
															Product Name <span className="text-danger">*</span>
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
															Category <span className="text-danger">*</span>
														</label>
                                                        <Field
															type="number"
															className="form-control"
															id="category_id"
															name="category_id"
														/>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="category_id" />
														</div>
													</div>

													<div className="form-group mb-3">
														<label htmlFor="description" className="form-label">
															Description <span className="text-danger">*</span>
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
															Price <span className="text-danger">*</span>
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
															Discount
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
															Available Quantity <span className="text-danger">*</span>
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

													<div className="d-flex flex-wrap justify-content-between">
														<button type="submit" className="btn btn-success">
															Add Product
														</button>
														<Button
															variant="warning"
															onClick={() => setAddNewProductShow(!addNewProductShow)}
														>
															Close
														</Button>
													</div>
												</div>
											</Form>
										);
									}}
								</Formik>
							</Modal.Body>
						</Modal>
					</>
				)}
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <div className="card" style={{ width: "80rem" }}>
                    <div className="card-body d-flex flex-wrap justify-content-center">
                        <Table
                            items={sortedProducts}
                            columns={columns}
                            sortColumn={sortColumn}
                            onSort={handleSort}
                        />
                        <Pagination
                            totalItems={totalItems}
                            pageCount={productsPerPage}
                            activePage={activePage}
                            onClickPage={handleClickPage}
                        />
                    </div>
                </div>
            </div>

            {showDetailModal ? (
                <ModalForProduct
                    type="show"
                    targetProduct={targetProduct}
                    showDetailModal={showDetailModal}
                    setShowDetailModal={setShowDetailModal}
                />
            ) : null}

            {updateDetailModal ? (
                <ModalForProduct
                    type="update"
                    totalItems={totalItems}
                    targetProduct={targetProduct}
                    updateDetailModal={updateDetailModal}
                    setUpdateDetailModal={setUpdateDetailModal}
                    onClickUpdateProduct={handleUpdateProduct}
                />
            ) : null}

            {deleteDetailModal ? (
                <ModalForProduct
                    type="delete"
                    targetProduct={targetProduct}
                    deleteDetailModal={deleteDetailModal}
                    setDeleteDetailModal={setDeleteDetailModal}
                    onClickDeleteProduct={handleDeleteProduct}
                />
            ) : null}
        </>
    );
};

export default Products;
