import { useEffect, useState, useCallback } from "react";
import {toast} from "react-toastify";
import _ from "lodash";

import { updatePermission, getPermission } from "../permission.actions";
import PermissionForm from "./permission-form.component";

const PermissionUpdate = ({ history, location, match }) => {
    const [data, setData] = useState({});

    const handleUpdate = async (values) => {
        try {
            await updatePermission(match.params.id, values);
            history.push({pathname: "/platform/permissions"})
            toast.success('Permission Updated Successfully', { background: '#8329C5', color: '#ffffff' })
        } catch (error) {
            toast.error(error.response.data, { background: '#8329C5', color: '#ffffff' })
        }
    };

    const getPermissionData = useCallback(async () => {
        try{
            const { data } = await getPermission(match.params.id);
            setData(data);
        } catch(error) {
            console.log(error);
        }
    }, [match.params.id]);

    useEffect(() => {
        if(location.data){
            setData(location.data);
        } else {
            getPermissionData();
        }
    }, [location.data, getPermissionData])

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