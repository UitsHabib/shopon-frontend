import { useEffect, useState } from 'react';
import { get } from 'axios';

const useServices = ({ page = 1, limit = 10 }) => {
	const [services, setServices] = useState([]);
	const url = `/services?page=${page}&limit=${limit}`;
	useEffect(
		() =>
			(async () => {
				try {
					const { data: servicesData } = await get(url);
					setServices(servicesData);
				} catch (error) {
					console.log(error);
				}
			})(),
		[url]
	);

	return services;
};

export default useServices;
