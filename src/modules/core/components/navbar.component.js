import { Link } from "react-router-dom";
import getLoggedInUser from "../service/get-logged-in-user";

const Navbar = (props) => {
    return (
        <>
            <nav
                className="d-flex flex-wrap justify-content-between px-4 navbar navbar-light"
                style={{ backgroundColor: "#e3f2fd" }}
            >
                <div className="d-flex flex-wrap justify-content-start px-4">
                    <Link className="navbar-brand" to="/">
                        ShopOn
                    </Link>

                    <Link className="navbar-brand" to="/platform">
                        Platform
                    </Link>
                </div>

                {!getLoggedInUser() && (
                    <Link className="navbar-brand" to="/login">
                        Login
                    </Link>
                )}

                {getLoggedInUser() && (
                    <div className="d-flex flex-wrap justify-content-end mt-3">
                        <div>
                            <p className="navbar-brand">
                                {`${getLoggedInUser().first_name} ${getLoggedInUser().last_name}` }
                            </p>
                        </div>

                        <Link className="navbar-brand" to="/logout">
                            Log Out
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;