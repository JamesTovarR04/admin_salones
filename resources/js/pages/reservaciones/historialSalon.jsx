import React, { useEffect, useState } from 'react'
import ModalEliminar from '../../components/modalEliminar';

function HistorialSalon(props) {

    const [reservaciones, setReservaciones] = useState([])
    const [reservacionEliminar, setReservacionEliminar] = useState({})
    const now = new Date()

    useEffect(() => {

        fetch('/api/salones/' + props.id_salon + '/reservaciones',{
            method : 'GET',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log('Error:',error))
        .then(response => {
            setReservaciones(response.data);
        });

    },[props.id_salon,props.update])

    const eliminarReservación = () => {

        fetch('/api/reservaciones/' + reservacionEliminar.id_reservacion,{
            method : 'DELETE',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(response => {
            if(response.ok){
                setReservaciones(reservaciones.filter(resv => resv.id_reservacion != reservacionEliminar.id_reservacion));
            }
        })
        .catch(error => console.log('Error:',error));

    }

    return (
        <div className="table-responsive">
            { reservaciones.length > 0 ?
                <table className="table">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">Inicio</th>
                            <th scope="col">Fin</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Profesor</th>
                            <th scope="col">Estudiantes</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        { reservaciones.map(reservacion => 
                            <tr key={reservacion.id_reservacion}>
                                <td className={now < new Date(reservacion.fecha_hora_inicio) ? 'table-success' : 'table-danger'}>
                                    {reservacion.fecha_hora_inicio}
                                </td>
                                <td>{reservacion.fecha_hora_fin}</td>
                                <td>{reservacion.id_curso} - {reservacion.curso.nombre}</td>
                                <td>{reservacion.curso.profesor}</td>
                                <td>{reservacion.num_estudiantes}</td>
                                <td>
                                    <button 
                                    onClick={() => setReservacionEliminar(reservacion)}
                                    className="btn btn-danger btn-sm" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#delete-reservacion"
                                    >Eliminar</button>
                                </td>
                            </tr>
                        ) }
                    </tbody>
                </table>
                :
                <p className="text-center mt-3">Este salon no tiene reservaciones</p>
            }
            <ModalEliminar 
            id="delete-reservacion"
            text={'¿Quieres eliminar la reservacion?'}
            confirmar={eliminarReservación}
            />
        </div>
    )
}

export default HistorialSalon
