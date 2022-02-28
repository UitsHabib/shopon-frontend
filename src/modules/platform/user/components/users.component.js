import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";

import Table from "../../../core/components/table.component";
import Pagination from "../../../core/components/pagination.component";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { getUsers, deleteUser, getUser } from "../user.actions";
import { getPermission } from "../../permission/permission.actions";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import UpdateUser from "./updateUser.component";

const Users = (props) => {
    const { path } = useRouteMatch();
    console.log(path)
    const dispatch = useDispatch();

    const [sortColumn, setSortColumn] = useState({
        path: "profile_id",
        order: "asc",
    });
    const [activePage, setActivePage] = useState(1);
    const [pageCount, setPageCount] = useState(2);
    const [needToFetchUser, setNeedToFetchUser] = useState(true);
    const [detailsModal, setDetailsModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [userPermissions, setUserPermissions] = useState([]);
    const [showPermission, setShowPermission] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletedUserId, setDeletedUserId] = useState("1");
    const [updateUserId, setUpdateUserId] = useState();


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

    const columns = [
        {
            label: "Profile ID",
            path: "profile_id",
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: "First Name",
            path: "first_name",
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: "Last Name",
            path: "last_name",
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: "Email",
            path: "email",
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: "Phone No.",
            path: "phone",
            content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: "Actions",
            content: (profile, detail) => (
                
                <td>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                        >
                            <i className="bi bi-pencil-square"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item
                                onClick={() => handleUpdateModal(profile.id)}
                            >
                                Update
                                {/* <Link
                                    to={{
                                        pathname:
                                            path + "/" + profile.id + "/update",
                                        state: {
                                            data: profile.id,
                                        },
                                    }}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    UPDATE
                                </Link> */}
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    console.log(typeof profile.id);
                                    setDeletedUserId(profile.id);
                                    setDeleteModal(true);
                                }}
                            >
                                Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => handleShowDetails(profile.id)}
                            >
                                Details
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            ),
        },
    ];

    const users = useSelector((state) => state.userReducer.users);
    console.log(users);
    users.map((user) => {
        if (user.phone === null) user.phone = "--";
    });
    const loggedInUser = useSelector(
        (state) => state.userReducer.loggedInUser.id
    );

    const handleSort = (sortColumn) => setSortColumn(sortColumn);

    const handleShowDetails = (id) => {
        setDetailsModal(true);
        try {
            getUser(id).then((res) => setUserDetails(res.data));
        } catch (err) {
            console.log("err getting user");
        }
    };
    const handleUpdateModal = (id) => {
        setUpdateModal(true);
        try {
            setUpdateUserId( id );
            console.log("uuuupppppppppp");;
        } catch (err) {
            console.log("err updating");
        }
    };

    const handleUserPermission = (id) => {
        try {
            getPermission(id).then((res) => {
                console.log(res.data.permission_services);
                setUserPermissions(res.data.permission_services);
            });
        } catch (err) {
            console.log("err getting user permission");
        }
    };
    const sortUsers = (users) => {
        const sortedUsers = _.orderBy(
            users,
            [sortColumn.path],
            [sortColumn.order]
        );
        return sortedUsers;
    };

    async function handleDeleteUser() {
        try {
            await deleteUser(deletedUserId);
            toast.success(`Successfully deleted`);
            setNeedToFetchUser(!needToFetchUser);
        } catch (error) {
            alert(`Could not delete User ${deletedUserId}`);
        }
    }

    const handleClickPage = (activePage) => setActivePage(activePage);

    const paginateUsers = () => {
        const start = (activePage - 1) * pageCount;
        const paginatedUsers = users.slice(start, start + pageCount);
        return paginatedUsers;
    };

    useEffect(() => {
        dispatch(getUsers());
    }, [needToFetchUser]);

    const paginatedUsers = paginateUsers();
    const userList = sortUsers(paginatedUsers);

    return (
        <div className="container">
            <Modal
                isOpen={detailsModal}
                style={modalStyle}
                contentLabel="Details Modal"
            >
                <button onClick={() => setDetailsModal(false)}>close</button>
                <div>
                    <ul>
                        {
                            <>
                                <li>ID: {userDetails.id}</li>
                                <li>First Name: {userDetails.first_name}</li>
                                <li>Last Name: {userDetails.last_name}</li>
                                <li>Email: {userDetails.email}</li>
                                <li>Phone No: {userDetails.phone}</li>
                                <li>Profile Slug: {userDetails.profile_id}</li>
                            </>
                        }
                    </ul>
                    <div>
                        <button
                            onClick={() => {
                                handleUserPermission(
                                    userDetails.profile.profile_permissions[0]
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
                isOpen={updateModal}
                // style={modalStyle}
                contentLabel="Update Modal"
            >
                <button onClick={() => setUpdateModal(false)} 
                style={{ margin: "20px", marginLeft: "85%" }}>close</button>
                <UpdateUser id = {updateUserId} setUpdateModal={setUpdateModal} 
                setNeedToFetchUser={setNeedToFetchUser} needToFetchUser={needToFetchUser}/>
                            
            </Modal>
            <Modal
                isOpen={deleteModal}
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
                            setDeleteModal(false);
                        }}
                        style={{ marginRight: "10px" }}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        class="btn btn-secondary"
                        onClick={() => setDeleteModal(false)}
                    >
                        No
                    </button>
                </div>
            </Modal>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div></div>
                <Link
                    to="/platform/users/create"
                    className="btn btn-primary m-2"
                >
                    Create User{" "}
                </Link>
            </div>

            <Table
                users={userList}
                columns={columns}
                sortColumns={sortColumn}
                onSort={handleSort}
            />
            {
                updateModal ? null
                : <Pagination
                totalUsers={users.length}
                pageCount={pageCount}
                activePage={activePage}
                onClickPage={handleClickPage}
            />
            }
            
        </div>
    );
};

export default Users;
