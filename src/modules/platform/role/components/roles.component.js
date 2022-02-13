import React, { useEffect, useState } from 'react';
import Table from './common/table.component';
import axios from 'axios';
import _ from 'lodash';
import Pagination from './common/pagination.component';

function Roles() {
	const [roles, setRoles] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [sorters, setSorters] = useState({ key: 'id', order: 'asc' });
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);

	// const login = async () => {
	//     try {
	//         const response = await axios.post(
	//             "http://localhost:5000/api/login",
	//             {
	//                 email: "habiburrahman3089@gmail.com",
	//                 password: "P@ssword123",
	//             },
	//             { withCredentials: true }
	//         );
	//     } catch (error) {
	//         console.log(error);
	//     }
	// };

	const getRoles = async () => {
		try {
			const promise = axios.get('http://localhost:5000/api/roles', {
				withCredentials: true,
			});
			const response = await promise;
			setRoles(response.data);
		} catch (error) {
			console.log(error);
		}
		if (roles) setIsLoaded(true);
	};

	useEffect(() => {
		// login();
		getRoles();
	}, []);

	const handleSort = (sorters) => {
		setSorters({ ...sorters });
	};

	const handleClickPage = (activePage) => {
		setCurrentPage(activePage);
	};

	const sortRoles = () => {
		const rolesList = [...roles];
		const sortedRoles = _.orderBy(rolesList, [sorters.key], [sorters.order]);
		return sortedRoles;
	};

	const paginateRoles = (rolesList) => {
		const start = (currentPage - 1) * itemsPerPage;
		console.log(rolesList);
		const paginatedRoles = rolesList.slice(start, start + itemsPerPage);
		console.log(paginatedRoles);
		return paginatedRoles;
	};

	const sortedRoles = sortRoles();
	const rolesToRender = paginateRoles(sortedRoles);

	const roleColumns = [
		{
			label: 'ID',
			key: 'id',
			sortable: 'true',
			content: (role, key) => <th scope="row">{role[key]}</th>,
		},
		{
			label: 'Title',
			key: 'title',
			sortable: 'true',
			content: (role, key) => <td scope="row">{role[key]}</td>,
		},
		{
			label: 'Created At',
			key: 'created_at',
			content: (role, key) => <td scope="row">{role[key]}</td>,
		},
	];
	return (
		<>
			{isLoaded ? (
				<div className="container text-center d-flex justify-content-center align-items-center flex-column">
					{roles.length ? (
						<>
							<div className="w-75">
								<Table
									items={rolesToRender}
									columns={roleColumns}
									sorters={sorters}
									onSort={handleSort}
								/>
							</div>
							<Pagination
								itemsPerPage={itemsPerPage}
								totalItems={sortedRoles.length}
								currentPage={currentPage}
								onClickPage={handleClickPage}
							/>
						</>
					) : (
						<div
							className="container d-flex flex-column justify-content-center align-items-center"
							style={{ height: '50vh' }}
						>
							<h1 className="display-4 text-center">
								Sorry! Roles list is empty!
							</h1>
							<h1 className="display-4 text-center">
								Please create some roles first!
							</h1>
						</div>
					)}
				</div>
			) : (
				<div className="d-flex justify-content-center mt-5">
					<div
						className="spinner-border"
						role="status"
						style={{ height: '100px', width: '100px' }}
					>
						<span className="sr-only"></span>
					</div>
				</div>
			)}
		</>
	);
}

export default Roles;
