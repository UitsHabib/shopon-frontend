const DeleteModal = ({ onClickCancel, onClickDelete }) => {
    return (
        <div className="modal" style={{ display: "block" }}>
            <div
                className="modal-backdrop"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                onClick={onClickCancel}
            >
                <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        textAlign: "center",
                        width: "50%",
                        marginLeft: "25%",
                        marginTop: "10%",
                        border: "1px solid gray",
                        boxShadow: "1px 1px 10px gray",
                        borderRadius: "10px",
                        padding: "20px",
                    }}
                >
                    <div className="container">
                        <button
                            type="button"
                            className="btn-close pull-right"
                            onClick={onClickCancel}
                            aria-label="Close"
                        ></button>
                        <h1>Delete Permission</h1>
                        <hr />
                        <p>Are you sure you want to delete this Permission?</p>
                        <br />

                        <div className="clearfix">
                            <button
                                type="button"
                                className="btn btn-light"
                                style={{
                                    border: "1px solid gray",
                                    backgroundColor: "gray",
                                    color: "white",
                                    marginRight: "10px",
                                }}
                                onClick={onClickCancel}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
