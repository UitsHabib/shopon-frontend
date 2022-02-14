import { useEffect, useState } from 'react';
import { api } from '../services';

const useUser = ({ id }) => {
	const [user, serUser] = useState([]);
	const url = `/users/${id}`;
	useEffect(
		() =>
			(async () => {
				try {
					const { data: userData } = api.get(url);
					serUser(userData);
				} catch (error) {
					console.log(error);
				}
			})(),
		[url]
	);

	return user;
};

export default useUser;
