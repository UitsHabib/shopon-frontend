import React from "react";
import { useState, useEffect } from "react";
import _ from "lodash";
import { Dropdown } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";

import ShowProducts from "./show-products.component";
import { getPaginatedProducts, getAllProducts } from "./products.action";
import { toast } from "react-toastify";
import Table from "./common/table.component";
import ReactPaginate from "react-paginate";

const Products = (props) => {
    const { path } = useRouteMatch();

    const [products, setProducts] = useState([]);
    const [sortColumn, setSortColumn] = useState({
        path: "id",
        order: "asc",
    });
    const [productsPerPage, setProductsPerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(0);

    const [targetProduct, setTargetProduct] = useState({});
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [updateDetailModal, setUpdateDetailModal] = useState(false);
    const [deleteDetailModal, setDeleteDetailModal] = useState(false);

    async function fetchAllProducts() {
        try {
            const { data } = await getAllProducts();
            console.log(data);
            const total = data.length();
            setTotalPage(Math.ceil(total / productsPerPage));
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    async function getProducts(currentPage) {
        try {
            const { data } = await getPaginatedProducts(
                currentPage,
                productsPerPage
            );
            console.log(data);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    }

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

    async function paginateProducts(selectedPage) {
        console.log(selectedPage.selected);
        let currentPage = selectedPage.selected + 1;
        getProducts(currentPage);
    }

    return (
        <>
            <Table items={products} columns={columns} />

            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                pageCount={totalPage}
                onPageChange={paginateProducts}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
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
