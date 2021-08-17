import React, { useState } from 'react';
import SelectSalones from '../components/selectSalones';
import HistorialSalon from './reservaciones/historialSalon';
import ModalRegistrarReservacion from './reservaciones/registrar';

const Inicio = () => {

    const [salon, setSalon] = useState(-1);
    const [reload, setReload] = useState(false);

    return <div className="container">
        <div className="card container-fluid my-4 px-0">
            <div className="card-header">
                <h3 className="card-title text-primary ms-3">Reservar salones</h3>
            </div>
            <div className="card-body">
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-auto col-form-label">Seleccionar salón:</label>
                    <div className="col-auto">
                        <SelectSalones onSelect={setSalon}/>
                    </div>
                    <div className="col-auto ps-0">
                        { salon !== -1 &&
                            <button 
                            className="btn btn-success" 
                            data-bs-toggle="modal" 
                            data-bs-target="#add-reservacion"
                            >Reservar</button>
                        }
                    </div>
                </div>
                { salon !== -1 &&
                    <HistorialSalon id_salon={salon} update={reload}/>
                }
            </div>
        </div>
        <ModalRegistrarReservacion id="add-reservacion" id_salon={salon} setReload={setReload} reload={reload} />
    </div>

}

export default Inicio;