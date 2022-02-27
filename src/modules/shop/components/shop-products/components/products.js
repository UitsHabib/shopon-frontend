import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";

import { getProducts, getProduct } from "../products.actions";
import Pagination from "./common/pagination.component";
import Table from "./common/table.component";
import { ProductModals } from "./common/productModals.component";
import ProductForm from "./product-form.component";

const Products = (props) => {
    const dispatch = useDispatch();

    const [activePage, setActivePage] = useState(1);
    const [sortColumn, setSortColumn] = useState({
        path: "id",
        order: "asc",
    });

    const [needToFetch, setNeedToFetch] = useState(false);
    const [action, setAction] = useState({});

    const totalItems = useSelector((state) => state.productsReducer.totalProducts);
    const sortedProducts = useSelector((state) => state.productsReducer.productList);
    const targetProduct = useSelector((state) => state.productsReducer.product);

    const productsPerPage = 5;
    const columns = [
        {
            label: "ID",
            path: "id",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">
                    {products[key] === null ? "--" : products[key]}
                </td>
            ),
        },
        {
            label: "Product Name",
            path: "name",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">
                    {products[key] === null ? "--" : products[key]}
                </td>
            ),
        },
        {
            label: "Category ID",
            path: "category_id",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">
                    {products[key] === null ? "--" : products[key]}
                </td>
            ),
        },
        {
            label: "Description",
            path: "description",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">
                    {products[key] === null ? "--" : products[key]}
                </td>
            ),
        },
        {
            label: "Price",
            path: "price",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">
                    {products[key] === null ? "--" : products[key]}
                </td>
            ),
        },
        {
            label: "Discount",
            path: "discount",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">
                    {products[key] === null ? "--" : products[key]}
                </td>
            ),
        },
        {
            label: "Available Quantity",
            path: "stock_quantity",
            sorting: true,
            content: (products, key) => (
                <td class="text-center">
                    {products[key] === null ? "--" : products[key]}
                </td>
            ),
        },
        {
            label: "Action",
            path: "action",
            content: (targetProduct) => (
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
                                setAction({ showDetail: true });
                                dispatch(getProduct(targetProduct.id));
                            }}
                        >
                            Product Details
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setAction({ updateDetail: true });
                                dispatch(getProduct(targetProduct.id));
                            }}
                        >
                            Update
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setAction({ deleteDetailModal: true });
                                dispatch(getProduct(targetProduct.id));
                            }}
                        >
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ),
        },
    ];

    function handleClickPage(activePage) {
        setActivePage(activePage);
    }

    function handleSort(sortColumn) {
        setSortColumn(sortColumn);
    }

    useEffect(() => {
        dispatch(
            getProducts(
                activePage,
                productsPerPage,
                sortColumn.path,
                sortColumn.order
            )
        );
    }, [sortColumn, activePage, needToFetch]);

    return (
        <>
            <div className="d-flex flex-wrap justify-content-between mx-5">
                <h5 className="my-3">Shop Table</h5>
                <Button
                    className="my-3"
                    variant="success"
                    onClick={() => setAction({ addNewProduct: true })}
                >
                    Add New Product
                </Button>
                <ProductForm
                    show={action.addNewProduct || action.updateDetail}
                    onHide={() => setAction({})}
                    needToFetch={needToFetch}
                    fetch={setNeedToFetch}
                />
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <div className="card" style={{ width: "80rem" }}>
                    <div className="card-body d-flex flex-wrap justify-content-center">
                        {sortedProducts.length > 0 ? (
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
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>

            {action.showDetail ? (
                <ProductModals
                    type="show"
                    targetProduct={targetProduct}
                    show={action.showDetail}
                    onHide={() => setAction({})}
                />
            ) : null}

            {action.updateDetail ? (
                <ProductModals
                    type="update"
                    targetProduct={targetProduct}
                    show={action.addNewProduct || action.updateDetail}
                    onHide={() => setAction({})}
                    needToFetch={needToFetch}
                    fetch={setNeedToFetch}
                />
            ) : null}

            {action.deleteDetailModal ? (
                <ProductModals
                    type="delete"
                    targetProduct={targetProduct}
                    show={action.deleteDetailModal}
                    onHide={() => setAction({})}
                    needToFetch={needToFetch}
                    fetch={setNeedToFetch}
                />
            ) : null}
        </>
    );
};

export default Products;
