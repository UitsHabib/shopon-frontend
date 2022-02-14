import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import getLoggedInUser from "../../../../../core/service/get-logged-in-user";

const MyProfile = (props) => {
    const [currentUser, setCurrentUser] = useState(getLoggedInUser());
    const { path } = useRouteMatch()
    console.log(currentUser);
    return (
        <div className="d-flex flex-wrap justify-content-around">
            <div className="card" style={{ width: "75%" }}>
                <div className="d-flex flex-wrap flex-column align-items-center">
                    <img
                        className="card-img-top"
                        src={require(`../../../../../core/images/profile.jpg`)}
                        alt="Profile Image"
                        style={{height: "15rem", width: "15rem"}}
                    />
                    <Link to="/update-my-profile" className="btn btn-primary" style={{height: "auto", width: "15rem"}}>
                        Update Profile
                    </Link>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        <li className="list-group-item">User:               {currentUser.first_name} {currentUser.last_name}</li>
                        <li className="list-group-item">ID:                 {currentUser.id}</li>
                        <li className="list-group-item">Email:              {currentUser.email}</li>
                        <li className="list-group-item">Phone:              {currentUser.phone}</li>
                        <li className="list-group-item">Role:               {currentUser.role_id}</li>
                        <li className="list-group-item">Status:             {currentUser.status}</li>
                        <li className="list-group-item">Profile Created At: {currentUser.created_at}</li>
                        <li className="list-group-item">Profile Created By: {currentUser.created_by}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
