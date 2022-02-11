const Modal = ({ isOpen, onBtnClose, children }) => {
    return (
        <div className="modal" style={{ display: isOpen ? "block" : "none" }} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <button type="button" className="btn-close" onClick={onBtnClose} />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
