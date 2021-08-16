import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import ModalEliminar from '../../components/modalEliminar'

const ListaSalones = () => {
    const [salones,setSalones] = useState([]);
    const [busqueda,setBusqueda] = useState([]);
    const [salonEliminar, setSalonEliminar] = useState({});

    let match = useRouteMatch();

    useEffect(() => {

        fetch('/api/salones',{
            method : 'GET',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log('Error:',error))
        .then(response => {
            let salones = response.data;
            setBusqueda(salones);
            setSalones(salones);
        });

    }, []);

    const handleBuscarChange = (event) => {

        let buscar = event.target.value;

        setBusqueda(salones.filter(salon => {
            return salon.nombre.toLowerCase().indexOf(buscar.toLowerCase()) > -1;
        }));

    }

    const eliminarSalon = () => {

        fetch('/api/salones/' + salonEliminar.id_salon,{
            method : 'DELETE',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(response => {
            if(response.ok){
                setSalones(salones.filter(salon => salon.id_salon != salonEliminar.id_salon));
                setBusqueda(busqueda.filter(salon => salon.id_salon != salonEliminar.id_salon));
            }
        })
        .catch(error => console.log('Error:',error));

    }

    return <>
        <div className="d-flex justify-content-between mb-3">
            <div style={{maxWidth:400+'px'}}>
                <input 
                type="text" 
                className="form-control" 
                onChange={handleBuscarChange}
                placeholder="Buscar..."/>
            </div>
            <Link to={`${match.url}/registrar`} className="btn btn-success">Registrar salón</Link>
        </div>
        { busqueda.length > 0 ?
        <div className="table-responsive">
            <table className="table table-hover table-striped">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Capacidad</th>
                        <th scope="col">Acción</th>
                    </tr>
                    { busqueda.map( salon => <tr key={salon.id_salon}>
                        <th scope="row">{salon.id_salon}</th>
                        <td>{salon.nombre}</td>
                        <td>{salon.max_estudiantes}</td>
                        <td>
                            <Link to={`${match.url}/editar/${salon.id_salon}`} className="btn btn-success btn-sm me-2">Editar</Link>
                            <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => setSalonEliminar(salon)}
                            data-bs-toggle="modal" 
                            data-bs-target="#delete-salon"
                            >Eliminar</button>
                        </td>
                    </tr> ) }
                </thead>
            </table>
        </div>
        :
        <p className="text-center">No se encontraron salones</p>
        }
        <ModalEliminar 
        id="delete-salon"
        text={'¿Quieres eliminar el salon ' + salonEliminar.nombre + '?'}
        confirmar={eliminarSalon}
        />
    </>
}

export default ListaSalones
