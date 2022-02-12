import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ServiceDetails from '../components/serviceDetails.component';
import Services from '../components/services.component';

const ServicesRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Services />} />
			<Route path="/:id" element={<ServiceDetails />} />
		</Routes>
	);
};

export default ServicesRoutes;
