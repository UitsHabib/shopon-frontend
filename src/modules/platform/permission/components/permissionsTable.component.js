import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Table from "./common/table.component";
import TableBody from "./common/tableBody.component";
import TableHead from "./common/tableHead.component";
import Modal from "./common/modal.component";
import PermissionForm from "./permissionForm.component";

const baseUrl = "http://localhost:5000";

const PermissionsTable = ({ permissions, setPermissions, sorting, onSort, allValues }) => {
    const [permission, setPermission] = useState({});
    const [form, setForm] = useState("create");
    const [isOpen, setIsOpen] = useState(false);

    const { path } = useRouteMatch();

    const handleCreate = () => {
        setIsOpen(prev => !prev);
        setForm("create");
    }

    const handleEdit = (data) => {
        setPermission(data);
        setForm("update");
        setIsOpen((prev) => !prev);
    };

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
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        setPermission({});
        setForm("create");
        setIsOpen((prev) => !prev);
    };

    const handleSubmit = async (values) => {
        try {
            if (form === "create") {
                const { data } = await axios.post(
                    `${baseUrl}/api/permissions`,
                    values,
                    { withCredentials: true }
                );
                setPermissions(prev => [data, ...prev])
            } else {
                const { data } = await axios.patch(
                    `${baseUrl}/api/permissions/${permission.id}`,
                    values,
                    { withCredentials: true }
                );
                const index = allValues.findIndex(item => item.id === data.id);
                allValues.splice(index, 1, data);
                setPermissions(allValues);
            }
        } catch (error) {
            console.log("edit", error);
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
                    <button type="button" onClick={() => handleEdit(data)}>
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
            <button className="btn btn-success mb-2" type="button" onClick={handleCreate}>Add Permission</button>
            <Table>
                <TableHead
                    columns={columns}
                    sorting={sorting}
                    onSort={onSort}
                />
                <TableBody items={permissions} columns={columns} />
            </Table>

            <Modal isOpen={isOpen} onBtnClose={handleClose}>
                <PermissionForm
                    form={form}
                    permission={permission}
                    modalClose={handleClose}
                    handleSubmit={handleSubmit}
                />
            </Modal>
        </>
    );
};

export default PermissionsTable;
