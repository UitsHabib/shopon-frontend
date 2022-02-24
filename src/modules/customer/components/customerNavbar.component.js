import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerNav = () => {
    const loggedInCustomer = useSelector(
        (state) => state.customerReducer.loggedInCustomer
    );
    return (
        <>
            <nav
                className="navbar navbar-light px-3"
                style={{ backgroundColor: "#e3f2fd", height: "70px" }}
            >
                <div className="d-flex flex-row align-items-center">
                    <Link className="navbar-brand my-0" to="/">
                        <span className="h4">ShopOn</span>
                    </Link>
                </div>

                <form className="d-flex">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search Product"
                        style={{ minWidth: "400px" }}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
                {/* <div className="d-flex">
                    <Link to={"/login"} className="btn">
                        {" "}
                        Login
                    </Link>
                    <Link to={"/signup"} className="btn">
                        {" "}
                        SignUp
                    </Link>
                </div> */}
                {!loggedInCustomer && (
                    <div className="d-flex">
                        <Link to={"/login"} className="btn">
                            {" "}
                            Login
                        </Link>
                        <Link to={"/signup"} className="btn">
                            {" "}
                            SignUp
                        </Link>
                    </div>
                )}

                {loggedInCustomer && (
                    <div className="d-flex">
                        <span className="h5 my-0 mx-4">
                            <i className="bi bi-person-circle mx-1" />
                            <Link to="/my-profile">
                                {" "}
                                {`${loggedInCustomer.first_name}`}
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
            <nav
                className="navbar navbar-light"
                style={{
                    backgroundColor: "rgb(0 1 1)",
                    height: "40px",
                    margin: "0px",
                    padding: "0px",
                }}
            >
                <div className="container-fluid">
                    <div className="nav-item" style={{ color: "white" }}>
                        All
                    </div>
                    <div className="nav-item" style={{ color: "white" }}>
                        Best Sellers
                    </div>
                    <div className="nav-item" style={{ color: "white" }}>
                        Mobiles
                    </div>
                    <div className="nav-item" style={{ color: "white" }}>
                        Today's Deals
                    </div>
                    <div className="nav-item" style={{ color: "white" }}>
                        Electronics
                    </div>
                    <div className="nav-item" style={{ color: "white" }}>
                        Books
                    </div>
                    <div className="nav-item" style={{ color: "white" }}>
                        Prime Fashion
                    </div>
                    <div className="nav-item" style={{ color: "white" }}>
                        Home & Kitchen
                    </div>
                    <div className="nav-item" style={{ color: "white" }}>
                        Fresh food
                    </div>
                </div>
            </nav>
        </>
    );
};

export default CustomerNav;
