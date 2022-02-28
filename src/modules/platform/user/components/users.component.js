import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import Table from '../../../core/components/table.component';
import Pagination from '../../../core/components/pagination.component';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { getUsers, deleteUser } from '../user.actions';
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from 'react-toastify';

const Users = (props) => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();

    const [sortColumn, setSortColumn] = useState({
        path: 'profile_id',
        order: 'asc',
    });
    const [activePage, setActivePage] = useState(1);
    const [pageCount, setPageCount] = useState(3);
    const [needToFetchUser, setNeedToFetchUser] = useState(true);

    const columns = [
        {
            label: 'Profile ID',
            path: 'profile_id',
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: 'First Name',
            path: 'first_name',
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: 'Last Name',
            path: 'last_name',
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: 'Email',
            path: 'email',
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: 'Phone No.',
            path: 'phone',
            content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: 'Actions',
            content: (profile, detail) => (
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <i className="bi bi-pencil-square"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link
                                    to={{
                                        pathname: path + '/' + profile.id + '/update',
                                        state: { prevPath: props.location.pathname, data: profile.id },
                                    }}
                                    style={{ textDecoration: 'none', color: 'black' }}
                                >
                                    UPDATE
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDeleteUser(profile.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            ),
        },
    ];

    const users = useSelector(state => state.userReducer.users);

    const handleSort = (sortColumn) => setSortColumn(sortColumn);

    const sortUsers = (users) => {
        const sortedUsers = _.orderBy(users, [sortColumn.path], [sortColumn.order]);
        return sortedUsers;
    };

    async function handleDeleteUser(userId) {
        try {
            await deleteUser(userId);
            toast.success(`Successfully deleted`);
            setNeedToFetchUser(!needToFetchUser);
        } catch (error) {
            alert(`Could not delete User ${userId}`);
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div></div>
                <Link to="/platform/users/create" className="btn btn-primary m-2">
                    Create User{' '}
                </Link>
            </div>

            <Table users={userList} columns={columns} sortColumns={sortColumn} onSort={handleSort} />
            <Pagination totalUsers={users.length} pageCount={pageCount} activePage={activePage} onClickPage={handleClickPage} />
        </div>
    );
};

export default Users;
