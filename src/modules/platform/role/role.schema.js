import { string, object, array, number } from 'yup';

const roleSchema = object().shape({
	title: string().trim().required('This field is required'),
	description: string().trim().required('This field is required'),
	permissions: array().min(1, 'Select at least one permission'),
});

export default roleSchema;
