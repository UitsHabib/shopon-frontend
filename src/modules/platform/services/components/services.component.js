import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";


import { Table, Pagination } from "../common/components";
import ServiceDetails from "./serviceDetails.component";
import { getServices } from "../service.actions";

const Services = (props) => {
	const history = useHistory();
    const location = useLocation();
	const dispatch = useDispatch();

	const [action, setAction] = useState({});

	const serviceData = useSelector(state => state.serviceReducer.serviceData);

	const query = new URLSearchParams(location.search);
	const page = query.get('page');
	const limit = query.get('limit');
	const orderBy = query.get('orderBy');
	const orderType = query.get('orderType');

	const changeUrl = query => {
        const { orderBy, orderType, page, limit } = query || {};

        const search = new URLSearchParams();

        orderBy && search.append('orderBy', orderBy);
        orderType && search.append('orderType', orderType);
        page && search.append('page', page);

        history.push(location.pathname + search ? `?${search.toString()}` : '');
	}

	useEffect(() => {
		dispatch(getServices(page, limit, orderBy, orderType));
	}, [location]);

	return (
		<>
			<div className="container-fluid">
                <div className="row">
                    <div className="d-sm-flex justify-content-between align-items-center py-3">
                        <h4 className="mb-2 mb-sm-0 cdp-text-primary fw-bold mb-0 mb-sm-0 d-flex align-items-end pe-2">
                            Service list
                        </h4>
                    </div>

                    {serviceData['services'] && serviceData['services'].length > 0 &&
                        <React.Fragment>
                            <div>
                                <table className="table">
                                    <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                                        <tr>
                                            <th scope="col" width="20%"><span onClick={() => changeUrl({ orderBy: 'title', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Title</span></th>
                                            <th scope="col" width="20%"><span onClick={() => changeUrl({ orderBy: 'created_by', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Created By</span></th>
                                            <th scope="col" width="20%"><span onClick={() => changeUrl({ orderBy: 'created_at', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Creation Date</span></th>
                                            <th scope="col" width="20%">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceData.services.map(row => (
                                            <tr key={row.id}>
                                                <td className="text-break">{row.title}</td>
                                                <td>{`${row.createdByUser?.first_name} ${row.createdByUser?.last_name}`}</td>
                                                <td>{(new Date(row.created_at)).toLocaleDateString('en-GB').replace(/\//g, '.')}</td>
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

                                <div>
                                    {/* <Pagination
                                        start={roleData.start}
                                        end={roleData.end}
                                        page={roleData.page}
                                        total={roleData.total}
                                    /> */}
                                </div>
                            </div>
                        </React.Fragment>
                    }

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
		</>
	);
};

export default Services;
