import axios from "axios";
import _ from "lodash";
import { useEffect, useState, useCallback } from "react";
import PermissionForm from "./permission-form.component";
import {toast} from "react-toastify";

const baseUrl = "http://localhost:5000";

const PermissionUpdate = ({ history, location, match }) => {
    const [data, setData] = useState({});
    console.log(data)

    const getPermission = useCallback(async () => {
        try{
            const { data } = await axios.get(`${baseUrl}/api/permissions/${match.params.id}`, { withCredentials: true });
            setData(data);
        } catch(error) {
            console.log(error);
        }
    }, [match.params.id]);

    useEffect(() => {
        if(location.data){
            setData(location.data);
        } else {
            getPermission();
        }
    }, [location.data, getPermission])

    const { permission_services } = data;
    const picked = _.map(permission_services, "service.id");
    const serviceArray = picked.map(String);

    const initialValues = { title: data.title, description: data.description, services: serviceArray };

    const handleUpdate = async (values) => {
        try {
            const response = await axios.patch(
                `${baseUrl}/api/permissions/${match.params.id}`,
                values,
                { withCredentials: true }
            );
            history.push({pathname: "/platform/permissions"})
            toast('Permission Updated Successfully', {
                backgroundColor: '#8329C5',
                color: '#ffffff',
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="text-center">Permission Update</h1>
            <PermissionForm initialValues={initialValues} onPermissionSubmit={handleUpdate} />
        </>
    );
};

export default PermissionUpdate;