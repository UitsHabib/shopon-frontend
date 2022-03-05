import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import Pagination from "../../../core/components/pagination.component";
import { getUsers, deleteUser, getUser, createUser } from "../user.actions";
import UpdateUser from "./updateUser.component";
import UserForm from "./user-form.component";
import UserDetails from './detailes-modal.component';
import DeleteModal from './delete-modal.component';
import { permissionActions } from "../../permission";

const Users = (props) => {
    const { path } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    
    const users = useSelector((state) => state.userReducer.userData.users);
    const userMetaData = useSelector((state) => state.userReducer.userData.metaData);

    const [activePage, setActivePage] = useState(1);
    const [needToFetchUser, setNeedToFetchUser] = useState(true);
    const [updateUserId, setUpdateUserId] = useState();
    const [deletedUserId, setDeletedUserId] = useState("1");
    const [action, setAction] = useState({});

    const pageCount = 2;
    const page = userMetaData?.page;
    const limit = userMetaData?.limit;
    const total = userMetaData?.total;
    const query = new URLSearchParams(location.search);
	const orderBy = query.get('orderBy');
	const orderType = query.get('orderType');


    users?.map((user) => {
        if (user.phone === null) user.phone = "--";
    });

    const handleClickPage = (activePage) => {
        setActivePage(activePage);
        const queryParams = `?page=${activePage}&orderBy=${orderBy}&orderType=${orderType}`;
        history.push(location.pathname + queryParams || ``);
    }

    const handleShowDetails = (id) => dispatch(getUser(id));

    const toggleNeedToFecthUsers = () => setNeedToFetchUser(!needToFetchUser);

    function handleDeleteUser() {
        try {
            deleteUser(deletedUserId);
            toast.success(`Successfully deleted`);
            setNeedToFetchUser(!needToFetchUser);
        } catch (error) {
            alert(`Could not delete User ${deletedUserId}`);
        }
    }
   
	const changeUrl = query => {
        const { orderBy, orderType } = query || {};

        const search = new URLSearchParams();

        activePage && search.append('page', activePage);
        orderBy && search.append('orderBy', orderBy);
        orderType && search.append('orderType', orderType);
        

        history.push(location.pathname + search ? `?${search.toString()}` : '');
	}

    useEffect(() => {
        dispatch(getUsers(activePage,pageCount,orderBy,orderType));
    }, [needToFetchUser, location]);

    return (
        <div className="container-fluid">
            {users ? (
                <>
                    <UserDetails show = {action.details || false}  onHide={() => setAction({})} />
                    <DeleteModal show = {action.delete || false} onHide={() => setAction({})} handleDeleteUser = {handleDeleteUser} />
                   
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
                                <th scope="col" width="12%"><span onClick={() => changeUrl({ orderBy: 'profile_id', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Profile ID</span></th>
                                <th scope="col" width="20%"><span onClick={() => changeUrl({ orderBy: 'first_name', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>First Name</span></th>
                                <th scope="col" width="12%"><span onClick={() => changeUrl({ orderBy: 'last_name', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Last Name</span></th>
                                <th scope="col" width="12%"><span onClick={() => changeUrl({ orderBy: 'email', orderType: orderType === undefined || orderType === 'desc' ? 'asc' : 'desc' })}>Email</span></th>
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
