import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import { addNewShopSchema } from '../shop.schema';

export function ModalForShops(props) {
	const {
        type,
		targetShop,
		showDetail,
		setShowDetail,
		updateDetail,
		setUpdateDetail,
		deleteDetail,
		setDeleteDetail,
		deleteShopData,
		updateShop,
		shopCategories,
	} = props;

	const handleShowDetail = () => setShowDetail(!showDetail);

	const handleUpdateDetail = () => setUpdateDetail(!updateDetail);

	const handleDeleteDetail = () => {
		deleteShopData(targetShop);
		setDeleteDetail(!deleteDetail);
	};

	const handleDeleteDetailClose = () => setDeleteDetail(!deleteDetail);

	return (
		<>
			{type === 'show' && (
				<>
					<Modal show={showDetail} onHide={handleShowDetail}>
						<Modal.Header closeButton>
							<Modal.Title>Shop Details</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ul className="list-group">
								<li className="list-group-item">
									Shop ID: {targetShop.shop_id}
								</li>
								<li className="list-group-item">
									Shop Name: {targetShop.shop_name}
								</li>
								<li className="list-group-item">
									Category: {targetShop.shop_type}
								</li>
								<li className="list-group-item">
									Shop Owner: {targetShop.shop_owner}
								</li>
								<li className="list-group-item">
									Created At: {targetShop.date_created}
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
					<Modal show={updateDetail} onHide={handleUpdateDetail}>
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
										updateShop(values);
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
															Shop Name
														</label>
														<Field
															type="text"
															className="form-control"
															id="shop_name"
															name="shop_name"
														/>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="shop_name" />
														</div>
													</div>

													<div className="form-group mb-3">
														<label htmlFor="shop_type" className="form-label">
															Shop Category
														</label>
														<Field
															className="form-control"
															name="shop_type"
															id="shop_type"
															as="select"
														>
															<option>Click Here to Select</option>
															{shopCategories.map((shopCategory) => {
																return (
																	<>
																		<option>{shopCategory}</option>
																	</>
																);
															})}
														</Field>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="shop_type" />
														</div>
													</div>

													<div className="form-group mb-3">
														<label htmlFor="shop_owner" className="form-label">
															Shop Owner
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
					<Modal show={deleteDetail} onHide={handleDeleteDetail}>
						<Modal.Header closeButton>
							<Modal.Title>Delete Shop</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ul className="list-group">
								<li className="list-group-item">
									Shop ID: {targetShop.shop_id}
								</li>
								<li className="list-group-item">
									Shop Name: {targetShop.shop_name}
								</li>
								<li className="list-group-item">
									Category: {targetShop.shop_type}
								</li>
								<li className="list-group-item">
									Shop Owner: {targetShop.shop_owner}
								</li>
								<li className="list-group-item">
									Created At: {targetShop.date_created}
								</li>
							</ul>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="danger" onClick={handleDeleteDetail}>
								Delete
							</Button>
							<Button variant="warning" onClick={handleDeleteDetailClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
		</>
	);
}
