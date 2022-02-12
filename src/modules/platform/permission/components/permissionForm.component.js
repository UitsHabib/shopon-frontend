import { useEffect, useState } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import _ from "lodash";
import CheckboxGroup from "./checkboxGroup.component";

const baseUrl = "http://localhost:5000";

const PermissionForm = ({ form, permission, modalClose, handleSubmit }) => {
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

    const { permission_services } = permission;
    const picked = _.map(permission_services, "service.id");
    const serviceArray = picked.map(String);

    const initialForm = () => {
        if (form === "update") {
            return {
                title: permission.title,
                description: permission.description,
                services: serviceArray,
            };
        } else {
            return { title: "", description: "", services: [] };
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialForm()}
            onSubmit={(values, action) => {
                handleSubmit(values);
                modalClose();
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
