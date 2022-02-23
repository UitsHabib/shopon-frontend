import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import _ from "lodash";

import { updatePermission, getPermission } from "../permission.actions";
import PermissionForm from "./permission-form.component";

const PermissionUpdate = ({ history, match }) => {
    const dispatch = useDispatch();

    const handleUpdate =  (values) => {
        dispatch(updatePermission(match.params.id, values))
            .then(response => {
                history.push({pathname: "/platform/permissions"});
                toast.success('Permission Updated Successfully', { background: '#8329C5', color: '#ffffff' });
            })
            .catch(error => {
                toast.error(error.response.data, { background: '#8329C5', color: '#ffffff' });
            })
    };

    const data = useSelector(state => state.permissionReducer.permission)

    useEffect(() => {
        dispatch(getPermission(match.params.id));
    }, [dispatch, match.params.id])

    const { permission_services } = data;
    const picked = _.map(permission_services, "service.id");
    const serviceArray = picked.map(String);

    const initialValues = { title: data.title, description: data.description, services: serviceArray };

    return (
        <>
            <h1 className="text-center">Permission Update</h1>
            <PermissionForm 
                initialValues={initialValues} 
                onSubmit={handleUpdate} 
                buttonName="Update"
            />
        </>
    );
};

export default PermissionUpdate;