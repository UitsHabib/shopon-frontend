import { useEffect, useState } from 'react';
import { api } from '../common/services';
import replaceUserIdWithProfile from '../services/replaceUserIdWithProfile';

const useServices = ({ currentPage = 1, itemsPerPage = 10 }) => {
	const [services, setServices] = useState([]);
	const url = `/services?page=${currentPage}&limit=${itemsPerPage}`;

	useEffect(
		() =>
			(async () => {
				try {
					const { data: servicesData } = await api.get(url);
					const updatedService = {
						...servicesData,
						services: await Promise.all(
							[...servicesData.services].map(async (service) =>
								replaceUserIdWithProfile(service)
							)
						),
					};
					setServices(updatedService);
				} catch (error) {
					// console.log(error);
				}
			})(),
		[url]
	);

	return services;
};

export default useServices;
