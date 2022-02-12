const extractUserIds = (service) => {
	return [service.created_by, service.updated_by];
};

export default extractUserIds;
