import React from 'react';

const servicesMetadata = {
	id: {
		render: (id) => <p>{id}</p>,
		key: true,
		sort: true,
	},
	title: {
		render: (title) => <p>{title}</p>,
		sort: true,
	},
	created_by: {
		header: 'created by'.toUpperCase(),
		render: ({ first_name: firstName }) => <p>{firstName}</p>,
	},
	updated_by: {
		header: 'updated by'.toUpperCase(),
		render: ({ first_name: firstName }) => <p>{firstName}</p>,
	},
	created_at: {},
	updated_at: {
		header: 'last updated at'.toUpperCase(),
		render: (time) => <p>{time}</p>,
		sort: true,
	},
	exclude: ['created_at', 'updated_at'],
};

export default servicesMetadata;
