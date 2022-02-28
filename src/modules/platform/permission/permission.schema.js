import { string, object, array } from 'yup';

const PermissionSchema = object().shape({
    title: string()
        .min(3, "Permission title must be at least 3 characters.")
        .max(50, "Permission title must be at most 255 characters long.")
        .required("Permission title is required."),

    description: string().max(500, "Description must be at most 500 characters long.")
        .required("Description is required."),

    services: array()
        .of(string().required('This field is required.'))
        .min(1, 'Select at least one srvice.'),
});

export default PermissionSchema;