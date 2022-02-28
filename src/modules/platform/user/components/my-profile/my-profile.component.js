import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from "react-redux";

const MyProfile = (props) => {
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

	return (
		<div className="d-flex flex-wrap justify-content-around">
			<div className="card" style={{ width: '75%' }}>
				<div className="d-flex flex-wrap flex-column align-items-center">
					<img
						className="card-img-top"
						src={require(`../../../../core/images/profile.jpg`)}
						alt="Profile Image"
						style={{ height: '15rem', width: '15rem' }}
					/>

					<Link
						to="/update-my-profile"
						title="Click here to update your profile"
						className="btn btn-primary"
						style={{ height: 'auto', width: '15rem' }}
					>
						Update Profile
					</Link>
				</div>

				<div className="card-body">
					<ul className="list-group">
						<li className="list-group-item">
							User: {loggedInUser.first_name} {loggedInUser.last_name}
						</li>
						<li className="list-group-item">ID: {loggedInUser.id}</li>
						<li className="list-group-item">Email: {loggedInUser.email}</li>
						<li className="list-group-item">Phone: {loggedInUser.phone}</li>
						<li className="list-group-item">Role: {loggedInUser.role_id}</li>
						<li className="list-group-item">Status: {loggedInUser.status}</li>
						<li className="list-group-item">
							Profile Created At: {loggedInUser.created_at}
						</li>
						<li className="list-group-item">
							Profile Created By: {loggedInUser.created_by}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;
