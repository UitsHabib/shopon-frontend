import { array } from 'yup';
import { string, object } from 'yup';

export const createSchema = object().shape({
	title: string()
		.max(10, 'This field must be at most 10 characters long')
		.required('This field must not be empty'),
	description: string().required('This field must not be empty'),
});

export const updateSchema = object().shape({
	title: string()
		.max(10, 'This field must be at most 10 characters long')
		.required('This field must not be empty'),
	description: string().required('This field must not be empty'),
	permissions: array().min(1).required('This field must not be empty'),
});
