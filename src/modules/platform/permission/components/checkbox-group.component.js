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
                            type="checkbox"
                            value={option.id}
                            checked={field.value.includes(option.id.toString())}
                        />
                        <span> {option.title}</span>
                    </label>
                ));
            }}
        </Field>
    );
}


export default CheckboxGroup;