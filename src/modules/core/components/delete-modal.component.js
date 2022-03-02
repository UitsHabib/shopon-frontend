import { Modal } from "react-bootstrap"

const DeleteModal = ({ deleteName, onClickDelete, ...rest }) => {
    return (
        <Modal size="lg" centered {...rest}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1>Delete {deleteName}</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this {deleteName}?</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-light"
                    style={{
                        border: "1px solid gray",
                        backgroundColor: "gray",
                        color: "white",
                        marginRight: "10px",
                    }}
                    onClick={rest.onHide}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={onClickDelete}
                >
                    Delete
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
