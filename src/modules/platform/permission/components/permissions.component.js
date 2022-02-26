import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";

import PermissionsTable from "./permissions-table.component";
import Pagination from "./common/pagination.component";
import DeleteModal from "./common/delete-modal.component"
import { getPermissions, sortingPermission, deletePermissionStatus, permissionId, deletePermission, activePageHandle, pageLimit } from "../permission.actions";

const Permissions = () => {
    const dispatch = useDispatch();

    const permissions = useSelector(state => state.permissionReducer.permissions);
    const sorting = useSelector(state => state.permissionReducer.sorting);
    const isDeletePermission = useSelector(state => state.permissionReducer.isDeletePermission);
    const deletePermissionId = useSelector(state => state.permissionReducer.permissionId)
    const activePage = useSelector(state => state.permissionReducer.activePage);
    const limit = useSelector(state => state.permissionReducer.limit);
    const total = useSelector(state => state.permissionReducer.total);

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

    useEffect(() => {
        dispatch(getPermissions(activePage, limit, sorting.path, sorting.order));
    }, [dispatch, activePage, limit, sorting]);

    return (
        <div className="permissions">
            <PermissionsTable
                permissions={permissions}
                sorting={sorting}
                onClickDeleteButton={handleDeleteButton}
                onClickSort={handleSorting}
            />
            <div className="d-flex justify-content-center">
                <Pagination
                    totalLength={total}
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
