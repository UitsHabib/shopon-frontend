import { useEffect, useState } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import CheckboxGroup from "./checkboxGroup.component";

const baseUrl = "http://localhost:5000";

const PermissionForm = ({ onPermissionSubmit, initialValues }) => {
    const [services, setServices] = useState([]);

    const getServices = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/services`, {
                withCredentials: true,
            });
            setServices(response.data.services);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, action) => {
                onPermissionSubmit(values);
                action.resetForm();
                action.setSubmitting(false);
            }}
        >
            {(formikProps) => (
                <Form onSubmit={formikProps.handleSubmit}>
                    <Field
                        className="form-control mb-3"
                        as="textarea"
                        placeholder="Title"
                        name="title"
                    />
                    <Field
                        className="form-control"
                        as="textarea"
                        placeholder="Description"
                        name="description"
                    />
                    <div>Services</div>
                    <CheckboxGroup name="services" options={services} />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default PermissionForm;
