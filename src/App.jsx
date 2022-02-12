import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { api } from './modules/platform/services/common/services';

import ServicesRouter from './modules/platform/services';

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
				<Route path="/services/*" element={<ServicesRouter />} />
			</Routes>
		</div>
	);
};

export default App;
