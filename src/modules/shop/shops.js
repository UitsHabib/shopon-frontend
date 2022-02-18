import React from "react";
import { useState, useEffect } from "react";
import _ from "lodash";
import { Dropdown } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";

import { ModalForShops } from "./common/modalForShop.component";
import ShowShops from "./show-shops.component";
import { getShops } from "./shops.action";
import { toast } from "react-toastify";

const Shops = (props) => {
    const { path } = useRouteMatch();

    const [shops, setShops] = useState([]);
    const [shopCategories, setShopCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Shops");
    const [sortColumn, setSortColumn] = useState({
        path: "shop_id",
        order: "asc",
    });
    const [activePage, setActivePage] = useState(1);
    const [shopsPerPage, setShopsPerPage] = useState(5);
    const [targetShop, setTargetShop] = useState({});
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [updateDetailModal, setUpdateDetailModal] = useState(false);
    const [deleteDetailModal, setDeleteDetailModal] = useState(false);

    const columns = [
        {
            label: "ID",
            path: "shop_id",
            sorting: true,
            content: (shop, key) => <td>{shop[key]}</td>,
        },
        {
            label: "Shop Name",
            path: "shop_name",
            sorting: true,
            content: (shop, key) => <td>{shop[key]}</td>,
        },
        {
            label: "Shop Category",
            path: "shop_type",
            sorting: true,
            content: (shop, key) => <td>{shop[key]}</td>,
        },
        {
            label: "Shop Owner",
            path: "shop_owner",
            sorting: true,
            content: (shop, key) => <td>{shop[key]}</td>,
        },
        {
            label: "Created At",
            path: "date_created",
            sorting: true,
            content: (shop, key) => <td>{shop[key]}</td>,
        },
        {
            label: "Action",
            content: (targetShop) => (
                <Dropdown>
                    <Dropdown.Toggle
                        variant="outline-success"
                        id="dropdown-basic"
                    >
                        <i className="bi bi-pencil-square"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => {
                                setShowDetailModal((prev) => !prev);
                                setTargetShop(targetShop);
                            }}
                        >
                            Shop Details
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setUpdateDetailModal((prev) => !prev);
                                setTargetShop(targetShop);
                            }}
                        >
                            Update
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setDeleteDetailModal((prev) => !prev);
                                setTargetShop(targetShop);
                            }}
                        >
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ),
        },
    ];

    async function handleGetShops() {
        try {
            const { data } = await getShops();
            setShops(data.shops);
            setShopCategories(data.shop_categories);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteShop(targetShop) {
        // try {
        // 	await deleteShop(targetShop.shop_id);
        // } catch (error) {
        // 	console.log(error);
        // }
        const newShopList = shops.filter(
            (shop) => shop.shop_id !== targetShop.shop_id
        );
        setShops(newShopList);
        toast.success('Shop Deleted Successfully', {
            backgroundColor: '#8329C5',
            color: '#ffffff',
        })
    }

    async function handleUpdateShop(targetShop) {
        // try {
        // 	const { data } = await updateShop(targetShop);
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
        toast.success('Shop Updated Successfully', {
            backgroundColor: '#8329C5',
            color: '#ffffff',
        })
    }

    async function handleAddNewShop(shop) {
        // try {
        //     const { data } = await addNewShop(shop);
        //     setShops((prev) => [...prev, shop]);
        // } catch (error) {
        //     console.log(error);
        // }
        setShops((prev) => [...prev, shop]);
        toast.success('New Shop Added Successfully', {
            backgroundColor: '#8329C5',
            color: '#ffffff',
        })
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
        const sortedShops = _.orderBy(
            shops,
            [sortColumn.path],
            [sortColumn.order]
        );
        return sortedShops;
    }

    function paginateShops(shops) {
        const start = (activePage - 1) * shopsPerPage;
        const paginatedShops = shops.slice(start, start + shopsPerPage);
        return paginatedShops;
    }

    function filterShops(shops) {
        const filteredshops = shops.filter((shop) => {
            if (selectedCategory === "All Shops") return true;

            if (shop.shop_type.includes(selectedCategory)) return true;
            return false;
        });
        return filteredshops;
    }

    useEffect(() => {
        handleGetShops();
    }, []);

    const filteredshops = filterShops(shops);
    const paginatedShops = paginateShops(filteredshops);
    const sortedShops = sortShops(paginatedShops);

    return (
        <>
            <ShowShops
                items={sortedShops}
                shopCategories={shopCategories}
                columns={columns}
                onSort={handleSort}
                sortColumn={sortColumn}
                totalItems={filteredshops.length}
                totalShops={shops.length}
                pageCount={shopsPerPage}
                activePage={activePage}
                selectedCategory={selectedCategory}
                onClickPage={handleClickPage}
                onClickAddNewShop={handleAddNewShop}
                onClickFilter={handleClickFilter}
            />

            {showDetailModal ? (
                <ModalForShops
                    type="show"
                    targetShop={targetShop}
                    showDetailModal={showDetailModal}
                    setShowDetailModal={setShowDetailModal}
                />
            ) : null}

            {updateDetailModal ? (
                <ModalForShops
                    type="update"
                    totalItems={shops.length}
                    targetShop={targetShop}
                    updateDetailModal={updateDetailModal}
                    setUpdateDetailModal={setUpdateDetailModal}
                    shopCategories={shopCategories}
                    onClickUpdateShop={handleUpdateShop}
                />
            ) : null}

            {deleteDetailModal ? (
                <ModalForShops
                    type="delete"
                    targetShop={targetShop}
                    deleteDetailModal={deleteDetailModal}
                    setDeleteDetailModal={setDeleteDetailModal}
                    onClickDeleteShop={handleDeleteShop}
                />
            ) : null}
        </>
    );
};

export default Shops;
