import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = (props) => {
    const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);

    return (
        <>
            <nav
                className="navbar navbar-light px-3"
                style={{ backgroundColor: "#e3f2fd", height: "90px" }}
            >
                <div className="d-flex flex-row align-items-center">
                    <Link className="navbar-brand my-0" to="/admin">
                        <span className="h4">ShopOn</span>
                    </Link>
                </div>

                {!loggedInUser && (
                    <Link
                        className="navbar-brand btn btn-outline-success"
                        to="/admin/login"
                    >
                        Login
                    </Link>
                )}

                {loggedInUser && (
                    <div className="d-flex flex-row align-items-center">
                        <span className="h5 my-0 mx-4">
                            <i className="bi bi-person-circle mx-1" />
                            <Link to="/my-profile">
                                {" "}
                                {`${loggedInUser.first_name} ${loggedInUser.last_name}`}
                            </Link>
                        </span>

                        <Link
                            className="btn btn-outline-success"
                            to="/admin/logout"
                        >
                            <span className="h6">Log Out</span>
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
