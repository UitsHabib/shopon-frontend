import { string, object, number } from "yup";

export const NewProductSchema = object().shape({
    id: string(),
    name: string()
        .min(2, "This field must be at least 2 characters long")
        .max(50, "This field must be at most 50 characters long")
        .required("This field must not be empty"),
    description: string().required("This field must not be empty"),
    price: number().required("This field must not be empty"),
    category_id: string().required("This field must not be empty"),
    stock_quantity: number().required("This field must not be empty"),
    discount: string()
        .required("This field must not be empty"),
});
