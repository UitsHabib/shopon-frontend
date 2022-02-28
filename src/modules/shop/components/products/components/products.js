import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";

import Pagination from "./common/pagination.component";
import ProductForm from "./product-form.component";
import { getProducts, getProduct } from "../products.actions";
import { ProductModals } from "./common/productModals.component";

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
    const products = useSelector((state) => state.productsReducer.productList);

    const productsPerPage = 5;

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

    useEffect(() => {
        if(action.targetProduct)
            dispatch(getProduct(action.targetProduct.id))
    }, [action])

    return (
        <>
            <div className="d-flex flex-wrap justify-content-between mx-5 my-3">
                <h5>Shop Table</h5>
                <Button className="btn btn-secondary text-white ms-2 mt-2 mt-sm-0" onClick={() => setAction({ addNewProduct: true })}>
                    <span className="d-none d-sm-inline-block ps-1">Add New Product</span>
                </Button>
                <ProductForm show={action.addNewProduct || action.updateDetail} onHide={() => setAction({})} needToFetch={needToFetch} fetch={setNeedToFetch} />
            </div>
            
            <div className="d-flex flex-wrap justify-content-center">
                <div className="card" style={{ width: "80rem" }}>
                    <div className="card-body d-flex flex-wrap justify-content-center">
                        {products.length > 0 && (
                            <React.Fragment>
                                <div className="d-flex flex-wrap justify-content-center">
                                    <table className="table">
                                        <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                                            <tr>
                                                <th scope="col" width="18%"><span onClick={() => handleSort({ path: "id", order: sortColumn.order === "asc" ? "desc" : "asc"})}>ID</span></th>
                                                <th scope="col" width="12%"><span onClick={() => handleSort({ path: "name", order: sortColumn.order === "asc" ? "desc" : "asc"})}>Name</span></th>
                                                <th scope="col" width="12%"><span onClick={() => handleSort({ path: "category_id", order: sortColumn.order === "asc" ? "desc" : "asc"})}>Category</span></th>
                                                <th scope="col" width="12%"><span onClick={() => handleSort({ path: "description", order: sortColumn.order === "asc" ? "desc" : "asc"})}>Description</span></th>
                                                <th scope="col" width="12%"><span onClick={() => handleSort({ path: "price", order: sortColumn.order === "asc" ? "desc" : "asc"})}>Price</span></th>
                                                <th scope="col" width="12%"><span onClick={() => handleSort({ path: "discount", order: sortColumn.order === "asc" ? "desc" : "asc"})}>Discount</span></th>
                                                <th scope="col" width="12%"><span onClick={() => handleSort({ path: "stock_quantity", order: sortColumn.order === "asc" ? "desc" : "asc"})}>Available Quantity</span></th>
                                                <th scope="col" width="10%">Action</th>

                                                {/* <th scope="col" width="20%"><span onClick={() => urlChange(1, 'description')}>Description</span></th>
                                                <th scope="col" width="12%"><span onClick={() => urlChange(1, 'type')}>Type</span></th>
                                                <th scope="col" width="12%"><span onClick={() => urlChange(1, 'created_by')}>Created By</span></th>
                                                <th scope="col" width="10%"><span onClick={() => urlChange(1, 'created_at')}>Creation Date</span></th>
                                                <th scope="col" width="10%">Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(row => (
                                                <tr key={row.id}>
                                                    <td className="text-break">{row.id ? row.id : '--'}</td>
                                                    <td className="text-break">{row.name ? row.name : '--'}</td>
                                                    <td className="text-break">{row.category_id ? row.category_id : '--'}</td>
                                                    <td className="text-break">{row.description ? row.description : '--'}</td>
                                                    <td className="text-break">{row.price ? row.price : '--'}</td>
                                                    <td className="text-break">{row.discount ? row.discount : '--'}</td>
                                                    <td className="text-break">{row.stock_quantity ? row.stock_quantity : '--'}</td>
                                                    <td data-for="Action">
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="" className="btn-outline-secondary dropdown-toggle btn-sm py-0 px-1 dropdown-toggle ">
                                                            <i className="bi bi-chevron-down fa-lg"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => { setAction({ showDetail: true, targetProduct: row }) }}>
                                                                    Product Details
                                                                </Dropdown.Item>
                                                                <Dropdown.Item onClick={() => { setAction({ updateDetail: true, targetProduct: row }) }}>
                                                                    Update
                                                                </Dropdown.Item>
                                                                <Dropdown.Item onClick={() => { setAction({ deleteDetailModal: true, targetProduct: row }) }}>
                                                                    Delete
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div>
                                        <Pagination
                                            totalItems={totalItems}
                                            pageCount={productsPerPage}
                                            activePage={activePage}
                                            onClickPage={handleClickPage}
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>

            {action.showDetail && (
                <ProductModals
                    type="show"
                    targetProduct={action.targetProduct}
                    show={action.showDetail}
                    onHide={() => setAction({})}
                />
            )}

            {action.updateDetail && (
                <ProductModals
                    type="update"
                    targetProduct={action.targetProduct}
                    show={action.addNewProduct || action.updateDetail}
                    onHide={() => setAction({})}
                    needToFetch={needToFetch}
                    fetch={setNeedToFetch}
                />
            )}

            {action.deleteDetailModal && (
                <ProductModals
                    type="delete"
                    targetProduct={action.targetProduct}
                    show={action.deleteDetailModal}
                    onHide={() => setAction({})}
                    needToFetch={needToFetch}
                    fetch={setNeedToFetch}
                />
            )}
        </>
    );
};

export default Products;
