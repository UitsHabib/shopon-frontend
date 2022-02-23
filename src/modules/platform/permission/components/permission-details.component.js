import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPermission } from "../permission.actions";
import Table from "./common/table.component";
import TableBody from "./common/tableBody.component";
import TableHead from "./common/tableHead.component";

const PermissionDetails = ({ match }) => {
    const dispatch = useDispatch();

    const columns = [
        {
            label: "ID",
            path: "user_id",
            content: (permission) => <td>{permission.id}</td>,
        },
        {
            label: "Service ID",
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

    const permission = useSelector(state => state.permissionReducer.permission);

    useEffect(() => {
        dispatch(getPermission(match.params.id))
    }, [dispatch, match.params.id]);

    return (
        <div className="container permission">
            <div className="row justify-content-center">
                <div className="col-10">
                    <h3 className="text-center">{permission.title}</h3>
                    <p>{permission.description}</p>

                    <Table>
                        <TableHead columns={columns} />
                        <TableBody items={permission.permission_services} columns={columns} />
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default PermissionDetails;
