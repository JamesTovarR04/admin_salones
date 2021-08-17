import React, { useState } from 'react'
import FormularioReservacion from './formulario'

const ModalRegistrarReservacion = (props) => {

    const [alerta,setAlerta] = useState({
        view: false,
        status: '',
        message: ''
    })

    const addZero = (number) => (number < 10 ? '0' : '') + number

    var today = new Date()
    var date = today.getFullYear()+'-'+addZero(today.getMonth()+1)+'-'+addZero(today.getDate())
    var time = addZero(today.getHours()) + ":" + addZero(today.getMinutes())
    var dateTime = date+' '+time

    const handleSubmit =  async (data) => {

        data.id_salon = props.id_salon

        const response = await fetch('/api/reservaciones',{
            method : 'POST',
            body: JSON.stringify(data),
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        });

        if (response.ok){
            setAlerta({
                ...alerta,
                view: true,
                status: 'success',
                message: 'Se creó la reservacion.'
            });

            props.setReload(!props.reload)

            return data
        }

        let status = response.status;
        let error = 'Existen errores en la peticion';
        if (status == 422){
            error = 'Errores: ' + ((await response.json()).errors).join(' - ');
        }

        setAlerta({
            ...alerta,
            view: true,
            status: 'danger',
            message: error
        });

        return data

    }

    const resetAlert = () => {
        setAlerta({
            view: false,
            status: '',
            message: ''
        })
    }

    return (
        <div className="modal fade" tabIndex="-1" id={props.id} aria-labelledby={props.id + "Label"} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Reservación</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        { alerta.view &&
                            <div className={"alert alert-dismissible fade show alert-" + alerta.status} role="alert">
                                {alerta.message}
                                <button type="buttonName" className="btn-close" onClick={() => setAlerta({...alerta, view: false})}></button>
                            </div>
                        }
                        { alerta.status == 'success' && <div className="d-grid gap-2 col-6 mx-auto">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={resetAlert}>Aceptar</button>
                        </div> }
                        <div className={alerta.status == 'success' ? 'd-none' : 'd-block'}>
                            <FormularioReservacion 
                            textBtn="Registrar" 
                            handleSubmit={handleSubmit}
                            data={{
                                inicio: dateTime,
                                fin: dateTime,
                                num_estudiantes: 0
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalRegistrarReservacion
