import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import {toast} from "react-toastify";

import Table from "../../../core/components/table.component";
import Pagination from "../../../core/components/pagination.component";
import DeleteModal from "../../../core/components/delete-modal.component";

import PermissionForm from "./permission-form.component";
import PermissionDetails from "./permission-details.component";
import { getPermissions, deletePermission } from "../permission.actions";

const Permissions = () => {
    const location = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();

    const [action, setAction] = useState({});
    const permissionData = useSelector(state => state.permissionReducer.permissionData)

    const columns = [
        { label: "Title", path: "title", sort: true, style: {width: "20%"}, content: (data, path) => <td>{data[path]}</td>},
        { label: "Description", path: "description", sort: true, style: {width: "30%"}, content: (data, path) => <td>{data[path]}</td>},
        { label: "Type", path: "type", sort: true, style: {width: "10%"}, content: (data, path) => <td>{data[path]}</td>},
        { label: "Created Date", path: "created_at", sort: true, style: {width: "15%"}, content: (data) => <td>{(new Date(data.created_at)).toLocaleDateString('en-GB').replace(/\//g, '.')}</td>},
        { label: "Updated Date", path: "updated_at", style: {width: "15%"}, content: (data) => <td>{(new Date(data.updated_at)).toLocaleDateString('en-GB').replace(/\//g, '.')}</td>},
        { label: "Action", path: "", style: {width: "10%"}, content: (data) => (
            <Dropdown className="ms-auto dropdown-customize">
                <Dropdown.Toggle
                    variant=""
                    className="btn-outline-secondary dropdown-toggle btn-sm py-0 px-1 dropdown-toggle "
                >
                    <i className="bi bi-chevron-down fa-lg"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setAction({ details: true, permissionId: data.id })} > Details </Dropdown.Item>
                    <Dropdown.Item onClick={() => setAction({ update: true, permissionId: data.id })} > Edit </Dropdown.Item>
                    <Dropdown.Item onClick={() => setAction({ deleteWarn: true, permissionId: data.id })}> Delete </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )},
    ]

    const handleDelete = () => {
        dispatch(deletePermission(action.permissionId))
            .then(response => {
                toast(
                    'Permission Deleted Successfully', 
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
    };

    useEffect(() => {
        if(location.search) {
            dispatch(getPermissions(location.search))
        } else {
            const urlSearchParams = new URLSearchParams(window.location.search);

            urlSearchParams.set('page', 1);
            urlSearchParams.set('orderBy', "title");
            urlSearchParams.set("limit", 15);
            urlSearchParams.set("orderType", "asc");

            const url = location.pathname + urlSearchParams ? `?${urlSearchParams.toString()}` : '';
            history.push(url);

            dispatch(getPermissions(url))
        }
    }, [action, location])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="d-sm-flex justify-content-between align-items-center py-3">
                        <h4 className="mb-2 mb-sm-0 cdp-text-primary fw-bold mb-0 mb-sm-0 d-flex align-items-end pe-2">
                            Permission list
                        </h4>
                        <button className="btn btn-secondary text-white ms-2 mt-2 mt-sm-0" onClick={() => setAction({ create: true })}>
                            <span className="d-none d-sm-inline-block ps-1">Create new permission</span>
                        </button>
                    </div>

                    {permissionData['permissions'] && permissionData['permissions'].length > 0 &&
                        <div>
                            <Table 
                                columns={columns}
                                items={permissionData.permissions}
                            />

                            <Pagination
                                start={permissionData.metaData.start}
                                end={permissionData.metaData.end}
                                page={permissionData.metaData.page}
                                total={permissionData.metaData.total}
                                onPageChange={(searchValue) => dispatch(getPermissions(searchValue.url))}
                            />
                        </div>
                    }

                    <PermissionDetails
                        show={action.details}
                        permissionId={action.permissionId}
                        onHide={() => setAction({})}
                    />

                    <PermissionForm 
                        show={action.create || action.update}
                        permissionId={action.permissionId} 
                        onHide={() => setAction({})}
                    />

                    <DeleteModal 
                        show={action.deleteWarn}
                        onClickDelete={handleDelete}
                        onHide={() => setAction({})}
                    /> 

                    {permissionData['permissions'] && permissionData['permissions'].length === 0 &&
                        <div className="row justify-content-center mt-5 pt-5 mb-3">
                            <div className="col-12 col-sm-6 py-4 bg-white shadow-sm rounded text-center">
                                <i class="icon icon-team icon-6x text-secondary" />
                                <h3 className="fw-bold text-primary pt-4">No Permission Found!</h3>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </>
    );
};

export default Permissions;
