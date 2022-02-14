import { Link } from 'react-router-dom';
import getLoggedInUser from '../service/get-logged-in-user';

const Navbar = (props) => {
	const { path } = props;
	//console.log(path);
	const pathNames = path.split('/').filter((pathName) => pathName != 'login');
	let nextPath = '';
	return (
		<>
			<nav
				className="navbar navbar-light px-3"
				style={{ backgroundColor: '#e3f2fd', height: '90px' }}
			>
				<div className="d-flex flex-row align-items-center">
					<Link className="navbar-brand my-0" to="/">
						<span className="h4">ShopOn</span>
					</Link>

					{/* <Link
                        className="btn btn-outline-success"
                        to="/service-list"
                    >
                        <span className="h6 my-0">Platform</span>
                    </Link> */}
					{/* {getLoggedInUser() && (
                        <Link className="navbar-brand" to="/platform">
                            Platform
                        </Link>
                    )} */}
				</div>

				{!getLoggedInUser() && (
					<Link className="navbar-brand btn btn-outline-success" to="/login">
						Login
					</Link>
				)}

				{getLoggedInUser() && (
					<div className="d-flex flex-row align-items-center">
						<span className="h5 my-0 mx-4">
							<i className="bi bi-person-circle mx-1" />
							<Link to="/my-profile">
								{' '}
								{`${getLoggedInUser().first_name} ${
									getLoggedInUser().last_name
								}`}
							</Link>
						</span>

						<Link className="btn btn-outline-success" to="/logout">
							<span className="h6">Log Out</span>
						</Link>
					</div>
				)}
			</nav>

			{/* {pathNames.map((pathName, index) => {
                //console.log(pathName)
                if (pathName != "") {
                    nextPath += "/" + pathName;
                    //console.log(nextPath);
                    return (
                        <Link key={index} to={`${nextPath}`} className="mx-2">
                            {pathName === 'platform' ? 'admin panel' : pathName}
                        </Link>
                    );
                }
            })} */}
		</>
	);
};

export default Navbar;
