import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";

import Table from "../../../core/components/table.component";
import Pagination from "../../../core/components/pagination.component";
import { Link } from "react-router-dom";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { getUsers, deleteUser, getUser } from "../user.actions";
import { getPermission } from "../../permission/permission.actions";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import UpdateUser from "./updateUser.component";
import UserForm from "./user-form.component";

const Users = (props) => {
    const { path } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const pageCount = 2;
    const [sortColumn, setSortColumn] = useState({
        path: "first_name",
        order: "asc",
    });

    const [activePage, setActivePage] = useState(1);
    const [needToFetchUser, setNeedToFetchUser] = useState(true);
    const [showPermission, setShowPermission] = useState(false);
    const [userPermissions, setUserPermissions] = useState([]);
    const [updateUserId, setUpdateUserId] = useState();
    const [deletedUserId, setDeletedUserId] = useState("1");
    // const [userDetails, setUserDetails] = useState({});
    const [action, setAction] = useState({});

    const modalStyle = {
        content: {
            top: "30%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundFilter: "blur(2px)",
            border: "1px solid black",
        },
        overlay: { zIndex: 1000 },
    };

    const users = useSelector((state) => state.userReducer.userData.users);
    const user = useSelector(state => state.userReducer.user);
    const userMetaData = useSelector(
        (state) => state.userReducer.userData.metaData
    );

    users?.map((user) => {
        if (user.phone === null) user.phone = "--";
    });

    const page = userMetaData?.page;
    const limit = userMetaData?.limit;
    const total = userMetaData?.total;

    const handleSort = (sortColumns) => {
        const queryParams = `?page=${activePage}&limit=${pageCount}&orderBy=${sortColumn.path}&orderType=${sortColumn.order}`;
        history.push(location.pathname + queryParams || ``);
        setSortColumn(sortColumns);
        
    }

    const handleClickPage = (activePage) => {
        setActivePage(activePage);
        const queryParams = `?page=${activePage}&limit=${pageCount}&orderBy=${sortColumn.path}&orderType=${sortColumn.order}`;
        history.push(location.pathname + queryParams || ``);
    }

    const handleShowDetails = (id) => {
        // try {
        //     getUser(id).then((res) => setUserDetails(res.data));
        // } catch (err) {
        //     console.log("err getting user");
        // }
        dispatch(getUser(id));
    };

    const handleUpdateModal = (id) => {
        try {
            setUpdateUserId(id);
            console.log("uuuupppppppppp");
        } catch (err) {
            console.log("err updating");
        }
        toggleNeedToFecthUsers();
    };

    const handleUserPermission = (id) => {
        try {
            getPermission(id).then((res) => {
                setUserPermissions(res.data.permission_services);
            });
        } catch (err) {
            console.log("err getting user permission");
        }
    };

    const toggleNeedToFecthUsers = () => {
        setNeedToFetchUser(!needToFetchUser);
    };

     function handleDeleteUser() {
        try {
            deleteUser(deletedUserId);
            toast.success(`Successfully deleted`);
            setNeedToFetchUser(!needToFetchUser);
        } catch (error) {
            alert(`Could not delete User ${deletedUserId}`);
        }
    }
    function urlChange() {
       
    }
    useEffect(() => {
        dispatch(getUsers(activePage,pageCount,sortColumn.path,sortColumn.order));
    }, [needToFetchUser, location]);

    return (
        <div className="container-fluid">
            {users ? (
                <>
                    
                    <Modal
                        isOpen={action.details || false}
                        style={modalStyle}
                        contentLabel="Details Modal"
                    >
                        <button onClick={() => setAction({})}>
                            close
                        </button>
                        <div>
                            <ul>
                                {
                                    <>
                                        <li>ID: {user?.id}</li>
                                        <li>
                                            First Name: {user?.first_name}
                                        </li>
                                        <li>
                                            Last Name: {user?.last_name}
                                        </li>
                                        <li>Email: {user?.email}</li>
                                        <li>Phone No: {user?.phone}</li>
                                        <li>
                                            Profile Slug:{" "}
                                            {user?.profile_id}
                                        </li>
                                    </>
                                }
                            </ul>
                            <div>
                                <button
                                    onClick={() => {
                                        handleUserPermission(
                                            user?.profile
                                                .profile_permissions[0]
                                                .permission_id
                                        );
                                        setShowPermission(!showPermission);
                                    }}
                                >
                                    {showPermission === false
                                        ? "Show Permissions"
                                        : "Close"}
                                </button>
                                {showPermission === true ? (
                                    <ul>
                                        {userPermissions.map((permission) => {
                                            return (
                                                <li key={permission.service.id}>
                                                    {permission.service.title}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : null}
                            </div>
                        </div>
                    </Modal>
                   
                    <Modal
                        isOpen={action.update || action.create || false}
                        contentLabel="Update Modal"
                    >
                        <button
                            onClick={() => setAction({})}
                            style={{ margin: "20px", marginLeft: "85%" }}
                        >
                            close
                        </button>
                        <UpdateUser
                            show={action.update || action.create || false}
                            onHide={() => setAction({})}
                            id={ action.update? updateUserId : null}
                            resetAction={setAction}
                            toggleNeedToFecthUsers={toggleNeedToFecthUsers}
                            updating={action.update ? "true" : "false"}
                        />
                    </Modal>
                   
                    <Modal
                        isOpen={action.delete || false}
                        style={modalStyle}
                        contentLabel="Details Modal"
                    >
                        <div>
                            <i class="fa-solid fa-circle-xmark"></i>
                            <p>Are you sure you want to delete this user?</p>
                            <button
                                type="button"
                                class="btn btn-warning"
                                onClick={() => {
                                    handleDeleteUser();
                                    setAction({});
                                }}
                                style={{ marginRight: "10px" }}
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                class="btn btn-secondary"
                                onClick={() => setAction({})}
                            >
                                No
                            </button>
                        </div>
                    </Modal>
                    
                    <div className="row">
                    <div className="d-sm-flex justify-content-between align-items-center py-3">
                        <h4 className="mb-2 mb-sm-0 cdp-text-primary fw-bold mb-0 mb-sm-0 d-flex align-items-end pe-2">
                            User List
                        </h4>
                        <button className="btn btn-secondary text-white ms-2 mt-2 mt-sm-0">
                            <span className="d-none d-sm-inline-block ps-1" onClick={()=> setAction({create: true})}>Create User</span>
                        </button>
                    </div>
                    </div>
                    
                    <table className="table">
                    <thead style={{ backgroundColor: '#144d43', color: '#ffffff' }}>
                        <tr>
                            <th scope="col" width="12%"><span onClick={() => handleSort({path: 'profile_id', order: sortColumn.path == 'asc' ? 'desc' : 'asc'})}>Profile ID</span></th>
                            <th scope="col" width="20%"><span onClick={() => handleSort({path: 'first_name', order: sortColumn.path == 'asc' ? 'desc' : 'asc'})}>First Name</span></th>
                            <th scope="col" width="12%"><span onClick={() => handleSort({path: 'last_name', order: sortColumn.path == 'asc' ? 'desc' : 'asc'})}>Last Name</span></th>
                            <th scope="col" width="12%"><span onClick={() => handleSort({path: 'email', order: sortColumn.path == 'asc' ? 'desc' : 'asc'})}>Email</span></th>
                            <th scope="col" width="10%"><span>Phone</span></th>
                            <th scope="col" width="10%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="text-break">{user.profile_id}</td>
                                <td className="text-break">{user.first_name}</td>
                                <td className="text-break">{user.last_name}</td>
                                <td className="text-break">{user.email}</td>
                                <td className="text-break">{user.phone}</td>
 
                                <td data-for="Action">
                                    <Dropdown className="ms-auto dropdown-customize">
                                        <Dropdown.Toggle
                                            variant=""
                                            className="btn-outline-secondary dropdown-toggle btn-sm py-0 px-1 dropdown-toggle "
                                        >
                                            <i className="bi bi-chevron-down fa-lg"></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item  onClick={() => {
                                                setAction({details: true});
                                                handleShowDetails(user.id);
                                            }} > Details </Dropdown.Item>

                                            <Dropdown.Item onClick={() => {
                                                handleUpdateModal(user.id)
                                                setAction({update: true});
                                            }} > Edit </Dropdown.Item>

                                            <Dropdown.Item  onClick={() => {
                                                setDeletedUserId(user.id);
                                                setAction({delete: true});
                                            }}> Delete </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>

                    {action.update ? null : (
                        <Pagination
                            totalUsers={total}
                            pageCount={pageCount}
                            activePage={activePage}
                            onClickPage={handleClickPage}
                        />
                    )}
                </>
            ) : null}{" "}
        </div>
    );
};

export default Users;
