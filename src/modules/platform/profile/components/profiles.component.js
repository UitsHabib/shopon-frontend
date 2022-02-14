import React, { useEffect, useState } from "react";
import Table from "./common/table.component";
import axios from "axios";
import _ from "lodash";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Pagination from "./common/pagination.component";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import getLoggedInUser from "../../../core/service/get-logged-in-user";
import { updateSchema } from "../profile.schema";
import moment from "moment";

const api_endpoint = "http://localhost:5000";

const Profiles = () => {
	const { path } = useRouteMatch();
	const [profiles, setProfiles] = useState([]);

	//fetch profile data from database
	async function getProfiles() {
		try {
			const promise = axios
				.get(`${api_endpoint}/api/profiles`, { withCredentials: true })
				.then((res) => setProfiles(res.data));
			const response = await promise;
		} catch (error) {
			console.log("abuj", error);
		}
	}

	useEffect(() => {
		getProfiles();
	}, []);

	//update profile section
	const [isOpen, setIsOpen] = useState(false);
	const [update, setUpdate] = useState(null);

	const handleUpdate = (data) => {
        console.log(path)
		let permissions = [];
		data.profile_permissions.map((pt) =>
			permissions.push(pt.permission.id.toString())
		);
		setUpdate({ ...data, permissions });
		setIsOpen((prev) => !prev);
	};

	//update profile data from database
	const handleClose = () => {
		setUpdate(null);
		setIsOpen((prev) => !prev);
	};

	async function updateProfile({ id, title, description, permissions }) {
		const profile = profiles.find((pf) => pf.id === id);
		profile.title = title;
		profile.description = description;
		try {
			await axios.patch(
				`${api_endpoint}/api/profiles/${id}`,
				{ title, description, permissions },
				{ withCredentials: true }
			);
			setProfiles([...profiles]);
			// const response = await promise;
			window.location.href = `${path}`;
		} catch (error) {
			console.log("abuj", error);
		}
	}

	//delete profile section
	const [isDelete, setIsDelete] = useState(false);
	const [deleteInfo, setDeleteInfo] = useState(null);

	const handleDelete = (data) => {
		// console.log(data)
		setDeleteInfo(data);
		setIsDelete((prev) => !prev);
	};

	const handleCancel = (data) => {
		setIsDelete((prev) => !prev);
	};

	//delete profile data from database
	async function deleteProfile() {
		try {
			const { id } = deleteInfo;
			console.log(id);
			const allProfiles = [...profiles];
			const newProfiles = allProfiles.filter((pf) => id !== pf.id);
			const response = await axios.delete(
				`${api_endpoint}/api/profiles/${id}`,
				{ withCredentials: true }
			);
			setProfiles(newProfiles);
            window.location.href = `${path}`;
		} catch (error) {
			console.error("Error: ", error);
		}
	}

	//detail profile section
	const [isDetail, setIsDetail] = useState(false);
	const [detailInfo, setDetailInfo] = useState(null);

	const handleDetail = (data) => {
		let permissions = [];
		data.profile_permissions.map((pt) =>
			permissions.push(pt.permission.title)
		);
		// console.log(permissions);
		setDetailInfo({ ...data, permissions });
		setIsDetail((prev) => !prev);
	};

	const handleOff = () => {
		setIsDetail((prev) => !prev);
	};

	const [sortColumn, setSortColumn] = useState({
		path: "id",
		order: "asc",
	});

	const [activePage, setActivePage] = useState(1);
	const [pageCount, setPageCount] = useState(5);

	const handleSort = (sortColumn) => {
		setSortColumn(sortColumn);
	};

	const handleClickPage = (activePage) => {
		setActivePage(activePage);
	};

	const paginateProfiles = (profiles) => {
		const start = (activePage - 1) * pageCount;
		const paginateProfiles = profiles.slice(start, start + pageCount);
		return paginateProfiles;
	};

	const sortProfiles = (profiles) => {
		const sortedProfiles = _.orderBy(
			profiles,
			[sortColumn.path],
			[sortColumn.order]
		);
		return sortedProfiles;
	};

	const paginatedProfiles = paginateProfiles(profiles);
	const sortedProfiles = sortProfiles(paginatedProfiles);
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
			path: "created_by",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}>{`${
					getLoggedInUser().first_name
				} ${getLoggedInUser().last_name}`}</td>
			),
		},
		{
			label: "Created At",
			path: "created_at",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}> {moment(profile[key]).format('lll')}</td>
			),
		},
		{
			label: "Updated By",
			path: "updated_by",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}>{`${
					getLoggedInUser().first_name
				} ${getLoggedInUser().last_name}`}</td>
			),
		},
		{
			label: "Updated At",
			path: "updated_at",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}> {moment(profile[key]).format('lll')}</td>
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
						<Link
							style={{ textDecoration: "none" }}
							to={`${path}/create`}
						>
							<button type="button" className="btn btn-warning">
								Create new profile
							</button>
						</Link>
					</span>
				</nav>
			</div>
			<div style={{ display: "flex" }}>
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
						items={sortedProfiles}
						columns={columns}
						onSort={handleSort}
						sortColumn={sortColumn}
					></Table>

					<Pagination
						totalItems={profiles.length}
						pageCount={pageCount}
						activePage={activePage}
						onClickPage={handleClickPage}
					></Pagination>
				</div>
				{isOpen ? (
					<div
						className="modal"
						style={{ display: isOpen ? "block" : "none" }}
					>
						<div className="modal-dialog">
							<div
								className="modal-content"
								style={{
									textAlign: "center",
									width: "100%",
									marginLeft: "10%",
									marginTop: "25%",
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
									validationSchema={updateSchema}
									onSubmit={(values, actions) => {
										console.log(values);
										updateProfile(values);
										actions.setSubmitting(false);
									}}
								>
									{(formikProps) => (
										<Form
										// onSubmit={formikProps.handleSubmit}
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
												Permissions
											</div>
											<div
												role="group"
												aria-labelledby="checkbox-group"
											>
												<label>
													<Field
														type="checkbox"
														name="permissions"
														value="1"
													/>
													System Admin Permission
												</label>
												<br />
												<label>
													<Field
														type="checkbox"
														name="permissions"
														value="2"
													/>
													Manager Permission
												</label>
                                                <div className="invalid-feedback d-block">
													<ErrorMessage name="permissions" />
												</div>
											</div>
											<br />
											<button
												className="btn btn-primary"
												type="submit"
												onClick={updateProfile}
											>
												Update
											</button>{" "}
											<button
												type="button"
												className="btn btn-danger"
												onClick={handleClose}
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

				{isDelete ? (
					<div
						className="modal"
						style={{ display: isDelete ? "block" : "none" }}
					>
						<div className="modal-dialog">
							<div
								className="modal-content"
								style={{
									textAlign: "center",
									width: "100%",
									marginLeft: "10%",
									marginTop: "25%",
									border: "1px solid gray",
									boxShadow: "1px 1px 10px gray",
									borderRadius: "10px",
									padding: "20px",
								}}
							>
								<div className="container">
									<h1>Delete Account</h1>
									<p>
										Are you sure you want to delete this
										account?
									</p>

									<div className="clearfix">
										<button
											type="button"
											className="btn btn-warning"
											onClick={handleCancel}
										>
											Cancel
										</button>{" "}
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteProfile}
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

				{isDetail ? (
					<div
						className="modal"
						style={{ display: isDetail ? "block" : "none" }}
					>
						<div className="modal-dialog">
							<div
								className="modal-content"
								style={{
									// textAlign: "center",
									width: "100%",
									marginLeft: "10%",
									marginTop: "25%",
									border: "1px solid gray",
									boxShadow: "1px 1px 10px gray",
									borderRadius: "10px",
									padding: "20px",
								}}
							>
								<div className="container">
									<h1>Details</h1>
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
											<strong>Description:</strong>{" "}
											{detailInfo.description}
											<br />
											<br />
											<strong>Created At:</strong>{" "}
											{detailInfo.created_at}
											<br />
											<br />
											<strong>Updated At:</strong>{" "}
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
															marginLeft: "50px",
														}}
													>
														{item}
													</p>
												)
											)}
											<br />
										</label>
									</div>

									<div className="clearfix">
										<button
											type="button"
											className="btn btn-warning"
											onClick={handleOff}
										>
											Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div />
				)}
			</div>
		</>
	);
};

export default Profiles;
