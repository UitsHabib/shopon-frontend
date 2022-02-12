import { useEffect, useState } from 'react';
import { get } from 'axios';

import replaceUserIdWithProfile from '../services/replaceUserIdWithProfile';

const useService = ({ id }) => {
	const [service, setService] = useState({});
	const url = `/services/${id}`;

	useEffect(
		() =>
			(async () => {
				try {
					const { data: serviceData } = await get(url);
					const updatedService = await replaceUserIdWithProfile(serviceData);
					setService(updatedService);
				} catch (error) {
					// console.log(error);
				}
			})(),
		[url]
	);

	return service;
};

export default useService;
