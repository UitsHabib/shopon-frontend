import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopNavbar = (props) => {
    const loggedInShop = useSelector((state) => state.shopReducer.loggedInShop);
    const history = useHistory();
    const url = history.location.pathname === '/sell' ? '/sell' : null;

    return (
        <>
            <nav
                className="navbar navbar-light px-3"
                style={{ backgroundColor: "#e3f2fd", height: "90px" }}
            >
                <div className="d-flex flex-row align-items-center">
                    <Link className="navbar-brand my-0" to="/shop-dashboard">
                        <span className="h4">ShopOn</span>
                    </Link>
                </div>

                { url && (
                    <>
                        <div className="d-flex flex-row align-items-center">
                            <Link
                                className="navbar-brand btn btn-outline-success"
                                to="/shop-login"
                            >
                                Login
                            </Link>

                            <Link
                                className="navbar-brand btn btn-outline-success"
                                to="/shop-register"
                            >
                                Register
                            </Link>
                        </div>
                    </>
                )}

                {!url && !loggedInShop && (
                    <Link
                        className="navbar-brand btn btn-outline-success"
                        to="/shop-login"
                    >
                        Login
                    </Link>
                )}

                {!url && loggedInShop && (
                    <div className="d-flex flex-row align-items-center">
                        <span className="h5 my-0 mx-4">
                            <i className="bi bi-person-circle mx-1" />
                            <Link to="/my-shop-profile">
                                {" "}
                                {`${loggedInShop.name}`}
                            </Link>
                        </span>

                        <Link
                            className="btn btn-outline-success"
                            to="/shop-logout"
                        >
                            <span className="h6">Log Out</span>
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
};

export default ShopNavbar;
