import { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import { createRole, updateRole, getRole } from "../role.actions";
import { getAllPermissions } from "../../permission/permission.actions";
import { roleCreateSchema } from "../role.schema";

const RoleDetails = ({ roleId, ...rest }) => {
    const dispatch = useDispatch();

    const role = useSelector(state => state.roleReducer.role);
    
    useEffect(() => {
        if(roleId) dispatch(getRole(roleId));
    }, [roleId]);

    return (
        <Modal size="lg" centered {...rest}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>Details</h3>
                    <p style={{fontSize: "15px"}}>Here is permission details.</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label>
                        <strong>Title:</strong>{" "}
                        {role.title}
                        <br />
                        <br />
                        <strong>
                            Description:
                        </strong>{" "}
                        {role.description}
                        <br />
                        <br />
                        <strong>Type:</strong>{" "}
                        {role.type}
                        <br />
                        <br />
                        <strong>Slug:</strong>{" "}
                        {role.slug}
                        <br />
                        <br />
                        <strong>
                            Created At:
                        </strong>{" "}
                        {role.created_at}
                        <br />
                        <br />
                        <strong>
                            Updated At:
                        </strong>{" "}
                        {role.updated_at}
                        <br />
                        <br />
                        <strong>
                            Role Permissions:
                        </strong>
                        {role?.role_permissions?.map(
                            (role_permission) => (
                                <p
                                    key={role_permission.id}
                                    style={{
                                        marginLeft:
                                            "50px",
                                    }}
                                >
                                    {role_permission.permission.title}
                                </p>
                            )
                        )}
                        <br />
                    </label>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default RoleDetails;
