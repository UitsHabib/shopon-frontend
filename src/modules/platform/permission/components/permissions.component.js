import { useEffect, useState } from "react";
import _ from "lodash";
import {toast} from "react-toastify";

import { getPermissions, deletePermission } from "../permission.actions";
import PermissionsTable from "./permissions-table.component";
import Pagination from "./common/pagination.component";
import DeleteModal from "./common/delete-modal.component"

const Permissions = () => {
    const [permissions, setPermissions] = useState([]);
    const [fetchData, setFetchData] = useState(true);
    const [isDelete, setIsDelete] = useState(false);
    const [deletePermissionId, setDeletePermissionId] = useState(null);
    const [sorting, setSorting] = useState({ path: "id", order: "asc" });
    const [activePage, setActivePage] = useState(1);
    const [count, setCount] = useState(3);

    const handleDeleteButton = (id) => {
        setIsDelete(true);
        setDeletePermissionId(id)
    }

    const handleCancelDelete = () => {
        setIsDelete(false);
        setDeletePermissionId(null);
    }

    const handleDeletePermission = async () => {
        try {
            await deletePermission(deletePermissionId);
            setIsDelete(false);
            setFetchData(prev => !prev);
            toast('Permission Deleted Successfully', { background: '#8329C5', color: '#ffffff' })
        } catch (error) {
            setIsDelete(false);
            toast.warning(error.response.data, { background: '#8329C5', color: '#ffffff' })
        }
    };

    const handleChangeCount = (value) => {
        setCount(value);
        setActivePage(1);
    };

    const handleActivePage = value => setActivePage(value);

    const getPermissionList = async () => {
        try {
            const { data } = await getPermissions();
            setPermissions(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPermissionList();
    }, [fetchData]);

    const sortPermissions = _.orderBy(permissions, [sorting.path], [sorting.order]);

    const paginatePremissions = (permissions) => {
        const start = (activePage - 1) * count;
        return permissions.slice(start, start + count);
    };

    const paginatedPermissions = paginatePremissions(sortPermissions);

    return (
        <div className="permissions">
            <PermissionsTable
                permissions={paginatedPermissions}
                sorting={sorting}
                onClickDeleteButton={handleDeleteButton}
                onClickSort={setSorting}
            />
            <div className="d-flex justify-content-center">
                <Pagination
                    totalLength={sortPermissions.length}
                    count={count}
                    activePage={activePage}
                    onClickActive={handleActivePage}
                    onChangeCount={handleChangeCount}
                />
            </div>

            {
                isDelete && <DeleteModal 
                    onClickCancel={handleCancelDelete} 
                    onClickDelete={handleDeletePermission}
                />
            }
        </div>
    );
};

export default Permissions;
