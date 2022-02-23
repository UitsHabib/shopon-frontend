import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { createPermission } from "../permission.actions";
import PermissionForm from "./permission-form.component";

const PermissionCreate = ({ history }) => {
    const dispatch = useDispatch();

    const handleCreate = values => {
        dispatch(createPermission(values))
            .then(response => {
                history.push({ pathname: "/platform/permissions" });
                toast.success("Permission Created Successfully", {
                    background: "#8329C5",
                    color: "#ffffff",
                });
            })
            .catch(error => {
                toast.error(error.response.data, {
                    background: "#8329C5",
                    color: "#ffffff",
                });
            });
    };

    const initialValues = { title: "", description: "", services: [] };

    return (
        <>
            <h1 className="text-center">Permission Create</h1>
            <PermissionForm
                initialValues={initialValues}
                onSubmit={handleCreate}
                buttonName="Create"
            />
        </>
    );
};

export default PermissionCreate;
