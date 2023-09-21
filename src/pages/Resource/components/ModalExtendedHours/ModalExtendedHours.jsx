const ModalExtendedHours = ({showModalExtendedHours,children}) => {
    return showModalExtendedHours && (
        <div className="modal-overlay">
            <div className="modal">
                {
                    children
                }
                
            </div>
        </div>
    )
}

export default ModalExtendedHours;