import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormularioSalon from './formulario';

const EditarSalon = () => {

    let { id } = useParams();

    const [data,setData] = useState({});
    const [alerta,setAlerta] = useState({
        view: false,
        status: '',
        message: ''
    });

    useEffect(() => {

        fetch('/api/salones/' + id,{
            method : 'GET',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(response => response.json())
        .then(response => {
            setData(response);
        })

    }, [])

    const handleSubmit =  async (dataEdit) => {

        let sendData = {...dataEdit};

        if (dataEdit.nombre == data.nombre){
            delete sendData.nombre;
        }

        const response = await fetch('/api/salones/' + id,{
            method : 'PUT',
            body: JSON.stringify(sendData),
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
                message: 'Se editó el curso ' + dataEdit.nombre
            });

            return dataEdit;
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
        <h4 className="text-center mb-4">Editar</h4>
        { alerta.view &&
            <div className={"alert alert-dismissible fade show alert-" + alerta.status} role="alert">
                {alerta.message}
                <button type="buttonName" className="btn-close" onClick={() => setAlerta({...alerta, view: false})}></button>
            </div>
        }
        { data.id_salon !== undefined &&
            <FormularioSalon textBtn="Editar" data={data} handleSubmit={handleSubmit}/>
        }
    </>

}

export default EditarSalon
