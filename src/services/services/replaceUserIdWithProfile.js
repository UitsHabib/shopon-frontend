import getUser from '../../common/services/getUser';
import extractUserIds from './extractUserIds';

const replaceUserIdWithProfile = async (service) => {
	const userIds = extractUserIds(service);
	const users = await Promise.all(
		userIds.map(async (userId) => getUser({ id: userId }))
	);

	const updatedService = {
		...service,
		created_by: users.find(
			({ profile_id: profileId }) => profileId === service.created_by
		),
		updated_by: users.find(
			({ profile_id: profileId }) => profileId === service.updated_by
		),
	};

	return updatedService;
};

export default replaceUserIdWithProfile;
