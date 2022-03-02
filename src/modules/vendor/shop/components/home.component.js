import { Link } from "react-router-dom";

import Footer from "./footer.component";

const Home = (props) => {
    return (
        <div>
            <div className="d-flex flex-wrap justify-content-center m-5">
                <div class="card" style={{ width: " 30rem ", height: "auto" }}>
                    <div class="card-header">New member?</div>
                    <div class="card-body">
                        <p>
                            Please click on{" "}
                            <Link to="/shop-register">Register</Link> to create
                            a account.
                        </p>
                        <p>
                            If you already have an account click{" "}
                            <Link to="/shop-login">Login</Link> to continue.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
