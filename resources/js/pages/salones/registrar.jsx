import React, { useState } from 'react';
import FormularioSalon from './formulario';

const RegistrarSalon = () => {
    const [alerta,setAlerta] = useState({
        view: false,
        status: '',
        message: ''
    });

    const handleSubmit =  async (data) => {

        const response = await fetch('/api/salones',{
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
                message: 'Se registró el salon ' + data.nombre
            });

            return {nombre: '',max_estudiantes: 0}
        }

        let status = response.status;
        let error = 'Existen errores en la peticion';
        if (status == 422){
            error = 'Errores: ' + ((await response.json()).errors).join(',');
        }

        setAlerta({
            ...alerta,
            view: true,
            status: 'danger',
            message: error
        });

        return data;

    }

    return <>
        <h4 className="text-center mb-4">Registrar</h4>
        { alerta.view &&
            <div className={"alert alert-dismissible fade show alert-" + alerta.status} role="alert">
                {alerta.message}
                <button type="buttonName" className="btn-close" onClick={() => setAlerta({...alerta, view: false})}></button>
            </div>
        }
        <FormularioSalon textBtn="Registrar" data={{nombre: '',max_estudiantes: 0}} handleSubmit={handleSubmit}/>
    </>
}

export default RegistrarSalon
