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

	const [shopCategories, setShopCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('All Shops');
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
			setShopCategories(data.shop_categories);
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteShopData(targetShop) {
		// try {
		// 	await axios.delete(`${api}/:${targetShop.shop_id}`);
		// } catch (error) {
		// 	console.log(error);
		// }
		const newShopList = shops.filter(
			(shop) => shop.shop_id !== targetShop.shop_id
		);
		setShops(newShopList);
	}

	async function updateShop(targetShop) {
		// try {
		// 	const { data } = await axios.patch(`${api}/:${targetShop.shop_id}`, targetShop);
		// } catch (error) {
		// 	console.log(error);
		// }
		const newShopList = [...shops];
		let newShop = newShopList.find(
			(shop) => shop.shop_id === targetShop.shop_id
		);
		newShop.shop_name = targetShop.shop_name;
		newShop.shop_type = targetShop.shop_type;
		newShop.shop_owner = targetShop.shop_owner;

		setShops(newShopList);
	}

	async function addNewShop(shop) {
		// try {
		//     const { data } = await axios.post(`${api}`, shop);
		//     setShops((prev) => [...prev, shop]);
		// } catch (error) {
		//     console.log(error);
		// }
		setShops((prev) => [...prev, shop]);
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

	function handleClickFilter(selectedCategory) {
		setSelectedCategory(selectedCategory);
	}

	function sortShops(shops) {
		const sortedShops = _.orderBy(shops, [sortColumn.path], [sortColumn.order]);
		return sortedShops;
	}

	function paginateShops(shops) {
		const start = (activePage - 1) * shopsPerPage;
		const paginatedShops = shops.slice(start, start + shopsPerPage);
		return paginatedShops;
	}

	function filterShops(shops) {
		const filteredshops = shops.filter((shop) => {
			if (selectedCategory === 'All Shops') return true;

			if (shop.shop_type.includes(selectedCategory)) return true;
			return false;
		});
		return filteredshops;
	}

	const filteredshops = filterShops(shops);
	const paginatedShops = paginateShops(filteredshops);
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
			label: 'Shop Owner',
			path: 'shop_owner',
			sorting: true,
			content: (shop, key) => <td>{shop[key]}</td>,
		},
		{
			label: 'Created At',
			path: 'date_created',
			sorting: true,
			content: (shop, key) => <td>{shop[key]}</td>,
		},
		{
			label: 'Action',
			content: (targetShop) => (
				<Dropdown>
					<Dropdown.Toggle variant="outline-success" id="dropdown-basic">
						<i className="bi bi-pencil-square"></i>
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
				totalItems={filteredshops.length}
				pageCount={shopsPerPage}
				activePage={activePage}
				onClickPage={handleClickPage}
				addNewShop={addNewShop}
				shopCategories={shopCategories}
				selectedCategory={selectedCategory}
				onClickFilter={handleClickFilter}
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
					totalItems={shops.length}
					targetShop={targetShop}
					updateDetail={updateDetail}
					setUpdateDetail={setUpdateDetail}
					shopCategories={shopCategories}
					updateShop={updateShop}
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
