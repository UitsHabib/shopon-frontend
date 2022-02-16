import { string, object, ref, number } from 'yup';
import XRegExp from 'xregexp';
import * as Yup from 'yup';
import PhoneNumber from 'awesome-phonenumber';

export const addNewShopSchema = object().shape({
	shop_name: string()
		.matches(
			XRegExp('^[\\pL.]+(?:\\s[\\pL]+)*$'),
			'This field should contain letters only'
		)
		.min(2, 'This field must be at least 2 characters long')
		.max(50, 'This field must be at most 50 characters long')
		.required('This field must not be empty'),
	shop_type: string()
		.matches(
			XRegExp('^[\\pL.]+(?:\\s[\\pL]+)*$'),
			'This field should contain letters only'
		)
		.min(2, 'This field must be at least 2 characters long')
		.max(50, 'This field must be at most 50 characters long')
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
