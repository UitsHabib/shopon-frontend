import _ from 'lodash';
import { Dropdown } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import ShowComplain from './component/show-complains.component'
import ModalComplain from './component/common/modalComplain.component';
import { getComplainData } from './component/complain.action';

const Complain = () => {
	const { path } = useRouteMatch;

	const [complains, setComplains] = useState([]);
	const [shopCategories, setShopCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('All Shops');
	const [sortColumn, setSortColumn] = useState({ path: "id", order: "asc" });
	const [activePage, setActivePage] = useState(1);
	const [shopsPerPage, setShopsPerPage] = useState(5);
	const [showDetail, setShowDetail] = useState(false);
	const [updateDetail, setUpdateDetail] = useState(false);
	const [deleteDetail, setDeleteDetail] = useState(false);
	const [targetComplain, setTargetComplain] = useState({});

	const columns = [
		{
			label: "ID",
			path: "id",
			sorting: true,
			content: (complain, key) => <td>{complain[key]}</td>,
		},
		{
			label: "User Name",
			path: "user_name",
			sorting: true,
			content: (complain, key) => <td>{complain[key]}</td>,
		},
		{
			label: "User Image",
			path: "userUrl",
			sorting: true,
			content: (complain, key) => (
				<td>
					<img
						src={complain[key]}
						style={{ height: "100px", width: "auto" }}
					/>
				</td>
			),
		},
		{
			label: "Complain Description",
			path: "complain",
			sorting: true,
			content: (complain, key) => <td style={{ width: "500px" }}>{complain[key]}</td>,
		},
		{
			label: "Shop Name",
			path: "shop_name",
			sorting: true,
			content: (complain, key) => <td>{complain[key]}</td>,
		},
		{
			label: "Shop Category",
			path: "shop_type",
			sorting: true,
			content: (complain, key) => <td>{complain[key]}</td>,
		},
		{
			label: "Created At",
			path: "date_created",
			sorting: true,
			content: (complain, key) => <td>{complain[key]}</td>,
		},
		{
			label: 'Action',
			content: (targetComplain) => (
				<Dropdown>
					<Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
						<i className="bi bi-pencil-square"></i>
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => showShopDropdown(targetComplain)}>
							Shop Details
						</Dropdown.Item>
						<Dropdown.Item onClick={() => updateShopDropdown(targetComplain)}>
							Update
						</Dropdown.Item>
						<Dropdown.Item onClick={() => deleteShopDropdown(targetComplain)}>
							Delete
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			),
		},
	];

	async function getComplainDataList() {
		try {
			const { data } = await getComplainData();
			console.log(data);
			setComplains(data.complains);
			setShopCategories(data.shop_categories);
			console.log(shopCategories);
		} catch (error) {
			console.log("Ekhane errpor")
			console.log(error);
		}
	}

	async function updateComplainData(targetComplain) {
		const newComplainList = [...complains];
		const newComplain = newComplainList.find(
			(complain) => complain.id = targetComplain.id
		);
		newComplain.user_name = targetComplain.user_name;
		newComplain.complain = targetComplain.complain;
		newComplain.shop_name = targetComplain.shop_name;
		newComplain.shop_type = targetComplain.shop_type;

		setComplains(newComplainList);
	}

	async function deleteComplainData(targetComplain) {
		const newComplainList = complains.filter(
			(complain) => complain.id !== targetComplain.id
		)
		setComplains(newComplainList);
	}

	async function addNewComplain(complain) {
		setComplains((prev) => [...prev, complain]);
	}

	function showShopDropdown(targetComplain) {
		setShowDetail((prev) => !prev);
		setTargetComplain(targetComplain);
	}

	function updateShopDropdown(targetComplain) {
		setUpdateDetail((prev) => !prev);
		setTargetComplain(targetComplain);
	}

	function deleteShopDropdown(targetComplain) {
		setDeleteDetail((prev) => !prev);
		setTargetComplain(targetComplain);
	}

	function handleSort(sortColumn) {
		setSortColumn(sortColumn);
	}

	function handleClickPage(activePage) {
		setActivePage(activePage);
	}

	function handleClickFilter(selectedCategory) {
		setSelectedCategory(selectedCategory);
	}

	function sortComplains(complains) {
		const sortedComplains = _.orderBy(complains, [sortColumn.path], [sortColumn.order]);
		return sortedComplains;
	}

	function paginateComplains(complains) {
		const start = (activePage - 1) * shopsPerPage;
		const paginatedComplains = complains.slice(start, start + shopsPerPage);
		return paginatedComplains;
	}

	function filterShops(complains) {
		console.log(complains);
		const filteredShops = complains.filter((shop) => {
			if (selectedCategory === 'All Shops') return true;
			if (shop.shop_type.includes(selectedCategory)) return true;
			return false;
		});
		return filteredShops;
	}

	useEffect(() => {
		getComplainDataList();
	}, []);

	const filteredShops = filterShops(complains);
	const paginatedComplains = paginateComplains(filteredShops);
	const sortedComplains = sortComplains(paginatedComplains);

	return (
		<>
			<ShowComplain
				items={sortedComplains}
				columns={columns}
				onSort={handleSort}
				sortColumn={sortColumn}
				totalItems={filteredShops.length}
				pageCount={shopsPerPage}
				activePage={activePage}
				onClickPage={handleClickPage}
				addNewComplain={addNewComplain}
				shopCategories={shopCategories}
				selectedCategory={selectedCategory}
				onClickFilter={handleClickFilter}
			/>

			{showDetail ? (
				<ModalComplain
					type="show"
					targetComplain={targetComplain}
					showDetail={showDetail}
					setShowDetail={setShowDetail}
				/>
			) : null}

			{updateDetail ? (
				<ModalComplain
					type="update"
					totalItems={complains.length}
					targetComplain={targetComplain}
					updateDetail={updateDetail}
					setUpdateDetail={setUpdateDetail}
					shopCategories={shopCategories}
					updateComplainData={updateComplainData}
				/>
			) : null}

			{deleteDetail ? (
				<ModalComplain
					type="delete"
					targetComplain={targetComplain}
					deleteDetail={deleteDetail}
					setDeleteDetail={setDeleteDetail}
					deleteComplainData={deleteComplainData}
				/>
			) : null}
		</>
	);
}

export default Complain;