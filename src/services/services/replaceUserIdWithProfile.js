import getUser from '../../common/services/getUser';
import extractUserIds from './extractUserIds';

const replaceUserIdWithProfile = async (service) => {
	const userIds = extractUserIds(service);
	const users = await Promise.all(
		// eslint-disable-next-line no-return-await
		userIds.map(async (userId) => await getUser({ id: userId }))
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
