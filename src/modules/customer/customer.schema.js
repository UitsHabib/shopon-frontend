import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.min(2, 'Too Short!')
		.email('must be a valid email')
		.max(50, 'Too Long!')
		.required('Email is Required'),
	first_name: Yup.string().trim().required('first name is Required'),
	last_name: Yup.string().trim().required('last name is required'),
	gender: Yup.string().trim().notOneOf(['choose'], 'Please Select Gender'),
	ip_address: Yup.string().trim().required('Ip is reuired'),
});
