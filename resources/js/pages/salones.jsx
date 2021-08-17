import React from 'react'
import { Route } from 'react-router-dom'
import EditarSalon from './salones/editar'
import ListaSalones from './salones/lista'
import RegistrarSalon from './salones/registrar'

const Salones = () => {

    return <div className="container">
        <div className="card container-fluid my-4 px-0">
            <div className="card-header">
                <h3 className="card-title text-primary ms-3">Salones</h3>
            </div>
            <div className="card-body">
                <Route exact path="/salones">
                    <ListaSalones/>
                </Route>
                <Route path="/salones/registrar">
                    <RegistrarSalon/>
                </Route>
                <Route path="/salones/editar/:id">
                    <EditarSalon/>
                </Route>
            </div>
        </div>
    </div>

}

export default Salones;