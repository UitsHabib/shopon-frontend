import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Dropdown } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";

import ShowProducts from "./show-products.component";
import { getPaginatedProducts, getAllProducts } from "./products.actions";
import Pagination from "./common/pagination.component";
import { toast } from "react-toastify";
import Table from "./common/table.component";

const Products = (props) => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const shopProducts = useSelector(
        (state) => state.shopProductsReducer.productList
    );
    const [sortColumn, setSortColumn] = useState({
        path: "id",
        order: "asc",
    });
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const productsPerPage = 5;
    let totalPages = 0
    const [activePage, setActivePage] = useState(1);

    const [targetProduct, setTargetProduct] = useState({});
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [updateDetailModal, setUpdateDetailModal] = useState(false);
    const [deleteDetailModal, setDeleteDetailModal] = useState(false);

    const handleClickPage = (activePage) => setActivePage(activePage);

    async function paginateProducts() {
        totalPages = Math.ceil((shopProducts.length)/productsPerPage);
        try {
            const { data } = await getPaginatedProducts(activePage, productsPerPage); 
            setPaginatedProducts(data.products);
        } catch(error) {
            console.log(error);
        }
    };

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

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    paginateProducts();

    return (
        <>
            <Table items={paginatedProducts} columns={columns} />
            <Pagination totalItems={shopProducts.length} pageCount={totalPages} activePage={activePage} onClickPage={handleClickPage} />

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
