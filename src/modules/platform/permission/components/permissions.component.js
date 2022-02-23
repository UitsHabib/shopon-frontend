import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {toast} from "react-toastify";

import PermissionsTable from "./permissions-table.component";
import Pagination from "./common/pagination.component";
import DeleteModal from "./common/delete-modal.component"
import { getPermissions, sortingPermission, deletePermissionStatus, permissionId, deletePermission, activePageHandle, pageLimit, dataFetch } from "../permission.actions";

const Permissions = () => {
    const dispatch = useDispatch();

    // const [fetchData, setFetchData] = useState(true);

    const handleSorting = (value) => dispatch(sortingPermission(value));

    const handleDeleteButton = (id) => {
        dispatch(deletePermissionStatus(true));
        dispatch(permissionId (id));
    }

    const handleCancelDelete = () => {
        dispatch(deletePermissionStatus(false));
        dispatch(permissionId(null));
    }

    const handleDeletePermission = () => {
        dispatch(deletePermission(deletePermissionId))
            .then(response => {
                dispatch(dataFetch(fetchData))
                dispatch(deletePermissionStatus(false));
                toast('Permission Deleted Successfully', { background: '#8329C5', color: '#ffffff' })
            })
            .catch(error => {
                dispatch(deletePermissionStatus(false));
                toast.warning(error.response.data, { background: '#8329C5', color: '#ffffff' });
            })
    };

    const handleActivePage = value => dispatch(activePageHandle(value));

    const handleChangeCount = (value) => {
        dispatch(pageLimit(value));
        dispatch(activePageHandle(1));
    };

    const permissions = useSelector(state => state.permissionReducer.permissions);
    const sorting = useSelector(state => state.permissionReducer.sorting);
    const isDeletePermission = useSelector(state => state.permissionReducer.isDeletePermission);
    const deletePermissionId = useSelector(state => state.permissionReducer.permissionId)
    const activePage = useSelector(state => state.permissionReducer.activePage);
    const limit = useSelector(state => state.permissionReducer.limit);
    const fetchData = useSelector(state => state.permissionReducer.fetchData);

    useEffect(() => {
        dispatch(getPermissions())
    }, [dispatch, fetchData]);

    const sortPermissions = _.orderBy(permissions, [sorting.path], [sorting.order]);

    const paginatePremissions = (permissions) => {
        const start = (activePage - 1) * limit;
        return permissions.slice(start, start + limit);
    };

    const paginatedPermissions = paginatePremissions(sortPermissions);

    return (
        <div className="permissions">
            <PermissionsTable
                permissions={paginatedPermissions}
                sorting={sorting}
                onClickDeleteButton={handleDeleteButton}
                onClickSort={handleSorting}
            />
            <div className="d-flex justify-content-center">
                <Pagination
                    totalLength={sortPermissions.length}
                    count={limit}
                    activePage={activePage}
                    onClickActive={handleActivePage}
                    onChangeCount={handleChangeCount}
                />
            </div>

            {
                isDeletePermission && <DeleteModal 
                    onClickCancel={handleCancelDelete} 
                    onClickDelete={handleDeletePermission}
                />
            }
        </div>
    );
};

export default Permissions;
