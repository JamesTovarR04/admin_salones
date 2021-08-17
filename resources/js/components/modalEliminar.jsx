import React from 'react'

const ModalEliminar = (props) => {
    return (
        <div className="modal fade" tabIndex="-1" id={props.id} aria-labelledby={props.id + "Label"} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{props.text}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.confirmar}>Eliminar</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEliminar
