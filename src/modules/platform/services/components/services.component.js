import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";

import Pagination from "./common/pagination.component";
import ServiceDetails from "./serviceDetails.component";
import { getServices } from "../service.actions";

const Services = (props) => {
	const history = useHistory();
    const location = useLocation();
	const dispatch = useDispatch();

	const [action, setAction] = useState({});

	const serviceData = useSelector(state => state.serviceReducer.serviceData);

	const query = new URLSearchParams(location.search);
	const page = query.get('page') || 1;
	const limit = query.get('limit') || 15;
	const orderBy = query.get('orderBy');
	const orderType = query.get('orderType');

	const changeUrl = ({ page, path }) => {
        const search = new URLSearchParams();

        page && search.append('page', page);
        search.append('limit', limit);
        path && search.append('orderBy', path);
        
        if(path === orderBy) {
            if(orderType === "asc") {
                search.append('orderType', 'desc');
            } else {
                search.append('orderType', 'asc');
            }
        } else {
            search.append('orderType', 'desc');
        }

        history.push(location.pathname + search ? `?${search.toString()}` : '');
	}

    const findSort = (path) => {
        if(orderBy === path) {
            if(orderBy === path && orderType === "asc") {
                return <i className="fas fa-arrow-down ms-1" />;
            } else {
                return <i className="fas fa-arrow-up ms-1" />;
            }
        } else {
            return null;
        }
    }

	useEffect(() => {
		dispatch(getServices(page, limit, orderBy, orderType));
	}, [action, location]);

	return (
		<div className="container-fluid">
            <div className="row">
                <div className="d-sm-flex justify-content-between align-items-center py-3">
                    <h4 className="mb-2 mb-sm-0 cdp-text-primary fw-bold mb-0 mb-sm-0 d-flex align-items-end pe-2">
                        Service list
                    </h4>
                </div>

                {serviceData['services'] && serviceData['services'].length > 0 &&
                    <div>
                        <table className="table">
                            <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                                <tr>
                                    <th scope="col" width="20%"><span onClick={() => changeUrl({ page, path: 'title' })}>Title {findSort('title')}</span></th>
                                    <th scope="col" width="30%"><span onClick={() => changeUrl({ page, path: 'slug' })}>Slug {findSort('slug')}</span></th>
                                    <th scope="col" width="20%"><span onClick={() => changeUrl({ page, path: 'created_at' })}>Created Date {findSort('created_at')}</span></th>
                                    <th scope="col" width="20%"><span onClick={() => changeUrl({ page, path: 'updated_at' })}>Updated Date {findSort('updated_at')}</span></th>
                                    <th scope="col" width="10%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceData.services.map(row => (
                                    <tr key={row.id}>
                                        <td className="text-break">{row.title}</td>
                                        <td className="text-break">{row.slug}</td>
                                        <td>{(new Date(row.created_at)).toLocaleDateString('en-GB').replace(/\//g, '.')}</td>
                                        <td>{(new Date(row.updated_at)).toLocaleDateString('en-GB').replace(/\//g, '.')}</td>
                                        <td data-for="Action">
                                            <Dropdown className="ms-auto dropdown-customize">
                                                <Dropdown.Toggle
                                                    variant=""
                                                    className="btn-outline-secondary dropdown-toggle btn-sm py-0 px-1 dropdown-toggle "
                                                >
                                                    <i className="bi bi-chevron-down fa-lg"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => setAction({ details: true, serviceId: row.id })} > Details </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination
                            start={serviceData.meta.start}
                            end={serviceData.meta.end}
                            page={serviceData.meta.page}
                            total={serviceData.meta.total}
                        />
                    </div>
                }

                <ServiceDetails 
                    show={action.details}
                    serviceId={action.serviceId}
                    onHide={() => setAction({})}
                />

                {serviceData['services'] && serviceData['services'].length === 0 &&
                    <><div className="row justify-content-center mt-5 pt-5 mb-3">
                        <div className="col-12 col-sm-6 py-4 bg-white shadow-sm rounded text-center">
                            <i class="icon icon-team icon-6x text-secondary"></i>
                            <h3 className="fw-bold text-primary pt-4">No Service Found!</h3>
                        </div>
                    </div></>
                }
            </div>
        </div>
	);
};

export default Services;
