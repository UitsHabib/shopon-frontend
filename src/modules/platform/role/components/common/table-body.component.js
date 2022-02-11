import React from "react";
import { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#app");

const TableBody = (props) => {
    const { items: rows, columns } = props;
    const [currentRole, setCurrentRole] = useState({});
    const [isModal, setIsModal] = useState(false);

    const handleClick = (row) => {
        console.log(row.id);
        setCurrentRole(row);
        setIsModal(true);
    };

    return (
        <>
            <Modal
                isOpen={isModal}
                onRequestClose={() => setIsModal(false)}
                style={{
                    overlay: {
                        position: "fixed",
                        // backgroundColor: "rgba(255, 255, 255, 0.75)",
                        zIndex: "4",
                        // backdropFilter: "blur(2px)",
                    },
                    content: {
                        position: "absolute",
                        top: "10%",
                        left: "20%",
                        right: "20%",
                        bottom: "10%",
                        border: "1px solid #ccc",
                        background: "#fff",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "8px",
                        outline: "none",
                        padding: "20px",
                        boxShadow: "2px 2px 10px grey",
                    },
                }}
            >
                <ul className="list-group list-group-flush d-flex justify-content-center align-items-center">
                    <li className="list-group-item d-flex flex-row">
                        <span className="text-primary">Title</span>
                        <p>: {currentRole.title}</p>
                    </li>
                    <li className="list-group-item d-flex flex-row">
                        <span className="text-primary">Slug</span>
                        <p>: {currentRole.slug}</p>
                    </li>
                    <li className="list-group-item d-flex flex-row">
                        <span className="text-primary">Type</span>
                        <p>: {currentRole.type}</p>
                    </li>
                    <li className="list-group-item d-flex flex-row">
                        <span className="text-primary">Description</span>
                        <p>: {currentRole.description}</p>
                    </li>
                    <li className="list-group-item d-flex flex-row">
                        <span className="text-primary">Created at</span>
                        <p>: {currentRole.created_at}</p>
                    </li>
                    <li className="list-group-item d-flex flex-row">
                        <span className="text-primary">Updated at</span>
                        <p>: {currentRole.updated_at}</p>
                    </li>
                    <li className="list-group-item d-flex flex-row">
                        <span className="text-primary">Permission</span>
                        <p>
                            :
                            {currentRole.role_permissions &&
                                currentRole.role_permissions.map((data) => {
                                    return (
                                        <span> {data.permission.title}</span>
                                    );
                                })}
                        </p>
                    </li>
                </ul>
            </Modal>
            <tbody>
                {rows.map((row) => {
                    return (
                        <tr key={row.id} onClick={() => handleClick(row)}>
                            {columns.map((data) => (
                                <React.Fragment key={row.id + data.key}>
                                    {data.content(row, data.key)}
                                </React.Fragment>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </>
    );
};

export default TableBody;
