import { string, object } from 'yup';
import XRegExp from 'xregexp';

export const addNewProductSchema = object().shape({
	shop_name: string()
		.matches(
			XRegExp('^[\\pL.]+(?:\\s[\\pL]+)*[0-9]*$'),
			'This field should contain at least one letter.'
		)
		.min(2, 'This field must be at least 2 characters long')
		.max(50, 'This field must be at most 50 characters long')
		.required('This field must not be empty'),
	shop_type: string()
		.required('This field must not be empty'),
	shop_owner: string()
		.matches(
			XRegExp('^[\\pL.]+(?:\\s[\\pL]+)*$'),
			'This field should contain letters only'
		)
		.min(2, 'This field must be at least 2 characters long')
		.max(50, 'This field must be at most 50 characters long')
		.required('This field must not be empty'),
});
