import { useEffect, useState } from 'react';
import { get } from 'axios';

const useUser = ({ id }) => {
	const [user, serUser] = useState([]);
	const url = `/users/${id}`;
	useEffect(
		() =>
			(async () => {
				try {
					const { data: userData } = await get(url);
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
