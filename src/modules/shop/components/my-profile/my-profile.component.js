import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import moment from 'moment';

const MyShopProfile = (props) => {
	const loggedInShop = useSelector(state => state.shopReducer.loggedInShop);

	return (
		<div className="d-flex flex-wrap justify-content-around">
			<div className="card" style={{ width: '75%' }}>
				<div className="d-flex flex-wrap flex-column align-items-center">
					<img
						className="card-img-top"
						src={require(`../../../core/images/profile.jpg`)}
						alt="Profile Image"
						style={{ height: '15rem', width: '15rem' }}
					/>

					<Link
						to="/update-my-shop-profile"
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
							Shop Name: {loggedInShop.name}
						</li>
                        <li className="list-group-item">Description: {loggedInShop.description ? loggedInShop.description : '--'}</li>
						<li className="list-group-item">ID: {loggedInShop.id ? loggedInShop.id : '--'}</li>
						<li className="list-group-item">Email: {loggedInShop.email ? loggedInShop.email : '--'}</li>
						<li className="list-group-item">License Number: {loggedInShop.license_number ? loggedInShop.license_number : '--'}</li>
						<li className="list-group-item">Status: {loggedInShop.is_active ? loggedInShop.is_active : '--'}</li>
						<li className="list-group-item">
							Profile Created At: {loggedInShop.created_at ? moment(loggedInShop.created_at).format('dddd, MMMM Do YYYY, h:mm:ss a') : '--'}
						</li>
						<li className="list-group-item">
							Profile Updated At: {loggedInShop.updated_at ? moment(loggedInShop.updated_at).format('dddd, MMMM Do YYYY, h:mm:ss a') : '--'}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MyShopProfile;
