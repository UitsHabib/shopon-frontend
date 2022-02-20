import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Filter from './common/filtering.component';
import Pagination from './common/pagination.component';
import Table from './common/table.component';
import { addNewShopSchema } from './shop.schema';

const ShowShops = (props) => {
	const {
		items,
		columns,
		onSort,
		sortColumn,
		totalItems,
        totalShops,
		pageCount,
		activePage,
		onClickPage,
		onClickAddNewShop,
		shopCategories,
		selectedCategory,
		onClickFilter,
	} = props;

    const [addNewShopShow, setAddNewShopShow] = useState(false);

	const now = new Date();
	const dateString = moment(now).format('DD-MM-YYYY');

	function handleAddNewShop() {
		setAddNewShopShow(!addNewShopShow);
	}

	return (
		<>
			<div className="d-flex flex-wrap justify-content-around">
				<h5 className="my-3">Shop Table</h5>
				<Button className="my-3" variant="success" onClick={handleAddNewShop}>
					Add New Shop
				</Button>

				{addNewShopShow && (
					<>
						<Modal show={handleAddNewShop} onHide={handleAddNewShop}>
							<Modal.Header closeButton>
								<Modal.Title>Add New Shop</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Formik
									initialValues={{
										shop_id: totalShops + 1,
										shop_name: '',
										shop_type: '',
										shop_owner: '',
										date_created: dateString,
									}}
									onSubmit={(values, actions) => {
										setAddNewShopShow(!addNewShopShow);
										onClickAddNewShop(values);
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
																	<React.Fragment key={index}>
																		<option>{shopCategory}</option>
																	</React.Fragment>
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
															Add Shop
														</button>
														<Button
															variant="warning"
															onClick={handleAddNewShop}
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

			<div className="d-flex flex-wrap flex-column align-items-center">
				<div className="card" style={{ width: '100%', height: '100%' }}>
					<div className="card-body">
						<div className="d-flex flex-wrap flex-column align-items-center">
							<div className="d-flex flex-wrap justify-content-between">
								<div className='mt-2 mx-2'>
									<Filter
										shopCategories={shopCategories}
										selectedCategory={selectedCategory}
										onClickFilter={onClickFilter}
									/>
								</div>

								<div className="mx-4">
									<Table
										items={items}
										columns={columns}
										onSort={onSort}
										sortColumn={sortColumn}
									/>
                                    
									<Pagination
										totalItems={totalItems}
										pageCount={pageCount}
										activePage={activePage}
										onClickPage={onClickPage}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShowShops;
