import { string, object } from 'yup';

const roleSchema = object().shape({
	title: string().trim().required('This field is required'),
	description: string().trim().required('This field is required'),
});

export default roleSchema;
