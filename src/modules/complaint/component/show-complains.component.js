import moment from 'moment';
import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, Modal } from 'react-bootstrap';
import { ComplainSchema } from '../complain.schema';
import Filter from './common/filtering.component';
import Table from './common/table.component';
import Pagination from './common/pagination.component';

const ShowComplain = (props) => {
	const {
		items,
		columns,
		onSort,
		sortColumn,
		totalItems,
		pageCount,
		activePage,
		onClickPage,
		addNewComplain,
		shopCategories,
		selectedCategory,
		onClickFilter,
	} = props;

	const now = new Date();
	const dateString = moment(now).format('DD-MM-YYYY');

	const [addNewComplainShow, setAddNewComplainShow] = useState(false);

	function handleAddNewComplain() {
		setAddNewComplainShow(!addNewComplainShow);
	}

	return (
		<>
			<div className="d-flex flex-wrap justify-content-between">
				<h5 className="my-3 p-2">Complain Table</h5>
				<Button className="my-3 mt-2" variant="success" onClick={handleAddNewComplain}>
					Add New Complain
				</Button>

				{addNewComplainShow && (
					<>
						<Modal show={handleAddNewComplain} onHide={handleAddNewComplain}>
							<Modal.Header closeButton>
								<Modal.Title>Add New Complain</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Formik
									initialValues={{
										id: totalItems + 1,
										user_name: '',
										userUrl: '',
										complain: '',
										shop_name: '',
										shop_type: '',
										date_created: dateString,
									}}
									onSubmit={(values, actions) => {
										setAddNewComplainShow(!addNewComplainShow);
										addNewComplain(values);
										actions.setSubmitting(false);
									}}
									validationSchema={ComplainSchema}
								>
									{(formikprops) => {
										return (
											<Form onSubmit={formikprops.handleSubmit}>
												<div className="m-4">
													<div className="form-group mb-3">
														<label htmlFor="id" className="form-label">
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
														<label htmlFor="user_name" className="form-label">
															User Name
														</label>
														<Field
															type="text"
															className="form-control"
															id="user_name"
															name="user_name"
														/>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="user_name" />
														</div>
													</div>

													<div className="form-group mb-3">
														<label htmlFor="userUrl" className="form-label">
															User Image
														</label>
														<Field
															type="text"
															className="form-control"
															id="userUrl"
															name="userUrl"
														/>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="userUrl" />
														</div>
													</div>

													<div className="form-group mb-3" >
														<label htmlFor="complain" className="form-label">
															Complain Description
														</label>
														<Field
															type="text"
															as="textarea"
															className="form-control"
															id="complain"
															name="complain"
														/>
														<div className="invalid-feedback d-block">
															<ErrorMessage name="complain" />
														</div>
													</div>

													<div className="form-group mb-3">
														<label htmlFor="shop_name" className="form-label">
															Shop Name
														</label>
														<Field
															type="shop_name"
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
															Add Complain
														</button>
														<Button
															variant="warning"
															onClick={handleAddNewComplain}
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
}

export default ShowComplain;