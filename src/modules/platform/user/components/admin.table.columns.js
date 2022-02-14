import DeleteUser from './deleteUser.service';
import { Link } from 'react-router-dom';

function getColumns(props, path, setUserDeleted) {
	// const nPath = path + "/" + profile.id +'/update';

	const columns = [
		{
			label: 'Profile ID',
			path: 'profile_id',
			sorting: true,
			content: (profile, detail) => <td>{profile[detail]}</td>,
		},
		{
			label: 'First Name',
			path: 'first_name',
			sorting: true,
			content: (profile, detail) => <td>{profile[detail]}</td>,
		},
		{
			label: 'Last Name',
			path: 'last_name',
			sorting: true,
			content: (profile, detail) => <td>{profile[detail]}</td>,
		},
		{
			label: 'Email',
			path: 'email',
			sorting: true,
			content: (profile, detail) => <td>{profile[detail]}</td>,
		},
		{
			label: 'Phone No.',
			path: 'phone',
			content: (profile, detail) => <td>{profile[detail]}</td>,
		},
		{
			label: 'Actions',
			content: (profile, detail) => (
				<td>
					<Link
						className="btn btn-outline-secondary"
						to={{
							pathname: path + '/' + profile.id + '/update',
							state: { prevPath: props.location.pathname, data: profile.id },
						}}
					>
						UPDATE
					</Link>
					{/* <button onClick={()=>{
                      props.history.push(`/platform/users/${profile.id}/update`, { data: profile.id });
                    }} type="button" class="btn btn-outline-secondary" style={{marginRight: '10px'}}>UPDATE</button> */}
					<button
						onClick={() => {
							DeleteUser(profile.id, setUserDeleted, profile);
						}}
						type="button"
						class="btn btn-outline-danger"
					>
						DELETE
					</button>
				</td>
			),
		},
	];
	return columns;
}

export default getColumns;
