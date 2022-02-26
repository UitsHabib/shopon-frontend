import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import { NewProductSchema } from "../../products.schema";

export function ModalForProduct(props) {
    const {
        type,
        targetProduct,
        showDetailModal,
        setShowDetailModal,
        updateDetailModal,
        setUpdateDetailModal,
        deleteDetailModal,
        setDeleteDetailModal,
        onClickDeleteProduct,
        onClickUpdateProduct,
    } = props;

    const handleShowDetail = () => setShowDetailModal(!showDetailModal);

    const handleUpdateDetail = () => setUpdateDetailModal(!updateDetailModal);

    const handleDeleteDetail = () => {
        onClickDeleteProduct(targetProduct);
        setDeleteDetailModal(!deleteDetailModal);
    };

    const handleDeleteDetailClose = () =>
        setDeleteDetailModal(!deleteDetailModal);

    return (
        <>
            {type === "show" && (
                <>
                    <Modal show={showDetailModal} onHide={handleShowDetail}>
                        <Modal.Header closeButton>
                            <Modal.Title>Product Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul class="list-group">
                                <li class="list-group-item">
                                    Product ID: {targetProduct.id !== null ? targetProduct.id : '--'}
                                </li>
                                <li class="list-group-item">
                                    Product Name: {targetProduct.name !== null ? targetProduct.name : '--'}
                                </li>
                                <li class="list-group-item">
                                    Category: {targetProduct.category_id !== null ? targetProduct.category_id : '--'}
                                </li>
                                <li class="list-group-item">
                                    Description: {targetProduct.description !== null ? targetProduct.description : '--'}
                                </li>
                                <li class="list-group-item">
                                    Price: {targetProduct.price !== null ? targetProduct.price : '--'}
                                </li>
                                <li class="list-group-item">
                                    Discount: {targetProduct.discount !== null ? targetProduct.discount : '--'}
                                </li>
                                <li class="list-group-item">
                                    Available Quantity: {targetProduct.stock_quantity !== null ? targetProduct.stock_quantity : '--'}
                                </li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="warning"
                                onClick={handleShowDetail}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}

            {type === "update" && (
                <>
                    <Modal show={updateDetailModal} onHide={handleUpdateDetail}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Product Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Modal.Body>
                                <Formik
									initialValues={{
                                        id: targetProduct.id ? targetProduct.id : '--',
										name: targetProduct.name ? targetProduct.name : '--',
										category_id: targetProduct.category_id ? targetProduct.category_id : '--',
										description: targetProduct.description ? targetProduct.description : '--',
										price: targetProduct.price ? targetProduct.price : '--',
                                        discount: targetProduct.discount ? targetProduct.discount : '--',
                                        stock_quantity: targetProduct.stock_quantity ? targetProduct.stock_quantity : '--',
									}}
									onSubmit={(values, actions) => {
										handleUpdateDetail();
										onClickUpdateProduct(values);
										actions.setSubmitting(false);
									}}
									validationSchema={NewProductSchema}
								>
									{(formikprops) => {
										return (
											<Form onSubmit={formikprops.handleSubmit}>
												<div className="m-4">
													<div className="form-group mb-3">
														<label htmlFor="id" className="form-label">
															Product ID
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
															disabled={true}
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
															Discount <span className="text-danger">*</span>
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
															Save Changes
														</button>
														<Button
															variant="warning"
															onClick={handleUpdateDetail}
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
                        </Modal.Body>
                    </Modal>
                </>
            )}

            {type === "delete" && (
                <>
                    <Modal show={deleteDetailModal} onHide={handleDeleteDetail}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Are you sure?</h5>
                            <p>If not, click Cancle to go back.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="danger"
                                onClick={handleDeleteDetail}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="warning"
                                onClick={handleDeleteDetailClose}
                            >
                                Cancle
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </>
    );
}
