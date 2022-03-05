import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";

import DeleteModal from "./common/delete-modal.component";
import Pagination from "./common/pagination.component";
import { getRoles, deleteRole } from "../role.actions";
import RoleForm from './role-form.component';
import RoleDetails from "./role-details.component";

function Roles() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const [action, setAction] = useState({});
    
    const roleData = useSelector((state) => state.roleReducer.roleData);

    const query = new URLSearchParams(location.search);
	const page = query.get('page') || 1;
	const limit = query.get('limit') || 15;
	const orderBy = query.get('orderBy')
	const orderType = query.get('orderType')

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

    const handleDelete = () => {
        dispatch(deleteRole(action.roleId))
            .then(response => {
                toast(
                    'Role Deleted Successfully', 
                    { background: '#8329C5', color: '#ffffff' }
                )
                setAction({});
            })
            .catch(error => {
                toast.error(
                    'Error happened',
                    { background: '#8329C5', color: '#ffffff' }
                );
                setAction({});
            })
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
        dispatch(getRoles(page, limit, orderBy, orderType));
    }, [action, location]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="d-sm-flex justify-content-between align-items-center py-3">
                    <h4 className="mb-2 mb-sm-0 cdp-text-primary fw-bold mb-0 mb-sm-0 d-flex align-items-end pe-2">
                        Role list
                    </h4>
                    <button className="btn btn-secondary text-white ms-2 mt-2 mt-sm-0" onClick={() => setAction({ create: true })}>
                        <span className="d-none d-sm-inline-block ps-1">Create new role</span>
                    </button>
                </div>

                {roleData['roles'] && roleData['roles'].length > 0 &&
                    <div>
                        <table className="table">
                            <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                                <tr>
                                    <th scope="col" width="12%"><span onClick={() => changeUrl({ page, path: "title" })}>Title {findSort("title")}</span></th>
                                    <th scope="col" width="20%"><span onClick={() => changeUrl({ page, path: "description" })}>Description {findSort("description")}</span></th>
                                    <th scope="col" width="12%"><span onClick={() => changeUrl({ page, path: "type" })}>Type {findSort("type")}</span></th>
                                    <th scope="col" width="12%"><span onClick={() => changeUrl({ page, path: "created_by" })}>Created By {findSort("created_by")}</span></th>
                                    <th scope="col" width="10%"><span onClick={() => changeUrl({ page, path: "created_at" })}>Creation Date {findSort("created_at")}</span></th>
                                    <th scope="col" width="10%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roleData.roles.map(row => (
                                    <tr key={row.id}>
                                        <td className="text-break">{row.title}</td>
                                        <td className="text-break">{row.description}</td>
                                        <td className="text-break">{row.type}</td>
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
                                                    <Dropdown.Item onClick={() => setAction({ details: true, roleId: row.id })} > Details </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setAction({ update: true, roleId: row.id })} > Edit </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setAction({ deleteWarn: true, roleId: row.id })}> Delete </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination
                            start={roleData.start}
                            end={roleData.end}
                            page={roleData.page}
                            total={roleData.total}
                        />
                    </div>
                }

                <RoleDetails 
                    show={action.details}
                    roleId={action.roleId}
                    onHide={() => setAction({})}
                />

                <RoleForm 
                    show={action.create || action.update}
                    onHide={() => setAction({})}
                    roleId={action.roleId} 
                />

                <DeleteModal 
                    show={action.deleteWarn}
                    deleteName="Role"
                    onClickDelete={handleDelete}
                    onHide={() => setAction({})}
                />

                {roleData['roles'] && roleData['roles'].length === 0 &&
                    <><div className="row justify-content-center mt-5 pt-5 mb-3">
                        <div className="col-12 col-sm-6 py-4 bg-white shadow-sm rounded text-center">
                            <i class="icon icon-team icon-6x text-secondary"></i>
                            <h3 className="fw-bold text-primary pt-4">No Role Found!</h3>
                        </div>
                    </div></>
                }
            </div>
        </div>
    );
}

export default Roles;
