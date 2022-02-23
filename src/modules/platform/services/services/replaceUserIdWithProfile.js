import { getUserById } from "../common/services";

const extractUserIds = (service) => {
	return [service.created_by, service.updated_by];
};

const replaceUserIdWithProfile = async (service) => {
	const userIds = extractUserIds(service);
	const users = await Promise.all(
		userIds.map(async (userId) => getUserById({ id: userId }))
	);

	const updatedService = {
		...service,
		created_by: users.find(({ id }) => id === service.created_by),
		updated_by: users.find(({ id }) => id === service.updated_by),
	};

	return updatedService;
};

export default replaceUserIdWithProfile;
