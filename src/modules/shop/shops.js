import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Dropdown } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';

import { ModalForShops } from './common/modalForShop.component';
import ShowShops from './show-shops.component';

const Shops = (props) => {
	const { path } = useRouteMatch();

	const [shops, setShops] = useState([]);

	//const [shopCategories, setShopCategories] = useState([]);
	//const [selectedCategory, setSelectedCategory] = useState('All Shops');
	const [sortColumn, setSortColumn] = useState({
		path: 'shop_id',
		order: 'asc',
	});
	const [activePage, setActivePage] = useState(1);
	const [shopsPerPage, setShopsPerPage] = useState(5);

	const [showDetail, setShowDetail] = useState(false);
	const [updateDetail, setUpdateDetail] = useState(false);
	const [deleteDetail, setDeleteDetail] = useState(false);

	const [targetShop, setTargetShop] = useState({});

	async function getShopData() {
		try {
			const { data } = await axios.get('shop-data.json');
			setShops(data.shops);
			//setShopCategories(data.shop_categories);
		} catch (error) {
			console.log(error);
		}
	}

    async function deleteShopData(targetShop) {
		// try {
		// 	await axios.delete(`${api}/:${shop.shop_id}`, shop);
		// } catch (error) {
		// 	console.log(error);
		// }
        const newShopList = shops.filter(shop => shop.shop_id !== targetShop.shop_id);
        setShops(newShopList);
	}

	useEffect(() => {
		getShopData();
	}, []);

	function showShopDropdown(targetShop) {
		setShowDetail((prev) => !prev);
		setTargetShop(targetShop);
	}

	function updateShopDropdown(targetShop) {
		setUpdateDetail((prev) => !prev);
		setTargetShop(targetShop);
	}

	function deleteShopDropdown(targetShop) {
		setDeleteDetail((prev) => !prev);
		setTargetShop(targetShop);
	}

	function handleSort(sortColumn) {
		setSortColumn(sortColumn);
	}

	function handleClickPage(activePage) {
		setActivePage(activePage);
	}

	// function handleClickFilter(selectedCategory) {
	// 	setSelectedCategory(selectedCategory);
	// }

	function sortShops(shops) {
		const sortedShops = _.orderBy(shops, [sortColumn.path], [sortColumn.order]);
		return sortedShops;
	}

	function paginateShops(shops) {
		const start = (activePage - 1) * shopsPerPage;
		const paginatedShops = shops.slice(start, start + shopsPerPage);
		return paginatedShops;
	}

	// function filterShops() {
	// 	const filteredshops = shops.filter((shop) => {
	// 		if (shopCategories === 'All Genres') return true;

	// 		if (shop.shop_type.includes(shopCategories)) return true;
	// 		return false;
	// 	});
	// 	return filteredshops;
	// }

	const paginatedShops = paginateShops(shops);
	const sortedShops = sortShops(paginatedShops);

	const columns = [
		{
			label: 'ID',
			path: 'shop_id',
			sorting: true,
			content: (shop, key) => <td>{shop[key]}</td>,
		},
		{
			label: 'Shop Name',
			path: 'shop_name',
			sorting: true,
			content: (shop, key) => <td>{shop[key]}</td>,
		},
		{
			label: 'Shop Category',
			path: 'shop_type',
			sorting: true,
			content: (shop, key) => <td>{shop[key]}</td>,
		},
		{
			label: 'Action',
			content: (targetShop) => (
				<>
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							<i
								className="bi bi-pencil-square"
							></i>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={() => showShopDropdown(targetShop)}>
								Shop Details
							</Dropdown.Item>
							<Dropdown.Item onClick={() => updateShopDropdown(targetShop)}>
								Update
							</Dropdown.Item>
							<Dropdown.Item onClick={() => deleteShopDropdown(targetShop)}>
								Delete
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</>
			),
		},
	];

	return (
		<>
			<ShowShops
				items={sortedShops}
				columns={columns}
				onSort={handleSort}
				sortColumn={sortColumn}
				totalItems={shops.length}
				pageCount={shopsPerPage}
				activePage={activePage}
				onClickPage={handleClickPage}
				//selectedCategory={selectedCategory}
				//onClickFilter={handleClickFilter}
			/>
			{showDetail ? (
				<ModalForShops
					type="show"
					targetShop={targetShop}
					showDetail={showDetail}
					setShowDetail={setShowDetail}
				/>
			) : null}

			{updateDetail ? (
				<ModalForShops
					type="update"
					targetShop={targetShop}
					updateDetail={updateDetail}
					setUpdateDetail={setUpdateDetail}
				/>
			) : null}

			{deleteDetail ? (
				<ModalForShops
					type="delete"
					targetShop={targetShop}
					deleteDetail={deleteDetail}
					setDeleteDetail={setDeleteDetail}
                    deleteShopData={deleteShopData}
				/>
			) : null}
		</>
	);
};

export default Shops;
