import "./Modal.css";

const Modal = ({showModal,children}) => {
    return showModal && (
        <div className="modal-overlay">
            <div className="modal">
                {
                    children
                }
                
            </div>
        </div>
    )
}

export default Modal;

