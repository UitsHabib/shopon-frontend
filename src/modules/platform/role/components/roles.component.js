import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";

import Table from "../../../core/components/table.component";
import Pagination from "../../../core/components/pagination.component";
import DeleteModal from "../../../core/components/delete-modal.component";

import { getRoles, deleteRole } from "../role.actions";
import RoleForm from './role-form.component';
import RoleDetails from "./role-details.component";

function Roles() {
    const location = useLocation();

    const dispatch = useDispatch();

    const [action, setAction] = useState({});  
    const roleData = useSelector((state) => state.roleReducer.roleData);

    const columns = [
        { label: "Title", path: "title", sort: true, style: {width: "20%"}, content: (data, path) => <td>{data[path]}</td> },
        { label: "Description", path: "description", sort: true, style: {width: "30%"}, content: (data, path) => <td>{data[path]}</td> },
        { label: "Type", path: "type", sort: true, style: {width: "10%"}, content: (data, path) => <td>{data[path]}</td>},
        { label: "Created By", path: "created_by", sort: true, style: {width: "15%"}, content: (data) => <td>{`${data.createdByUser?.first_name} ${data.createdByUser?.last_name}`}</td> },
        { label: "Updated Date", path: "updated_at", style: {width: "15%"}, content: (data) => <td>{(new Date(data.updated_at)).toLocaleDateString('en-GB').replace(/\//g, '.')}</td> },
        { label: "Action", path: "", style: {width: "10%"}, content: (data) => (
            <Dropdown className="ms-auto dropdown-customize">
                <Dropdown.Toggle
                    variant=""
                    className="btn-outline-secondary dropdown-toggle btn-sm py-0 px-1 dropdown-toggle "
                >
                    <i className="bi bi-chevron-down fa-lg"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setAction({ details: true, roleId: data.id })} > Details </Dropdown.Item>
                    <Dropdown.Item onClick={() => setAction({ update: true, roleId: data.id })} > Edit </Dropdown.Item>
                    <Dropdown.Item onClick={() => setAction({ deleteWarn: true, roleId: data.id })}> Delete </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )},
    ]

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

    useEffect(() => {
        if(location.search) {
            dispatch(getRoles(location.search));
        } else {
            dispatch(getRoles());
        }
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
                        <Table 
                            columns={columns}
                            items={roleData.roles}
                        />

                        <Pagination
                            start={roleData.metaData.start}
                            end={roleData.metaData.end}
                            page={roleData.metaData.page}
                            total={roleData.metaData.total}
                            onPageChange={searchValue => dispatch(getRoles(searchValue.url))}
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
                    <div className="row justify-content-center mt-5 pt-5 mb-3">
                        <div className="col-12 col-sm-6 py-4 bg-white shadow-sm rounded text-center">
                            <i class="icon icon-team icon-6x text-secondary" />
                            <h3 className="fw-bold text-primary pt-4">No Role Found!</h3>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Roles;
