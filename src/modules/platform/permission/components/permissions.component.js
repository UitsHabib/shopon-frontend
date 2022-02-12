import axios from "axios";
import { useEffect, useState } from "react";
import _ from "lodash";
import PermissionsTable from "./permissionsTable.component";
import Pagination from "./common/pagination.component";

const baseUrl = "http://localhost:5000";

const Permissions = () => {
    const [permissions, setPermissions] = useState([]);
    const [sorting, setSorting] = useState({ path: "id", order: "asc" });
    const [activePage, setActivePage] = useState(1);
    const [count, setCount] = useState(1);

    const getPermissions = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/permissions`, { withCredentials: true });
            setPermissions(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPermissions();
    }, []);

    const handleCount = (value) => {
        setCount(value);
        setActivePage(1);
    };

    const handleActivePage = (value) => {
        setActivePage(value);
    };

    const sortedPermissions = _.orderBy(
        permissions,
        [sorting.path],
        [sorting.order]
    );

    const paginatingPremissions = (permissions) => {
        const start = (activePage - 1) * count;
        return permissions.slice(start, start + count);
    };

    const paginate = paginatingPremissions(sortedPermissions);

    return (
        <div className="permissions">
            <PermissionsTable
                allValues={permissions}
                permissions={paginate}
                setPermissions={setPermissions}
                sorting={sorting}
                onSort={setSorting}
            />
            <div className="d-flex justify-content-center">
                <Pagination
                    totalLength={sortedPermissions.length}
                    count={count}
                    activePage={activePage}
                    onActive={handleActivePage}
                    onCount={handleCount}
                />
            </div>
        </div>
    );
};

export default Permissions;
