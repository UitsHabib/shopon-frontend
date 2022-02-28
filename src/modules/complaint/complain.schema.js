import { string, object } from 'yup';

export  const ComplainSchema = object().shape ({
    user_name: string()
        .required('This field must not be empty'),

    complain: string()
        .required('This field must not be empty'),

    shop_name: string()
        .required('This field must not be empty'),

    shop_type: string()
		.required('This field must not be empty'),
})