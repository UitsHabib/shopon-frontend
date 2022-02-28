import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import { toast } from "react-toastify";

import Table from "./common/table.component";
import Pagination from "./common/pagination.component";
import { profileCreateSchema, profileUpdateSchema } from "../profile.schema";

import {
	createProfile,
	deleteProfile,
	getPermissions,
	getProfiles,
	updateProfile,
} from "../profile.actions";

const Profiles = () => {
	const dispatch = useDispatch();

	const [activePage, setActivePage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [sortColumn, setSortColumn] = useState({ path: "id", order: "asc" });
	const [permissions, setPermissions] = useState([]);
	const [update, setUpdate] = useState(null);
	const [deleteInfo, setDeleteInfo] = useState(null);
	const [detailInfo, setDetailInfo] = useState(null);
	const [modal, setModal] = useState({
		create: false,
		detail: false,
		update: false,
		delete: false,
	});

	const [needToFetchProfile, setNeedToFetchProfile] = useState(true);

	const profileData = useSelector(
		(state) => state.profileReducer.profileData
	);

	//create profile into database
	async function handleSubmit(data) {
		try {
			await dispatch(createProfile(data));
			toast.success("Profile Created Successfully", {
				backgroundColor: "#8329C5",
				color: "#ffffff",
			});
			setNeedToFetchProfile(!needToFetchProfile);
			setModal({ ...modal, create: false });
		} catch (error) {
			alert("Profile already exits");
		}
	}

	//fetch permission data from database
	async function getPermissionList() {
		try {
			const { data } = await getPermissions();
			setPermissions(data.permissions);
		} catch {
			console.log("error while getting permissions");
		}
	}

	//update profile data in database
	async function updateProfileList({ id, title, description, permissions }) {
		try {
			await dispatch(updateProfile(id, title, description, permissions));
			toast.success(`Successfully updated`);
			setNeedToFetchProfile(!needToFetchProfile);
			setModal({ ...modal, update: false });
		} catch {
			console.log("error while updating profiles");
		}
	}

	//delete profile data from database
	async function deleteProfileList() {
		try {
			const { id } = deleteInfo;
			await dispatch(deleteProfile(id));
			toast.success(`Successfully deleted`);
			setNeedToFetchProfile(!needToFetchProfile);
			setModal({ ...modal, delete: false });
		} catch (error) {
			console.error("Error: ", error);
		}
	}

	useEffect(() => {
		dispatch(
			getProfiles(activePage, limit, sortColumn.path, sortColumn.order)
		);
	}, [needToFetchProfile, activePage, limit, sortColumn]);

	useEffect(() => {
		getPermissionList();
	}, []);

	//update profile section
	const handleUpdate = (data) => {
		let permissions = [];
		data.profile_permissions.map((pt) =>
			permissions.push(pt.permission.id.toString())
		);
		setUpdate({ ...data, permissions });
		setModal({ ...modal, update: true });
	};

	//detail profile section
	const handleDetail = (data) => {
		let permissions = [];
		data.profile_permissions.map((pt) =>
			permissions.push(pt.permission.title)
		);
		const created_at = moment(data.created_at).format("lll");
		const updated_at = moment(data.updated_at).format("lll");
		setDetailInfo({ ...data, permissions, created_at, updated_at });
		setModal({ ...modal, detail: true });
	};

	//delete profile section
	const handleDelete = (data) => {
		setDeleteInfo(data);
		setModal({ ...modal, delete: true });
	};

	const handleClickPage = (activePage) => {
		setActivePage(activePage);
	};

	const handleSort = (sortColumn) => {
		setSortColumn(sortColumn);
	};

	const columns = [
		{
			label: "Title",
			path: "title",
			sorting: true,
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}> {profile[key]}</td>
			),
		},
		{
			label: "Created By",
			path: "createdByUser",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}>
					{" "}
					{profile[key].first_name + " " + profile[key].last_name}
				</td>
			),
		},
		{
			label: "Created At",
			path: "created_at",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}>
					{" "}
					{moment(profile[key]).format("lll")}
				</td>
			),
		},
		{
			label: "Updated By",
			path: "updatedByUser",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}>
					{" "}
					{profile[key].first_name + " " + profile[key].last_name}
				</td>
			),
		},
		{
			label: "Updated At",
			path: "updated_at",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}>
					{" "}
					{moment(profile[key]).format("lll")}
				</td>
			),
		},
		{
			label: "Action",
			path: "action",
			content: (profile, key) => (
				<td>
					<Dropdown>
						<Dropdown.Toggle
							variant="secondary"
							id="dropdown-basic"
						>
							<i className="bi bi-pencil-square"></i>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item
								onClick={() => handleDetail(profile)}
							>
								Details
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => handleUpdate(profile)}
							>
								Edit
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => handleDelete(profile)}
							>
								Delete
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</td>
			),
		},
	];

	return (
		<>
			<div>
				<nav className="navbar navbar-light bg-light">
					<h1 className="navbar-brand" style={{ marginLeft: "20px" }}>
						Profile List
					</h1>
					<span
						style={{
							marginRight: "20px",
						}}
					>
						<button
							type="button"
							className="btn btn-warning pull-right"
							onClick={() => setModal({ ...modal, create: true })}
						>
							Create Profile
						</button>
					</span>
				</nav>
			</div>

			{profileData["profiles"] && profileData["profiles"].length > 0 && (
				<div style={{ display: "flex" }}>
					{console.log("ProfileData", profileData)}
					<div
						className="list-container"
						style={{
							width: "100%",
							marginLeft: "10px",
							marginRight: "10px",
							paddingRight: "10px",
						}}
					>
						<Table
							items={profileData["profiles"]}
							columns={columns}
							onSort={handleSort}
							sortColumn={sortColumn}
						></Table>
						<Pagination
							totalItems={profileData["metaData"].total}
							pageCount={profileData["metaData"].limit}
							activePage={activePage}
							onClickPage={handleClickPage}
						></Pagination>
					</div>
					{modal.create ? (
						<div
							className="modal"
							style={{ display: modal.create ? "block" : "none" }}
						>
							<div
								className="modal-backdrop"
								style={{
									backgroundColor: "rgba(0, 0, 0, 0.1)",
								}}
								onClick={() => {
									// close modal when outside of modal is clicked
									setModal({ ...modal, create: false });
								}}
							>
								<div
									className="modal-content"
									onClick={(e) => {
										// do not close modal if anything inside modal content is clicked
										e.stopPropagation();
									}}
									style={{
										textAlign: "left",
										width: "60%",
										marginLeft: "20%",
										marginTop: "10%",
										border: "1px solid gray",
										boxShadow: "1px 1px 10px gray",
										borderRadius: "10px",
										padding: "20px",
									}}
								>
									<h3 style={{ color: "gray" }}>
										Create New Profile
									</h3>
									<hr />
									<Formik
										initialValues={{
											title: "",
											description: "",
											permissions: [],
										}}
										validationSchema={profileCreateSchema}
										onSubmit={(values, actions) => {
											handleSubmit(values);
											actions.setSubmitting(false);
										}}
									>
										{(formikProps) => (
											<Form
												onSubmit={
													formikProps.handleSubmit
												}
											>
												<div className="form-group">
													<label
														className="form-label"
														htmlFor="title"
													>
														Title{" "}
														<span className="text-danger">
															*
														</span>
													</label>
													<Field
														id="title"
														name="title"
														type="text"
														className="form-control"
													></Field>
													<div className="invalid-feedback d-block">
														<ErrorMessage name="title" />
													</div>
												</div>
												<div className="form-group">
													<label
														className="form-label"
														htmlFor="description"
													>
														Description{" "}
														<span className="text-danger">
															*
														</span>
													</label>
													<Field
														id="description"
														name="description"
														type="text"
														className="form-control"
													></Field>
													<div className="invalid-feedback d-block">
														<ErrorMessage name="description" />
													</div>
												</div>
												<div id="checkbox-group">
													<span
														type="button"
														data-toggle="tooltip"
														data-placement="top"
														title="At least one permission is required"
													>
														Select Permission{" "}
													</span>
													<span className="text-danger">
														*
													</span>{" "}
													<i
														type="button"
														className="bi bi-question-circle-fill"
														data-toggle="tooltip"
														data-placement="top"
														title="At least one permission is required"
													></i>
												</div>
												<div
													role="group"
													aria-labelledby="checkbox-group"
													style={{
														textAlign: "left",
													}}
												>
													{permissions.map(
														(permission) => (
															<React.Fragment
																key={
																	permission.id
																}
															>
																<label>
																	<Field
																		type="checkbox"
																		name="permissions"
																		value={permission.id.toString()}
																	/>{" "}
																	{
																		permission.title
																	}
																	<br />
																	<i
																		style={{
																			marginLeft:
																				"40px",
																		}}
																	>
																		{
																			permission.description
																		}
																	</i>
																</label>
																<br />
															</React.Fragment>
														)
													)}
													<div className="invalid-feedback d-block">
														<ErrorMessage name="permissions" />
													</div>
												</div>
												<br />
												<button
													className="btn btn-primary"
													type="submit"
												>
													Add Profile
												</button>{" "}
												<button
													className="btn btn-danger"
													type="button"
													onClick={() =>
														setModal({
															...modal,
															create: false,
														})
													}
												>
													Cancel
												</button>
											</Form>
										)}
									</Formik>
								</div>
							</div>
						</div>
					) : (
						<div />
					)}
					{modal.update ? (
						<div
							className="modal"
							style={{ display: modal.update ? "block" : "none" }}
						>
							<div
								className="modal-backdrop"
								style={{
									backgroundColor: "rgba(0, 0, 0, 0.1)",
								}}
								onClick={() => {
									// close modal when outside of modal is clicked
									setModal({ ...modal, update: false });
								}}
							>
								<div
									className="modal-content"
									onClick={(e) => {
										// do not close modal if anything inside modal content is clicked
										e.stopPropagation();
									}}
									style={{
										textAlign: "left",
										width: "60%",
										marginLeft: "20%",
										marginTop: "10%",
										border: "1px solid gray",
										boxShadow: "1px 1px 10px gray",
										borderRadius: "10px",
										padding: "20px",
									}}
								>
									<Formik
										initialValues={{
											id: update.id,
											title: update.title,
											description: update.description,
											permissions: update.permissions,
										}}
										validationSchema={profileUpdateSchema}
										onSubmit={(values, actions) => {
											updateProfileList(values);
											actions.setSubmitting(false);
										}}
									>
										{(formikProps) => (
											<Form
											// onSubmit={formikProps.handleSubmit}
											>
												<div className="form-group">
													<button
														type="button"
														className="btn-close pull-right"
														onClick={() =>
															setModal({
																...modal,
																update: false,
															})
														}
														aria-label="Close"
													></button>
													<label
														className="form-label"
														htmlFor="title"
													>
														Title{" "}
														<span className="text-danger">
															*
														</span>
													</label>
													<Field
														id="title"
														name="title"
														type="text"
														className="form-control"
													></Field>
													<div className="invalid-feedback d-block">
														<ErrorMessage name="title" />
													</div>
												</div>
												<div className="form-group">
													<label
														className="form-label"
														htmlFor="description"
													>
														Description{" "}
														<span className="text-danger">
															*
														</span>
													</label>
													<Field
														id="description"
														name="description"
														type="text"
														className="form-control"
													></Field>
													<div className="invalid-feedback d-block">
														<ErrorMessage name="description" />
													</div>
												</div>
												<div id="checkbox-group">
													<span
														type="button"
														data-toggle="tooltip"
														data-placement="top"
														title="At least one permission is required"
													>
														Select Permission{" "}
													</span>
													<span className="text-danger">
														*
													</span>{" "}
													<i
														type="button"
														className="bi bi-question-circle-fill"
														data-toggle="tooltip"
														data-placement="top"
														title="At least one permission is required"
													></i>
												</div>
												<div
													role="group"
													aria-labelledby="checkbox-group"
													style={{
														textAlign: "left",
													}}
												>
													<div>
														{permissions.map(
															(permission) => (
																<React.Fragment
																	key={
																		permission.id
																	}
																>
																	<label>
																		<Field
																			type="checkbox"
																			name="permissions"
																			value={permission.id.toString()}
																		/>{" "}
																		{
																			permission.title
																		}
																		<br />
																		<i
																			style={{
																				marginLeft:
																					"40px",
																			}}
																		>
																			{
																				permission.description
																			}
																		</i>
																	</label>
																	<br />
																</React.Fragment>
															)
														)}
														<div className="invalid-feedback d-block">
															<ErrorMessage name="permissions" />
														</div>
													</div>
												</div>
												<br />
												<button
													className="btn btn-primary pull-right"
													type="submit"
													// onClick={() => updateProfileList(data)}
												>
													Save changes
												</button>{" "}
												<button
													type="button"
													className="btn btn-light pull-right"
													style={{
														border: "1px solid gray",
														backgroundColor: "gray",
														color: "white",
														marginRight: "10px",
													}}
													onClick={() =>
														setModal({
															...modal,
															update: false,
														})
													}
												>
													Cancel
												</button>
											</Form>
										)}
									</Formik>
								</div>
							</div>
						</div>
					) : (
						<div />
					)}

					{modal.delete ? (
						<div
							className="modal"
							style={{ display: modal.delete ? "block" : "none" }}
						>
							<div
								className="modal-backdrop"
								style={{
									backgroundColor: "rgba(0, 0, 0, 0.1)",
								}}
								onClick={() => {
									// close modal when outside of modal is clicked
									setModal({ ...modal, delete: false });
								}}
							>
								<div
									className="modal-content"
									onClick={(e) => {
										// do not close modal if anything inside modal content is clicked
										e.stopPropagation();
									}}
									style={{
										textAlign: "center",
										width: "50%",
										marginLeft: "25%",
										marginTop: "10%",
										border: "1px solid gray",
										boxShadow: "1px 1px 10px gray",
										borderRadius: "10px",
										padding: "20px",
									}}
								>
									<div className="container">
										<button
											type="button"
											className="btn-close pull-right"
											onClick={() =>
												setModal({
													...modal,
													delete: false,
												})
											}
											aria-label="Close"
										></button>
										<h1>Delete Account</h1>
										<hr />
										<p>
											Are you sure you want to delete this
											account?
										</p>
										<br />

										<div className="clearfix">
											<button
												type="button"
												className="btn btn-light"
												style={{
													border: "1px solid gray",
													backgroundColor: "gray",
													color: "white",
													marginRight: "10px",
												}}
												onClick={() =>
													setModal({
														...modal,
														delete: false,
													})
												}
											>
												Cancel
											</button>
											<button
												type="button"
												className="btn btn-danger"
												onClick={deleteProfileList}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div />
					)}

					{modal.detail ? (
						<div
							className="modal"
							style={{ display: modal.detail ? "block" : "none" }}
						>
							<div
								className="modal-backdrop"
								style={{
									backgroundColor: "rgba(0, 0, 0, 0.1)",
								}}
								onClick={() => {
									// close modal when outside of modal is clicked
									// handleDetailModal();
									setModal({ ...modal, detail: false });
								}}
							>
								<div
									className="modal-content"
									onClick={(e) => {
										// do not close modal if anything inside modal content is clicked
										e.stopPropagation();
									}}
									style={{
										width: "80%",
										marginLeft: "10%",
										marginTop: "10%",
										border: "1px solid gray",
										boxShadow: "1px 1px 10px gray",
										borderRadius: "10px",
										padding: "20px",
									}}
								>
									<div className="container">
										<button
											type="button"
											className="btn-close pull-right"
											onClick={() =>
												setModal({
													...modal,
													detail: false,
												})
											}
											aria-label="Close"
										></button>

										<span>
											<h1>Details</h1>
										</span>
										<p>Here is profile details</p>
										<hr />
										<div className="form-group">
											<label>
												<strong>Title:</strong>{" "}
												{detailInfo.title}
												<br />
												<br />
												<strong>Slug:</strong>{" "}
												{detailInfo.slug}
												<br />
												<br />
												<strong>Type:</strong>{" "}
												{detailInfo.type}
												<br />
												<br />
												<strong>
													Description:
												</strong>{" "}
												{detailInfo.description}
												<br />
												<br />
												<strong>
													Created At:
												</strong>{" "}
												{detailInfo.created_at}
												<br />
												<br />
												<strong>
													Updated At:
												</strong>{" "}
												{detailInfo.updated_at}
												<br />
												<br />
												<strong>
													Profile Permissions:
												</strong>
												{detailInfo.permissions.map(
													(item) => (
														<p
															key={item}
															style={{
																marginLeft:
																	"50px",
															}}
														>
															{item}
														</p>
													)
												)}
												<br />
											</label>
										</div>
										<button
											type="button"
											className="btn btn-light pull-right"
											style={{
												border: "1px solid gray",
												backgroundColor: "gray",
												color: "white",
												marginRight: "10px",
											}}
											onClick={() =>
												setModal({
													...modal,
													detail: false,
												})
											}
										>
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div />
					)}
				</div>
			)}
		</>
	);
};

export default Profiles;
