import React, { useEffect, useState } from "react";
import Table from "./common/table.component";
import axios from "axios";
import _ from "lodash";
import Pagination from "./common/pagination.component";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const api_endpoint = "http://localhost:5000";

const Profiles = () => {
	const [profiles, setProfiles] = useState([]);

	const [sortColumn, setSortColumn] = useState({
		path: "id",
		order: "asc",
	});

	const [activePage, setActivePage] = useState(1);
	const [pageCount, setPageCount] = useState(5);

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
				<td style={{ color: "#136CB2" }}> {profile[key]}</td>
			),
		},
		{
			label: "Created At",
			path: "created_at",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}> {profile[key]}</td>
			),
		},
		{
			label: "Updated By",
			path: "updated_by",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}> {profile[key]}</td>
			),
		},
		{
			label: "Updated At",
			path: "updated_at",
			content: (profile, key) => (
				<td style={{ color: "#136CB2" }}> {profile[key]}</td>
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
							<Dropdown.Item href="#/action-1">
								Details
							</Dropdown.Item>
							<Dropdown.Item href="#/action-2">
								Edit
							</Dropdown.Item>
							<Dropdown.Item href="#/action-3">
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
							to="/platform/create-profile"
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
			</div>
		</>
	);
};

export default Profiles;
