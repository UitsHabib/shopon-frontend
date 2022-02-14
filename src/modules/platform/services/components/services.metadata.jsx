import React from 'react';
import { formatDistance } from 'date-fns';

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
		header: 'last updated'.toUpperCase(),
		render: (time) => (
			<p>{formatDistance(Date.parse(time), new Date(), { addSuffix: true })}</p>
		),
		sort: true,
	},
	exclude: ['created_at'],
};

export default servicesMetadata;
