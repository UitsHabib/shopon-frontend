import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createSchema } from '../../profile.schema';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProfile, getPermissions } from '../../profile.actions';
import { useHistory } from 'react-router-dom';

const CreateProfile = () => {
  const history = useHistory();
  const [permissions, setPermissions] = useState([]);

  //fetch permission data from database
  async function getPermissionList() {
    try {
      const { data } = await getPermissions();
      setPermissions(data);
    } catch {
      console.log('error while getting permissions');
    }
  }

  //create profile into database
  async function handleSubmit(data) {
    try {
      await createProfile(data);
      history.push('/platform/profiles');
      toast.success('Profile Created Successfully', {
        backgroundColor: '#8329C5',
        color: '#ffffff',
      });
    } catch (error) {
      toast.warning(error.response.data, {
        backgroundColor: '#8329C5',
        color: '#ffffff',
      });
    }
  }

  useEffect(() => {
    getPermissionList();
  }, []);

  const handleCancel = () => {
    history.push('/platform/profiles');
  };

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          width: '50%',
          marginLeft: '25%',
          marginTop: '10%',
          border: '1px solid gray',
          boxShadow: '1px 1px 10px gray',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <Formik
          initialValues={{
            title: '',
            description: '',
            permissions: [],
          }}
          validationSchema={createSchema}
          onSubmit={(values, actions) => {
            // console.log(values.permissions);
            handleSubmit(values);
            actions.setSubmitting(false);
          }}
        >
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  Title <span className="text-danger">*</span>
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  className="form-control"
                ></Field>
                <div className="invalid-feedback d-block">
                  <ErrorMessage name="title" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  Description <span className="text-danger">*</span>
                </label>
                <Field
                  id="description"
                  name="description"
                  type="text"
                  className="form-control"
                ></Field>
                <div className="invalid-feedback d-block">
                  <ErrorMessage name="description" />
                </div>
              </div>
              <div id="checkbox-group">
                Permissions <span className="text-danger">*</span>
              </div>
              <div
                role="group"
                aria-labelledby="checkbox-group"
                style={{ textAlign: 'left' }}
              >
                {permissions.map((permission) => (
                  <React.Fragment key={permission.id}>
                    <label>
                      <Field
                        type="checkbox"
                        name="permissions"
                        value={permission.id.toString()}
                      />{' '}
                      {permission.title}
                    </label>
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <br />
              <button className="btn btn-primary" type="submit">
                Add Profile
              </button>{' '}
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProfile;
