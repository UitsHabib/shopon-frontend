import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Table from "./common/table.component";
import TableBody from "./common/tableBody.component";
import TableHead from "./common/tableHead.component";
import Modal from "./common/modal.component";

const baseUrl = "http://localhost:5000"

const PermissionsTable = ({ permissions, setPermissions, sorting, onSort }) => {
    const [services, setServices] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const { path } = useRouteMatch();

    const handleServices = (data) => {
        setServices(data);
        setIsOpen((prev) => !prev);
    };

    const handleDelete = async (id) => {
        try{
            const response = await axios.delete(`${baseUrl}/api/permissions/${id}`, { withCredentials: true })
            const data = permissions.filter(permission => permission.id !== response.data.id);
            setPermissions(data);
        } catch(error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setServices(null);
        setIsOpen((prev) => !prev);
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
                    <button type="button" onClick={() => handleServices(data)}>
                        <i className="fas fa-edit" />
                    </button>
                    <button type="button" onClick={() => handleDelete(data.id)}>
                        <i className="fas fa-trash-alt" />
                    </button>
                    <Link to={{ pathname: `${path}/${data.id}`, data: data }}>
                        Show All
                    </Link>
                </td>
            ),
        },
    ];

    return (
        <>
            <Table>
                <TableHead
                    columns={columns}
                    sorting={sorting}
                    onSort={onSort}
                />
                <TableBody items={permissions} columns={columns} />
            </Table>
            <Modal isOpen={isOpen} onBtnClose={handleClose}>
                <h1>Hello World</h1>
            </Modal>
        </>
    );
};

export default PermissionsTable;
