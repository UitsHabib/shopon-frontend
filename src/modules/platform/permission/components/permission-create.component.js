import axios from "axios";
import PermissionForm from "./permission-form.component";
import {toast} from "react-toastify";

const baseUrl = "http://localhost:5000";

const PermissionCreate = ({ history }) => {
    const initialValues = { title: "", description: "", services: [] };

    const handleCreate = async (values) => {
        try {
            const response = await axios.post(
                `${baseUrl}/api/permissions`,
                values,
                { withCredentials: true }
            );
            history.push({pathname: "/platform/permissions"})
            toast('Permission Created Successfully', {
                backgroundColor: '#8329C5',
                color: '#ffffff',
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="text-center">Permission Create</h1>
            <PermissionForm initialValues={initialValues} onPermissionSubmit={handleCreate} />
        </>
    );
};

export default PermissionCreate;
