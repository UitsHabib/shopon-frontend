import { Link, useRouteMatch } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import Table from "./common/table.component";
import TableBody from "./common/tableBody.component";
import TableHead from "./common/tableHead.component";
import {toast} from "react-toastify";

const baseUrl = "http://localhost:5000";

const PermissionsTable = ({ permissions, setPermissions, sorting, onSort }) => {
    const { path } = useRouteMatch();

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${baseUrl}/api/permissions/${id}`,
                { withCredentials: true }
            );
            const data = permissions.filter(
                (permission) => permission.id !== response.data.id
            );
            setPermissions(data);
            toast('Permission Deleted Successfully', {
                backgroundColor: '#8329C5',
                color: '#ffffff',
            })
        } catch (error) {
            toast.warning(error.response.data, {
                backgroundColor: '#8329C5',
                color: '#ffffff',
            })
        }
    };

    const columns = [
        {
            label: "ID",
            path: "id",
            sort: true,
            content: (data, path) => <td>{data[path]}</td>,
        },
        {
            label: "Title",
            path: "title",
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
            label: "Type",
            path: "type",
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
            label: "Created",
            path: "created_by",
            sort: true,
            content: (data, path) => <td>{data[path]}</td>,
        },
        {
            label: "Updated",
            path: "updated_by",
            sort: true,
            content: (data, path) => <td>{data[path]}</td>,
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
							<Dropdown.Item onClick={() => handleDelete(data.id)}>
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
                    onSort={onSort}
                />
                <TableBody items={permissions} columns={columns} />
            </Table>
        </>
    );
};

export default PermissionsTable;
