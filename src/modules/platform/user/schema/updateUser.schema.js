import { string, object, ref, date, boolean , number } from 'yup';

const updateUserSchema = object().shape({
    first_name: string()
        .trim()
        .min(3, "This field must be at least 2 character long.")
        .max(20, "This field must be at most 20 character long.")
        .required('This field must not be empty.'),

    last_name: string()
        .trim()
        .min(3, "This field must be at least 2 character long.")
        .max(20, "This field must be at most 20 character long.")
        .required('This field must not be empty.'),

    email: string()
        .trim()
        .email("This field must be a valid email")
        .min(2, "This field must be at least 2 character long.")
        .max(50, "This field must be at most 50 character long.")
        .required('This field must not be empty.'),

    password: string()
        .max(50, "This field must be at most 50 character long.")
        .required('This field must not be empty.'),

    confirm_password: string()
        .oneOf([ref('password'), null], 'Passwords must match')
        .required('This field must not be empty.'),

    role_id: number()
        .required('This field must not be empty.'),

});

export default updateUserSchema;