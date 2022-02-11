import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { loginSchema } from '../user.schema';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Login = (props) => {
  const history = useHistory();
  async function handleLogin(data) {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        data,
        { withCredentials: true }
      );
      localStorage.setItem('loggedInUser', JSON.stringify(response.data));
      //   window.location.href = '/';

      history.push('/');
    } catch (error) {
      console.log(error);
      alert('Error happened!');
    }
  }

  return (
    <div className="d-flex flex-wrap justify-content-center mt-5">
      <div className="card" style={{ width: ' 25rem ', height: 'auto' }}>
        <div className="card-body">
          <h5 className="d-flex flex-wrap justify-content-center">
            Login Form
          </h5>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values, actions) => {
              handleLogin(values);
              actions.setSubmitting(false);
            }}
            validationSchema={loginSchema}
          >
            {(formikprops) => {
              return (
                <Form onSubmit={formikprops.handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Addresss
                    </label>
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                    />
                    <div className="invalid-feedback d-block">
                      <ErrorMessage name="email" />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                    />
                    <div className="invalid-feedback d-block">
                      <ErrorMessage name="password" />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
