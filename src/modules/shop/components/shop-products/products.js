import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Dropdown } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";

import ShowProducts from "./show-products.component";
import {
    getPaginatedProducts,
    getAllProducts,
    getSortedProducts,
} from "./products.actions";
import Pagination from "./common/pagination.component";
import { toast } from "react-toastify";
import Table from "./common/table.component";

const Products = (props) => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const shopProducts = useSelector(
        (state) => state.shopProductsReducer.productList
    );
    const totalItems = useSelector(
        (state) => state.shopProductsReducer.totalProducts
    );
    const paginatedProducts = useSelector(
        (state) => state.shopProductsReducer.paginatedProductList
    );

    const sortedProducts = useSelector(
        (state) => state.shopProductsReducer.sortedProductList
    );

    const productsPerPage = 5;
    const [activePage, setActivePage] = useState(1);
    const [sortColumn, setSortColumn] = useState({
        path: "id",
        order: "asc",
    });

    const [targetProduct, setTargetProduct] = useState({});
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [updateDetailModal, setUpdateDetailModal] = useState(false);
    const [deleteDetailModal, setDeleteDetailModal] = useState(false);
    const columns = [
        {
            label: "ID",
            path: "id",
            sorting: true,
            content: (products, key) => (
                <td>{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Product Name",
            path: "name",
            sorting: true,
            content: (products, key) => (
                <td>{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Price",
            path: "price",
            sorting: true,
            content: (products, key) => (
                <td>{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Description",
            path: "description",
            sorting: true,
            content: (products, key) => (
                <td>{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Available Quantity",
            path: "stock_quantity",
            sorting: true,
            content: (products, key) => (
                <td>{products[key] === null ? "--" : products[key]}</td>
            ),
        },
        {
            label: "Action",
            path: "action",
            content: (targetShop) => (
                <></>
                // <Dropdown>
                //     <Dropdown.Toggle
                //         variant="outline-success"
                //         id="dropdown-basic"
                //     >
                //         <i className="bi bi-pencil-square"></i>
                //     </Dropdown.Toggle>

                //     <Dropdown.Menu>
                //         <Dropdown.Item
                //             onClick={() => {
                //                 setShowDetailModal((prev) => !prev);
                //                 setTargetShop(targetShop);
                //             }}
                //         >
                //             Shop Details
                //         </Dropdown.Item>
                //         <Dropdown.Item
                //             onClick={() => {
                //                 setUpdateDetailModal((prev) => !prev);
                //                 setTargetShop(targetShop);
                //             }}
                //         >
                //             Update
                //         </Dropdown.Item>
                //         <Dropdown.Item
                //             onClick={() => {
                //                 setDeleteDetailModal((prev) => !prev);
                //                 setTargetShop(targetShop);
                //             }}
                //         >
                //             Delete
                //         </Dropdown.Item>
                //     </Dropdown.Menu>
                // </Dropdown>
            ),
        },
    ];

    const handleClickPage = (activePage) => setActivePage(activePage);
    const handleSort = (sortColumn) => setSortColumn(sortColumn);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    // useEffect(() => {
    //     dispatch(getPaginatedProducts(activePage, productsPerPage));
    // }, [activePage]);

    useEffect(() => {
        dispatch(
            getSortedProducts(
                activePage,
                productsPerPage,
                sortColumn.path,
                sortColumn.order
            )
        );
    }, [sortColumn, activePage]);

    return (
        <>
            <Table
                items={sortedProducts}
                columns={columns}
                sortColumn={sortColumn}
                onSort={handleSort}
            />
            <Pagination
                totalItems={totalItems}
                pageCount={productsPerPage}
                activePage={activePage}
                onClickPage={handleClickPage}
            />

            {/* {showDetailModal ? (
                <ModalForProduct
                    type="show"
                    targetShop={targetShop}
                    showDetailModal={showDetailModal}
                    setShowDetailModal={setShowDetailModal}
                />
            ) : null} */}

            {/* {updateDetailModal ? (
                <ModalForProduct
                    type="update"
                    totalItems={shops.length}
                    targetShop={targetShop}
                    updateDetailModal={updateDetailModal}
                    setUpdateDetailModal={setUpdateDetailModal}
                    shopCategories={shopCategories}
                    onClickUpdateShop={handleUpdateShop}
                />
            ) : null} */}

            {/* {deleteDetailModal ? (
                <ModalForProduct
                    type="delete"
                    targetShop={targetShop}
                    deleteDetailModal={deleteDetailModal}
                    setDeleteDetailModal={setDeleteDetailModal}
                    onClickDeleteShop={handleDeleteShop}
                />
            ) : null} */}
        </>
    );
};

export default Products;
