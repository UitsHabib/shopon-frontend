import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

import { permissionActions } from "../../permission";

const UserDetails = ({ ...rest }) => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.userReducer.user);
    const permissions = useSelector((state) => state.permissionReducer.permission);

    const permissionList = permissions?.permission_services;

    return (
        <Modal {...rest} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>Create User</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <ul>
                        {
                            <>
                                <li>ID: {user?.id}</li>
                                <li>First Name: {user?.first_name}</li>
                                <li>Last Name: {user?.last_name}</li>
                                <li>Email: {user?.email}</li>
                                <li>Phone No: {user?.phone}</li>
                                <li>Profile Slug: {user?.profile_id}</li>
                                <br/>
                                <h3>Permissions</h3>
                                <hr/>
                                <button 
                                    type="button"
                                    class="btn btn-warning"
                                    onClick={()=>{
                                        const permissionId = user?.profile?.profile_permissions[0]?.permission_id;
                                        dispatch(permissionActions.getPermission(permissionId));
                                    }}>
                                        Show Permissions
                                </button>
                                {permissionList?.map((permission) => {
                                    return (
                                        <li key={permission.id}>
                                            {permission.service.title}
                                        </li>
                                    );
                                })}
                            </>
                        }
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UserDetails;
