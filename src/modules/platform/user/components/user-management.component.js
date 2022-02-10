import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

const UserManagement = (props) => {
    const { path } = useRouteMatch();
    return (
        <>
            <h1>User management component</h1>
            <button className="btn btn-primary"
                onClick={() => {
                    props.history.push(`${path}/updateDelete`);
                }}
            >
                Click To go to Update-Delete Component
            </button>
        </>
    );
};

export default UserManagement;
