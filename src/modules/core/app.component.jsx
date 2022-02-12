import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { api } from '../platform/services/common/services';

import ServicesRoutes from '../platform/services';

const assumeLoggedIn = async () => {
	const credentials = {
		email: 'habiburrahman3089@gmail.com',
		password: 'P@ssword123',
	};
	try {
		await api.post('/login', credentials);
	} catch (error) {
		console.log(error);
	}
};

assumeLoggedIn();

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/services/*" element={<ServicesRoutes />} />
			</Routes>
		</div>
	);
};

export default App;
