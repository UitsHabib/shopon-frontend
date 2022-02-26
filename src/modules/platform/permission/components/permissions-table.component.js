import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
import { Dropdown } from "react-bootstrap";

import Table from "./common/table.component";
import TableBody from "./common/tableBody.component";
import TableHead from "./common/tableHead.component";


const PermissionsTable = ({ permissions, sorting, onClickSort, onClickDeleteButton }) => {
    const { path } = useRouteMatch();

    const columns = [
        {
            label: "ID",
            path: "id",
            content: (data, path) => <td>{data[path]}</td>,
        },
        {
            label: "Title",
            path: "title",
            sort: true,
            content: (data, path) => <td>{data[path]}</td>,
        },
        {
            label: "Description",
            path: "description",
            sort: true,
            content: (data, path) => <td>{data[path]}</td>,
        },
        {
            label: "Type",
            path: "type",
            sort: true,
            content: (data, path) => <td>{data[path]}</td>,
        },
        {
            label: "Slug",
            path: "slug",
            sort: true,
            content: (data, path) => <td>{data[path]}</td>,
        },
        {
            label: "Created",
            path: "created_at",
            sort: true,
            content: (data) => <td>{moment(data.created_at).format("lll")}</td>,
        },
        {
            label: "Updated",
            path: "updated_at",
            content: (data) => <td>{moment(data.updated_at).format("lll")}</td>,
        },
        {
            label: "Action",
            path: "",
            content: (data) => (
                <td>
                    <Dropdown>
						<Dropdown.Toggle variant="secondary" id="dropdown-basic">
							<i className="bi bi-pencil-square"></i>
						</Dropdown.Toggle>

						<Dropdown.Menu>
                            <Link className="dropdown-item" to={{ pathname: `${path}/${data.id}`, data: data }}>
                                Details
                            </Link>
                            <Link className="dropdown-item" to={{ pathname: `${path}/update/${data.id}`, data: data }}>
                                Edit
                            </Link>
							<Dropdown.Item onClick={() => onClickDeleteButton(data.id)}>
								Delete
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
                </td>
            ),
        },
    ];

    return (
        <>
            <Link 
                className="btn btn-success mb-2" 
                style={{ float: "right" }} 
                to={{ pathname: `${path}/create`}}
            >
                Add Permission
            </Link>
            <Table>
                <TableHead
                    columns={columns}
                    sorting={sorting}
                    onClickSort={onClickSort}
                />
                <TableBody items={permissions} columns={columns} />
            </Table>
        </>
    );
};

export default PermissionsTable;
