import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import { getPermission } from "../permission.actions";


const PermissionDetails = ({ permissionId, ...rest }) => {
    const dispatch = useDispatch();

    const permission = useSelector(state => state.permissionReducer.permission)

    useEffect(() => {
        if(permissionId) dispatch(getPermission(permissionId));
    }, [dispatch, permissionId]);

    return (
        <Modal 
            {...rest}
            size="lg"
            centered
        >
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
                        {permission.title}
                        <br />
                        <br />
                        <strong>
                            Description:
                        </strong>{" "}
                        {permission.description}
                        <br />
                        <br />
                        <strong>Type:</strong>{" "}
                        {permission.type}
                        <br />
                        <br />
                        <strong>Slug:</strong>{" "}
                        {permission.slug}
                        <br />
                        <br />
                        <strong>
                            Created At:
                        </strong>{" "}
                        {permission.created_at}
                        <br />
                        <br />
                        <strong>
                            Updated At:
                        </strong>{" "}
                        {permission.updated_at}
                        <br />
                        <br />
                        <strong>
                            Profile Permissions:
                        </strong>
                        {permission?.permission_services?.map(
                            (permission_service) => (
                                <p
                                    key={permission_service.id}
                                    style={{
                                        marginLeft:
                                            "50px",
                                    }}
                                >
                                    {permission_service.service.title}
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

export default PermissionDetails;
