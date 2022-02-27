import { string, object, array, number } from 'yup';

export const roleCreateSchema = object().shape({
	title: string()
		.trim()
		.required('This field is required.'),
	description: string()
		.trim()
		.required('This field is required.'),
	permissions: array()
		.of(string().required('This field is required.'))
		.min(1, 'Select at least one permission.'),
});