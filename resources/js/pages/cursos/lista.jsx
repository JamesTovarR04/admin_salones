import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import ModalEliminar from '../../components/modalEliminar';

function ListaCursos() {

    const [cursos,setCursos] = useState([]);
    const [busqueda,setBusqueda] = useState([]);
    const [cursoEliminar, setCursoEliminar] = useState({});

    let match = useRouteMatch();

    useEffect(() => {

        fetch('/api/cursos',{
            method : 'GET',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log('Error:',error))
        .then(response => {
            let cursos = response.data;
            setBusqueda(cursos);
            setCursos(cursos);
        });

    }, []);

    const handleBuscarChange = (event) => {

        let buscar = event.target.value;

        setBusqueda(cursos.filter(curso => {
            let porNombre = curso.nombre.toLowerCase().indexOf(buscar.toLowerCase()) > -1;
            let porProfesor = curso.profesor.toLowerCase().indexOf(buscar.toLowerCase()) > -1;
            return porNombre || porProfesor;
        }));

    }

    const eliminarCurso = () => {

        fetch('/api/cursos/' + cursoEliminar.id_curso,{
            method : 'DELETE',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(response => {
            if(response.ok){
                setCursos(cursos.filter(curso => curso.id_curso != cursoEliminar.id_curso));
                setBusqueda(busqueda.filter(curso => curso.id_curso != cursoEliminar.id_curso));
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
            <Link to={`${match.url}/registrar`} className="btn btn-success">Registrar curso</Link>
        </div>
        { busqueda.length > 0 ?
        <div className="table-responsive">
            <table className="table table-hover table-striped">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Profesor</th>
                        <th scope="col">Acción</th>
                    </tr>
                    { busqueda.map( curso => <tr key={curso.id_curso}>
                        <th scope="row">{curso.id_curso}</th>
                        <td>{curso.nombre}</td>
                        <td>{curso.profesor}</td>
                        <td>
                            <Link to={`${match.url}/editar/${curso.id_curso}`} className="btn btn-success btn-sm me-2">Editar</Link>
                            <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => setCursoEliminar(curso)}
                            data-bs-toggle="modal" 
                            data-bs-target="#delete-curso"
                            >Eliminar</button>
                        </td>
                    </tr> ) }
                </thead>
            </table>
        </div>
        :
        <p className="text-center">No se encontraron cursos</p>
        }
        <ModalEliminar 
        id="delete-curso"
        text={'¿Quieres eliminar el curso ' + cursoEliminar.nombre + '?'}
        confirmar={eliminarCurso}
        />
    </>
}

export default ListaCursos