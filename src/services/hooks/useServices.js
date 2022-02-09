import { useEffect, useState } from 'react';
import { get } from 'axios';

const useServices = ({ currentPage = 1, itemsPerPage = 10 }) => {
	const [services, setServices] = useState([]);
	const url = `/services?page=${currentPage}&limit=${itemsPerPage}`;
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
