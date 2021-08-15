import React from 'react'
import { Route } from 'react-router-dom'
import EditarCurso from './cursos/editar'
import ListaCursos from './cursos/lista'
import RegistrarCurso from './cursos/registrar'

const Cursos = () => {

    return <div className="container">
        <div className="card container-fluid my-4 px-0">
            <div className="card-header">
                <h3 className="card-title text-primary ms-3">Cursos</h3>
            </div>
            <div className="card-body">
                <Route exact path="/cursos">
                    <ListaCursos/>
                </Route>
                <Route path="/cursos/registrar">
                    <RegistrarCurso/>
                </Route>
                <Route path="/cursos/editar/:id">
                    <EditarCurso/>
                </Route>
            </div>
        </div>
    </div>

}

export default Cursos;
