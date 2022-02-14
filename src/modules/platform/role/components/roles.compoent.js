import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app'); // react-modal

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [updatedRole, setUpdatedRole] = useState({});
    const [modalState, setModalState] = useState(false);

    const fetchRoles = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/roles',
                {
                    withCredentials: true,
                }
            );
            setRoles([...response.data]);
        } catch (error) {
            console.error('Error is', error);
        }
        if (roles) setIsLoaded(true);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const updateRoles = async ({
        id,
        title,
        description,
        role_permissions,
    }) => {
        // TODO: Permission update
        const permissions = role_permissions;
        const role = roles.find((role) => role.id === id);
        role.title = title;
        role.description = description;
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/roles/${id}`,
                { title, description },
                { withCredentials: true }
            );
            setRoles([...roles]);
            setModalState(false);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const deleteRoles = async ({ id }) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/roles/${id}`,
                { withCredentials: true }
            );
            const allRoles = [...roles];
            const newRoles = allRoles.filter((role) => id !== role.id);
            setRoles(newRoles);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const handleChange = (event) => {
        setUpdatedRole((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateRoles(updatedRole);
    };

    const handleUpdateClick = (role) => {
        // console.log(role);
        setUpdatedRole(role);
        setModalState(true);
    };

    return (
        <>
            <Modal
                isOpen={modalState}
                style={{
                    overlay: {
                        position: 'fixed',
                        zIndex: '4',
                        backdropFilter: 'blur(8px)',
                    },
                    content: {
                        top: '10%',
                        left: '20%',
                        right: '20%',
                        bottom: '10%',
                        boxShadow: '3px 1px 29px -2px rgba(25,135,84,0.49)',
                        border: '1px solid #ccc',
                        overflow: 'auto',
                        borderRadius: '15px',
                        padding: '20px',
                    },
                }}
                onRequestClose={() => setModalState(false)}
            >
                {/* TODO: Implement with Formik */}
                <form onSubmit={handleSubmit} className="d-flex flex-column">
                    <button className="btn align-self-end mb-3">
                        <i
                            className="bi bi-x-circle h3 "
                            onClick={() => setModalState(false)}
                        />
                    </button>

                    <div className="form-group row mb-3">
                        <label
                            htmlFor="title"
                            className="col-sm-2 col-form-label"
                        >
                            <span className="h6 my-0">Title</span>
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control py-2"
                                value={updatedRole.title}
                                name="title"
                                id="title"
                                onChange={handleChange}
                                style={{ borderRadius: '15px' }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            htmlFor="description"
                            className="col-sm-2 col-form-label"
                        >
                            <span className="h6 my-0">Description</span>
                        </label>
                        <div className="col-sm-10">
                            <textarea
                                type="textarea"
                                rows={5}
                                cols={5}
                                className="form-control py-2"
                                value={updatedRole.description}
                                name="description"
                                id="description"
                                onChange={handleChange}
                                style={{ borderRadius: '15px' }}
                            />
                        </div>
                    </div>
                    <div className="mt-3 mb-3">
                        <span className="h6 my-0">Permissions: {''} </span>
                        {updatedRole.role_permissions &&
                            updatedRole.role_permissions.length &&
                            updatedRole.role_permissions.map((permission) => {
                                return (
                                    <span
                                        className="h6"
                                        key={permission.permission.id}
                                    >
                                        {permission.permission.title}
                                    </span>
                                );
                            })}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-success align-self-center"
                    >
                        Submit
                    </button>
                </form>
            </Modal>
            {isLoaded ? (
                <div className="container d-flex justify-content-center align-items-center mt-4">
                    <div className="text-center w-75">
                        {roles.length ? (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Role ID</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((role) => {
                                        return (
                                            <tr key={role.id}>
                                                <th scope="row">{role.id}</th>
                                                <td>{role.title}</td>
                                                <td>{role.description}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-warning"
                                                        onClick={() =>
                                                            handleUpdateClick(
                                                                role
                                                            )
                                                        }
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() =>
                                                            deleteRoles(role)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div
                                className="container d-flex flex-column justify-content-center align-items-center"
                                style={{ height: '50vh' }}
                            >
                                {/* <h1 className="display-1">404</h1> */}
                                <h1 className="display-4 text-center">
                                    Sorry! Roles list is empty!
                                </h1>
                                <h1 className="display-4 text-center">
                                    Please create some roles first!
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center mt-5">
                    <div
                        className="spinner-border"
                        role="status"
                        style={{ height: '100px', width: '100px' }}
                    >
                        <span className="sr-only"></span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Roles;
