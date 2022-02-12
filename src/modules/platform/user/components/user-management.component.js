import { Link } from "react-router-dom";

const UserManagement = () => {
    return (
        <>
            <h1>User management component</h1>
            <Link to={"/platform/create-new"}>Creat a new user</Link>
        </>
    );
};

export default UserManagement;
