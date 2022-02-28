import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import {toast} from "react-toastify";

import { getPermissions, deletePermission } from "../permission.actions";
import Table from "./common/table.component";
import Pagination from "./common/pagination.component";
import PermissionForm from "./permission-form.component";
import DeleteModal from "./common/delete-modal.component";
import PermissionDetails from "./permission-details.component";

const Permissions = () => {
    const dispatch = useDispatch();

    const [action, setAction] = useState({});
    const permissionData = useSelector(state => state.permissionReducer.permissionData)

    const [sorting, setSorting] = useState({ path: "id", order: "asc" });

    const columns = [
        {
            label: "Title",
            path: "title",
            sort: true,
            content: (data, path) => <td>{data[path]}</td>,
        },
        {
            label: "Description",
            path: "description",
            sort: true,
            content: (data, path) => <td>{data[path]}</td>,
        },
        {
            label: "Type",
            path: "type",
            sort: true,
            content: (data, path) => <td>{data[path]}</td>,
        },
        {
            label: "Created Date",
            path: "created_at",
            sort: true,
            content: (data, path) => <td>{(new Date(data[path])).toLocaleDateString('en-GB').replace(/\//g, '.')}</td>,
        },
        {
            label: "Updated Date",
            path: "updated_at",
            sort: true,
            content: (data, path) => <td>{(new Date(data[path])).toLocaleDateString('en-GB').replace(/\//g, '.')}</td>,
        },
        {
            label: "Action",
            path: "",
            content: (data) => (
                <td data-for="Action">
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
                </td>
            ),
        },
    ];

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
        dispatch(getPermissions())
    }, [action])

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
                                sorting={sorting}
                                // onClickSort={onClickSort}
                            />

                            <div>
                                <Pagination
                                    start={permissionData.metaData.start}
                                    end={permissionData.metaData.end}
                                    page={permissionData.metaData.page}
                                    total={permissionData.metaData.total}
                                />
                            </div>
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
                                <i class="icon icon-team icon-6x text-secondary"></i>
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
