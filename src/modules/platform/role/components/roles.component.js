import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import _ from "lodash";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from 'react-bootstrap/Modal';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Pagination from "./common/pagination.component";
import { getRoles, deleteRole } from "../role.actions";
import RoleForm from './role-form.component';

function Roles() {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(true);
    const [action, setAction] = useState({});
    
    const roleData = useSelector((state) => state.roleReducer.roleData);

    // const roleColumns = [
    //     {
    //         label: "ID",
    //         key: "id",
    //         sortable: "true",
    //         content: (role, key) => <th scope="row">{role[key]}</th>,
    //     },
    //     {
    //         label: "Title",
    //         key: "title",
    //         sortable: "true",
    //         content: (role, key) => <td scope="row">{role[key]}</td>,
    //     },
    //     {
    //         label: "Created At",
    //         key: "created_at",
    //         content: (role, key) => (
    //             <td scope="row">{moment(role[key]).format("lll")}</td>
    //         ),
    //     },
    //     {
    //         label: "Action",
    //         key: "action",
    //         content: (role, key) => (
    //             <td scope="row">
    //                 <Dropdown>
    //                     <Dropdown.Toggle
    //                         variant=""
    //                         size="sm"
    //                         id="dropdown-basic"
    //                         bsPrefix="0"
    //                     >
    //                         <i className="bi bi-box-arrow-down text-success fa-lg" />
    //                     </Dropdown.Toggle>

    //                     <Dropdown.Menu>
    //                         <Dropdown.Item onClick={() => setAction({ details: true, roleId: role.id })} > Details </Dropdown.Item>
    //                         <Dropdown.Item onClick={() => setAction({ update: true, roleId: role.id })} > Edit </Dropdown.Item>
    //                         <Dropdown.Item onClick={() => setAction({ deleteWarn: true, roleId: role.id })}> Delete </Dropdown.Item>
    //                     </Dropdown.Menu>
    //                 </Dropdown>
    //             </td>
    //         ),
    //     },
    // ];

    const handleDeleteRole = () => {
        dispatch(deleteRole(action.roleId))
            .then(res => {
                toast.success('Role deleted successfully.');
            })
            .catch(err => {
                toast.error('Error happened');
            })
    };

    function urlChange() {

    }

    useEffect(() => {
        dispatch(getRoles());
    }, [action]);


    return (
        <>
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
                        <React.Fragment>
                            <div>
                                <table className="table">
                                    <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                                        <tr>
                                            <th scope="col" width="12%"><span onClick={() => urlChange(1, 'title')}>Title</span></th>
                                            <th scope="col" width="20%"><span onClick={() => urlChange(1, 'description')}>Description</span></th>
                                            <th scope="col" width="12%"><span onClick={() => urlChange(1, 'type')}>Type</span></th>
                                            <th scope="col" width="12%"><span onClick={() => urlChange(1, 'created_by')}>Created By</span></th>
                                            <th scope="col" width="10%"><span onClick={() => urlChange(1, 'created_at')}>Creation Date</span></th>
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

                                <div>
                                    <Pagination
                                        start={roleData.start}
                                        end={roleData.end}
                                        page={roleData.page}
                                        total={roleData.total}
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                    }

                    {roleData['roles'] && roleData['roles'].length === 0 &&
                        <><div className="row justify-content-center mt-5 pt-5 mb-3">
                            <div className="col-12 col-sm-6 py-4 bg-white shadow-sm rounded text-center">
                                <i class="icon icon-team icon-6x text-secondary"></i>
                                <h3 className="fw-bold text-primary pt-4">No Role Found!</h3>
                            </div>
                        </div></>
                    }

                    <RoleForm 
                        show={action.create || action.update}
                        onHide={() => setAction({})}
                        roleId={action.roleId} 
                    />

                    
                </div>
            </div>
            {/* {isLoaded ? (
                <div className="container text-center d-flex justify-content-center align-items-center flex-column">
                    {roleList?.roles?.length ? (
                        <>
                            <Modal
                                isOpen={action.deleteWarn}
                                onRequestClose={() => setAction({})}
                                style={{
                                    overlay: {
                                        position: "fixed",
                                        zIndex: "4",
                                        backdropFilter: "blur(8px)",
                                    },
                                    content: {
                                        top: "30%",
                                        left: "20%",
                                        right: "20%",
                                        bottom: "30%",
                                        boxShadow:
                                            "3px 1px 29px -2px rgba(25,135,84,0.49)",
                                        border: "1px solid #ccc",
                                        overflow: "auto",
                                        borderRadius: "15px",
                                        padding: "20px",
                                    },
                                }}
                            >
                                <div className="container d-flex flex-column align-items-center">
                                    <h1>Delete Role</h1>
                                    <p> Are you sure you want to delete this role? </p>

                                    <div className="clearfix">
                                        <button type="button" className="btn btn-outline-info" onClick={() => setAction({})}> Cancel </button>
                                        <button type="button" className="btn btn-outline-danger mx-2" onClick={() => handleDeleteRole() }> Delete </button>
                                    </div>
                                </div>
                            </Modal>

                            <Modal
                                isOpen={action.create}
                                onRequestClose={() => setAction({})}
                                style={{
                                    overlay: {
                                        position: "fixed",
                                        zIndex: "4",
                                        backdropFilter: "blur(8px)",
                                    },
                                    content: {
                                        top: "30%",
                                        left: "20%",
                                        right: "20%",
                                        bottom: "30%",
                                        boxShadow:
                                            "3px 1px 29px -2px rgba(25,135,84,0.49)",
                                        border: "1px solid #ccc",
                                        overflow: "auto",
                                        borderRadius: "15px",
                                        padding: "20px",
                                    },
                                }}
                            >
                                <RoleForm roleId={action.update ? action.id : ''}/>
                                
                            </Modal>

                            <div className="w-100">
                                <Table
                                    items={roleList.roles}
                                    columns={roleColumns}
                                    sorters={sorters}
                                    onSort={handleSort}
                                    isModal={isModalDetails}
                                    clickedRow={currentRole}
                                    onCloseModal={handleCloseModal}
                                    onDeleteRow={deleteRole}
                                />

                                <div className="d-flex flew-row w-25">
                                    <label className="mx-2">Show:</label>
                                    <select
                                        className="form-select form-select-sm"
                                        aria-label=".form-select-sm example"
                                        onChange={(e) => setItemsPerPage(e.target.value)}
                                        value={itemsPerPage}
                                    >
                                        {pageOptions.map((option) => (
                                            <option value={option} key={option}>
                                                {option}
                                            </option>
                                        ))}
                                        <option defaultValue={5}>5</option>
										<option value={10}>10</option>
										<option value={15}>15</option>
                                    </select>
                                </div>
                            </div>

                            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={sortedRoles.length}
                currentPage={currentPage}
                onClickPage={handleClickPage}
              />
                        </>
                    ) : (
                        <div
                            className="container d-flex flex-column justify-content-center align-items-center"
                            style={{ height: "50vh" }}
                        >
                            <h1 className="display-4 text-center">
                                Sorry! Roles list is empty!
                            </h1>
                            <h1 className="display-4 text-center">
                                Please create some roles first!
                                <button onClick={() => setAction({ create: true })}>Create Role</button>
                            </h1>
                        </div>
                    )}
                </div>
            ) : (
                <div className="d-flex justify-content-center mt-5">
                    <div
                        className="spinner-border"
                        role="status"
                        style={{ height: "100px", width: "100px" }}
                    >
                        <span className="sr-only"></span>
                    </div>
                </div>
            )} */}
        </>
    );
}

export default Roles;
