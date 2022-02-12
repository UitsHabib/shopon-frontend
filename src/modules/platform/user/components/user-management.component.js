import { Link, useRouteMatch } from "react-router-dom";

const UserManagement = (props) => {
    const { path } = useRouteMatch();

    const listItems = ["Users", "Permission", "Profile", "Role", "Service"];
    return (
        <>
            <div
                className="d-flex flex-wrap flex-column justify-content-around mt-2"
                style={{ width: "30rem" }}
            >
                {listItems.map((listItem, index) => {
                    return (
                        <div className="card mx-4 my-2" key={index}>
                            <div className="card-body">
                                <Link to={`${path}/${listItem.toLowerCase()}`}>
                                    {listItem}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default UserManagement;
