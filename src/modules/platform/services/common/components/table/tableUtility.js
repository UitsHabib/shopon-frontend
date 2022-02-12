const getFilteredColumns = (metadata) => {
	return Object.fromEntries(
		Object.entries(metadata).filter(
			([key, { render }]) =>
				render !== undefined &&
				!(metadata.exclude && metadata.exclude.includes(key))
		)
	);
};

const getSortingColumns = (columns) => {
	return Object.entries(columns)
		.filter(([, { sort }]) => sort === true)
		.map(([key]) => key);
};

export { getFilteredColumns, getSortingColumns };
