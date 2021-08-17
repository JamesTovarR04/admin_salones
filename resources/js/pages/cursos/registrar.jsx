import React, { useState } from 'react';
import FormularioCurso from './formulario';

const RegistrarCurso = () => {

    const [alerta,setAlerta] = useState({
        view: false,
        status: '',
        message: ''
    });

    const handleSubmit =  async (data) => {

        const response = await fetch('/api/cursos',{
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
                message: 'Se registró el curso ' + data.nombre
            });

            return {nombre: '',profesor: ''}

        }

        setAlerta({
            ...alerta,
            view: true,
            status: 'danger',
            message: 'Existen errores en la peticion'
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
        <FormularioCurso textBtn="Registrar" data={{nombre: '',profesor: ''}} handleSubmit={handleSubmit}/>
    </>

}

export default RegistrarCurso
