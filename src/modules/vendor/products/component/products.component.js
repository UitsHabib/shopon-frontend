import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";

import Pagination from "./pagination.component";
import ProductForm from "./product-form.component";
import { getProducts, getProduct } from "../product.actions";
import { ProductModals } from "./productModals.component";

const Products = (props) => {
    const history = useHistory();
    const location = useLocation();
	const dispatch = useDispatch();

    const [action, setAction] = useState({});

    const productData = useSelector((state) => state.productsReducer.productData);

    const query = new URLSearchParams(location.search);
	const page = query.get('page') || 1;
	const limit = query.get('limit') || 5;
	const orderBy = query.get('orderBy') || 'id';
	const orderType = query.get('orderType') || 'asc';


    const changeUrl = query => {
        const { orderBy, orderType, page, limit } = query || {};

        const search = new URLSearchParams();

        orderBy && search.append('orderBy', orderBy);
        orderType && search.append('orderType', orderType);
        page && search.append('page', page);
        limit && search.append('limit', limit);

        history.push(location.pathname + search ? `?${search.toString()}` : '');
	}

    useEffect(() => {
		dispatch(getProducts(page, limit, orderBy, orderType));
	}, [location, action]);

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
                <ProductForm show={action.addNewProduct || action.updateDetail} onHide={() => setAction({})} />
            </div>
            
            <div className="d-flex flex-wrap justify-content-center">
                <div className="card" style={{ width: "80rem" }}>
                    <div className="card-body d-flex flex-wrap justify-content-center">
                        {productData.products && productData.products.length > 0 && (
                            <React.Fragment>
                                <div className="d-flex flex-wrap justify-content-center">
                                    <table className="table">
                                        <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                                            <tr>
                                                <th scope="col" width="18%"><span onClick={() => changeUrl({ page, limit, orderBy: 'id', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>ID</span></th>
                                                <th scope="col" width="12%"><span onClick={() => changeUrl({ page, limit, orderBy: 'name', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Name</span></th>
                                                <th scope="col" width="12%"><span onClick={() => changeUrl({ page, limit, orderBy: 'category_id', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Category</span></th>
                                                <th scope="col" width="12%"><span onClick={() => changeUrl({ page, limit, orderBy: 'description', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Description</span></th>
                                                <th scope="col" width="12%"><span onClick={() => changeUrl({ page, limit, orderBy: 'price', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Price</span></th>
                                                <th scope="col" width="12%"><span onClick={() => changeUrl({ page, limit, orderBy: 'discount', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Discount</span></th>
                                                <th scope="col" width="12%"><span onClick={() => changeUrl({ page, limit, orderBy: 'stock_quantity', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Available Quantity</span></th>
                                                <th scope="col" width="10%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productData.products && productData.products.map(row => (
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
                                        start={productData.metaData.start}
                                        end={productData.metaData.end}
                                        page={productData.metaData.page}
                                        total={productData.metaData.total}
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
                />
            )}

            {action.deleteDetailModal && (
                <ProductModals
                    type="delete"
                    targetProduct={action.targetProduct}
                    show={action.deleteDetailModal}
                    onHide={() => setAction({})}
                />
            )}
        </>
    );
};

export default Products;
