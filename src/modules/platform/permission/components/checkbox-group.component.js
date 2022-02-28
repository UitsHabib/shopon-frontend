import { Field } from "formik";

const CheckboxGroup = ({ options, name, value, ...rest }) => {
    return (
        <Field name={name} {...rest}>
            {({ field }) => {
                return options.map(option => (
                    <label className="d-block" htmlFor={option.id} key={option.id}>
                        <input
                            {...field}
                            id={option.id}
                            className="m-1"
                            type="checkbox"
                            value={option.id}
                            checked={field.value.includes(option.id)}
                        />
                        <span> {option.title}</span>
                    </label>
                ));
            }}
        </Field>
    );
}


export default CheckboxGroup;