import React from 'react';
import { FieldArray } from "formik";

export default function ToggleList({ name, options, valueExtractor, labelExtractor, idExtractor, children }) {
    const isChecked = (id, arrayHelpers) => arrayHelpers.form.values[name].includes(id);

    const handleChange = (e, arrayHelpers) => {
        const optionId = e.target.value;
        if (e.target.checked) {
            arrayHelpers.push(optionId);
        }
        else {
            const idx = arrayHelpers.form.values[name].indexOf(optionId);
            arrayHelpers.remove(idx);
        }
    }

    return <FieldArray
        name={name}
        render={arrayHelpers => {
            return options.map(item => {
                const props = {
                    name,
                    value: valueExtractor(item),
                    id: idExtractor(item),
                    isChecked: isChecked(idExtractor(item), arrayHelpers),
                    onChange: (e) => handleChange(e, arrayHelpers),
                    disabled: item.hasOwnProperty('disabled') ? item.disabled : false,
                    label: labelExtractor(item),
                    currentOption: item
                }
                return children && children(props);
            })
        }}
    />
}
