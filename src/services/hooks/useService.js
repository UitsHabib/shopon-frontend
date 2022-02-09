import { useEffect, useState } from 'react';
import { get } from 'axios';

const useService = ({ id }) => {
	const [service, setService] = useState([]);
	const url = `/services/${id}`;
	useEffect(
		() =>
			(async () => {
				try {
					const { data: serviceData } = await get(url);
					setService(serviceData);
				} catch (error) {
					console.log(error);
				}
			})(),
		[url]
	);

	return service;
};

export default useService;
