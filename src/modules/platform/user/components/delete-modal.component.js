import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

const DeleteModal = ({ handleDeleteUser, ...rest }) => {
    return(
        <Modal {...rest} size="lg" centered>
        <Modal.Header closeButton>
            <Modal.Title>
                <h3>Delete User?</h3>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <i class="fa-solid fa-circle-xmark"></i>
                <p>Are you sure you want to delete this user?</p>
                <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => {
                        handleDeleteUser();
                        rest.onHide();
                    }}
                    style={{ marginRight: "10px" }}
                >
                    Yes
                </button>
                <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => rest.onHide()}
                >
                    No
                </button>
            </div>
        </Modal.Body>
    </Modal>
    );
};

export default DeleteModal;