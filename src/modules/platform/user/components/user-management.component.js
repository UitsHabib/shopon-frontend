import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

const UserManagement = (props) => {
    const { path } = useRouteMatch();
    return (
        <>
            {/* {console.log(path)} */}
            <Link to={`${path}/roles`}>Role</Link>
            <h1>User management component</h1>
        </>
    );
};

export default UserManagement;
