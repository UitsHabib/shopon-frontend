import { Link, useRouteMatch } from 'react-router-dom';

const UserManagement = (props) => {
	const { path } = useRouteMatch();

	const listItems = ['Users', 'Permissions', 'Profiles', 'Roles', 'Services'];
    
	return (
		<>
			<div
				className="d-flex flex-wrap flex-row justify-content-start mt-2 mx-4"
				style={{ gap: '20px' }}
			>
				{listItems.map((listItem, index) => {
					return (
						<Link
							to={`${path}/${listItem.toLowerCase()}`}
							key={index}
							style={{ color: 'black' }}
						>
							<div
								className="card text-center mt-5  hvr-grow-shadow hvr-round-corners"
								style={{
									width: '200px',
									height: '300px',
									cursor: 'pointer',
									borderRadius: '1em',
								}}
							>
								<div
									className="hvr-sweep-to-bottom"
									style={{
										display: 'flex',
										height: '100%',
									}}
								>
									<div
										className="card-body"
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<h3 className="card-title">{listItem}</h3>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
};

export default UserManagement;
