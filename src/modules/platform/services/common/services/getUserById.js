import api from './api';

const getUserById = async ({ id }) => {
	const url = `/users/${id}`;
	try {
		const { data: user } = await api.get(url);
		return user;
	} catch (error) {
		console.log(error);
	}

	return undefined;
};

export default getUserById;
