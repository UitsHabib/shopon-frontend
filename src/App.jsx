import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { post } from 'axios';

import ServicesNavigation from './services/navigation/services.navigation';

const assumeLoggedIn = async () => {
	const credentials = {
		email: 'habiburrahman3089@gmail.com',
		password: 'P@ssword123',
	};
	try {
		await post('/login', credentials);
	} catch (error) {
		console.log(error);
	}
};

assumeLoggedIn();

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/services/*" element={<ServicesNavigation />} />
			</Routes>
		</div>
	);
};

export default App;
