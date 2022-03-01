import { Link } from 'react-router-dom'
const Home = (props) => {
    return (
        <div className="d-flex flex-wrap justify-content-center mt-5">
        <div class="card" style={{ width: " 40rem ", height: "auto" }}>
            <div class="card-header">New member?</div>
            <div class="card-body">
                <p>Please click on <Link to="/shop-register">Register</Link> to create a account.</p>
                <p>If you already have an account click <Link to="/shop-login">Login</Link> to continue.</p>
            </div>
        </div>
        </div>
    );
};

export default Home;
