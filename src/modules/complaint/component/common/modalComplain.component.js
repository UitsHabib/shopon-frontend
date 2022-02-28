import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import { ComplainSchema } from '../../complain.schema';

const ModalComplain = (props) => {
    const {
        type,
        targetComplain,
        showDetail,
        setShowDetail,
        updateDetail,
        setUpdateDetail,
        deleteDetail,
        setDeleteDetail,
        deleteComplainData,
        updateComplainData,
        shopCategories,
    } = props;

    const handleShowDetail = () => setShowDetail(!showDetail);

    const handleUpdateDetail = () => setUpdateDetail(!updateDetail);

    const handleDeleteDetail = () => {
        deleteComplainData(targetComplain);
        setDeleteDetail(!deleteDetail);
    };

    const handleDeleteDetailClose = () => setDeleteDetail(!deleteDetail);

    return (
        <>
            {type === 'show' && (
                <>
                    <Modal show={showDetail} onHide={handleShowDetail}>
                        <Modal.Header closeButton>
                            <Modal.Title>Complain Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    User ID: {targetComplain.id}
                                </li>
                                <li className="list-group-item">
                                    User Name: {targetComplain.user_name}
                                </li>
                                <li className="list-group-item">
                                    User Image: {targetComplain.userUrl}
                                </li>
                                <li className="list-group-item">
                                    Complain: {targetComplain.complain}
                                </li>
                                <li className="list-group-item">
                                    Shop Name: {targetComplain.shop_name}
                                </li>
                                <li className="list-group-item">
                                    Category: {targetComplain.shop_type}
                                </li>
                                <li className="list-group-item">
                                    Created At: {targetComplain.date_created}
                                </li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" onClick={handleShowDetail}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}

            {type === 'update' && (
                <>
                    <Modal show={updateDetail} onHide={handleUpdateDetail}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Complain Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Modal.Body>
                                <Formik
                                    initialValues={{
                                        id: targetComplain.id,
                                        user_name: targetComplain.user_name,
                                        userUrl: targetComplain.userUrl,
                                        complain: targetComplain.complain,
                                        shop_name: targetComplain.shop_name,
                                        shop_type: targetComplain.shop_type,
                                        date_created: targetComplain.date_created,
                                    }}
                                    onSubmit={(values, actions) => {
                                        //console.log(values);
                                        handleUpdateDetail();
                                        updateComplainData(values);
                                        actions.setSubmitting(false);
                                    }}
                                    validationSchema={ComplainSchema}
                                >
                                    {(formikprops) => {
                                        return (
                                            <Form onSubmit={formikprops.handleSubmit}>
                                                <div className="m-4">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="id" className="form-label">
                                                            ID
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            id="id"
                                                            name="id"
                                                            disabled={true}
                                                        />
                                                        <div className="invalid-feedback d-block">
                                                            <ErrorMessage name="id" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="user_name" className="form-label">
                                                            User Name
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            id="user_name"
                                                            name="user_name"
                                                        />
                                                        <div className="invalid-feedback d-block">
                                                            <ErrorMessage name="user_name" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="userUrl" className="form-label">
                                                            User Image
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            id="userUrl"
                                                            name="userUrl"
                                                        />
                                                        <div className="invalid-feedback d-block">
                                                            <ErrorMessage name="userUrl" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="complain" className="form-label">
                                                            Complain Description
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            id="complain"
                                                            name="complain"
                                                        />
                                                        <div className="invalid-feedback d-block">
                                                            <ErrorMessage name="complain" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="shop_name" className="form-label">
                                                            Shop Name
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            id="shop_name"
                                                            name="shop_name"
                                                        />
                                                        <div className="invalid-feedback d-block">
                                                            <ErrorMessage name="shop_name" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="shop_type" className="form-label">
                                                            Shop Category
                                                        </label>
                                                        <Field
                                                            className="form-control"
                                                            name="shop_type"
                                                            id="shop_type"
                                                            as="select"
                                                        >
                                                            <option>Click Here to Select</option>
                                                            {shopCategories.map((shopCategory) => {
                                                                return (
                                                                    <>
                                                                        <option>{shopCategory}</option>
                                                                    </>
                                                                );
                                                            })}
                                                        </Field>
                                                        <div className="invalid-feedback d-block">
                                                            <ErrorMessage name="shop_type" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="date_created"
                                                            className="form-label"
                                                        >
                                                            Created At
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            id="date_created"
                                                            name="date_created"
                                                            disabled={true}
                                                        />
                                                        <div className="invalid-feedback d-block">
                                                            <ErrorMessage name="date_created" />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-wrap justify-content-between">
                                                        <button type="submit" className="btn btn-success">
                                                            Save Changes
                                                        </button>
                                                        <Button
                                                            variant="warning"
                                                            onClick={handleUpdateDetail}
                                                        >
                                                            Close
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </Modal.Body>
                        </Modal.Body>
                    </Modal>
                </>
            )}

            {type === 'delete' && (
                <>
                    <Modal show={deleteDetail} onHide={handleDeleteDetail}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Complain</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    User ID: {targetComplain.id}
                                </li>
                                <li className="list-group-item">
                                    User Name: {targetComplain.user_name}
                                </li>
                                <li className="list-group-item">
                                    User Image: {targetComplain.userUrl}
                                </li>
                                <li className="list-group-item">
                                    Complain: {targetComplain.complain}
                                </li>
                                <li className="list-group-item">
                                    Shop Name: {targetComplain.shop_name}
                                </li>
                                <li className="list-group-item">
                                    Category: {targetComplain.shop_type}
                                </li>
                                <li className="list-group-item">
                                    Created At: {targetComplain.date_created}
                                </li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleDeleteDetail}>
                                Delete
                            </Button>
                            <Button variant="warning" onClick={handleDeleteDetailClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </>
    );
}

export default ModalComplain;