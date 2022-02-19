import { useEffect, useState, useCallback } from "react";
import _ from "lodash";

import { getPermission } from "../permission.actions";
import Table from "./common/table.component";
import TableBody from "./common/tableBody.component";
import TableHead from "./common/tableHead.component";

const PermissionDetails = ({ location, match }) => {
    const [permission, setPermission] = useState({});
    const [sorting, setSorting] = useState({ path: "id", order: "asc" });

    const columns = [
        {
            label: "ID",
            path: "user-id",
            content: (permission) => <td>{permission.id}</td>,
        },
        {
            label: "Service ID",
            sort: true,
            path: "id",
            content: (permission, path) => <td>{permission.service[path]}</td>,
        },
        {
            label: "Service Title",
            path: "title",
            content: (permission, path) => <td>{permission.service[path]}</td>,
        },
        {
            label: "Service Slug",
            path: "slug",
            content: (permission, path) => <td>{permission.service[path]}</td>,
        },
    ];

    const getPermissionData = useCallback(async () => {
        try {
            const { data } = await getPermission(match.params.id);
            setPermission(data);
        } catch (error) {
            console.log(error);
        }
    }, [match.params.id]);

    useEffect(() => {
        if (location.data) {
            setPermission(location.data);
        } else {
            getPermissionData();
        }
    }, [location.data, getPermissionData]);

    const sortedService = _.orderBy(permission.permission_services, [sorting.path], [sorting.order]);

    return (
        <div className="container permission">
            <div className="row justify-content-center">
                <div className="col-10">
                    <h3 className="text-center">{permission.title}</h3>
                    <p>{permission.description}</p>
                    <Table>
                        <TableHead
                            columns={columns}
                            sorting={sorting}
                            onSort={setSorting}
                        />
                        <TableBody items={sortedService} columns={columns} />
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default PermissionDetails;
