import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, Modal } from 'react-bootstrap';
import { addNewShopSchema } from '../shop.schema';

export function ModalForShopProduct(props) {
	const {
        type,
		targetShop,
		showDetailModal,
		setShowDetailModal,
		updateDetailModal,
		setUpdateDetailModal,
		deleteDetailModal,
		setDeleteDetailModal,
		onClickDeleteShop,
		onClickUpdateShop,
		shopCategories,
	} = props;

	const handleShowDetail = () => setShowDetailModal(!showDetailModal);

	const handleUpdateDetail = () => setUpdateDetailModal(!updateDetailModal);

	const handleDeleteDetail = () => {
		onClickDeleteShop(targetShop);
		setDeleteDetailModal(!deleteDetailModal);
	};

	const handleDeleteDetailClose = () => setDeleteDetailModal(!deleteDetailModal);

	return (
		<>
			{type === 'show' && (
				<>
					<Modal show={showDetailModal} onHide={handleShowDetail}>
						<Modal.Header closeButton>
							<Modal.Title>Shop Details</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ul className="list-group">
								<li className="list-group-item">
									Shop ID: {targetShop.shop_id === null ? '--' : targetShop.shop_id}
								</li>
								<li className="list-group-item">
									Shop Name: {targetShop.shop_name === null ? '--' : targetShop.shop_name}
								</li>
								<li className="list-group-item">
									Category: {targetShop.shop_type === null ? '--' : targetShop.type}
								</li>
								<li className="list-group-item">
									Shop Owner: {targetShop.shop_owner === null ? '--' : targetShop.shop_owner}
								</li>
								<li className="list-group-item">
									Created At: {targetShop.date_created === null ? '--' : targetShop.date_created}
								</li>
							</ul>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="warning" onClick={handleShowDetail}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}

			{type === 'update' && (
				<>
					<Modal show={updateDetailModal} onHide={handleUpdateDetail}>
						<Modal.Header closeButton>
							<Modal.Title>Update Shop Details</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Modal.Body>
								<Formik
									initialValues={{
										shop_id: targetShop.shop_id,
										shop_name: targetShop.shop_name,
										shop_type: targetShop.shop_type,
										shop_owner: targetShop.shop_owner,
										date_created: targetShop.date_created,
									}}
									onSubmit={(values, actions) => {
										//console.log(values);
										handleUpdateDetail();
										onClickUpdateShop(values);
										actions.setSubmitting(false);
									}}
									validationSchema={addNewShopSchema}
								>
									{(formikprops) => {
										return (
											<Form onSubmit={formikprops.handleSubmit}>
												<div className="m-4">
													<div className="form-group mb-3">
														<label htmlFor="shop_id" className="form-label">
															ID
														</label>
														<Field
															type="text"
															className="form-control"
															id="shop_id"
															name="shop_id"
															disabled={true}
														/>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="shop_id" />
														</div>
													</div>

													<div className="form-group mb-3">
														<label htmlFor="shop_name" className="form-label">
															Shop Name <span className="text-danger">*</span>
														</label>
														<Field
															type="text"
															className="form-control required"
															id="shop_name"
															name="shop_name"
														/>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="shop_name" />
														</div>
													</div>

													<div className="form-group mb-3">
														<label htmlFor="shop_type" className="form-label">
															Shop Category <span className="text-danger">*</span>
														</label>
														<Field
															className="form-control"
															name="shop_type"
															id="shop_type"
															as="select"
														>
															<option>Click Here to Select</option>
															{shopCategories.map((shopCategory, index) => {
																return (
																		<option key={index}>{shopCategory}</option>
																);
															})}
														</Field>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="shop_type" />
														</div>
													</div>

													<div className="form-group mb-3">
														<label htmlFor="shop_owner" className="form-label">
															Shop Owner <span className="text-danger">*</span>
														</label>
														<Field
															type="shop_owner"
															className="form-control"
															id="shop_owner"
															name="shop_owner"
														/>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="shop_owner" />
														</div>
													</div>

													<div className="form-group mb-3">
														<label
															htmlFor="date_created"
															className="form-label"
														>
															Created At
														</label>
														<Field
															type="text"
															className="form-control"
															id="date_created"
															name="date_created"
															disabled={true}
														/>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="date_created" />
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

			{type === 'delete' && (
				<>
					<Modal show={deleteDetailModal} onHide={handleDeleteDetail}>
						<Modal.Header closeButton>
							<Modal.Title>Delete Shop</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<h5>Are you sure?</h5>
                            <p>If not, click Cancle to go back.</p>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="danger" onClick={handleDeleteDetail}>
								Delete
							</Button>
							<Button variant="warning" onClick={handleDeleteDetailClose}>
								Cancle
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
		</>
	);
}
