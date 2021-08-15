import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Formulario from './formulario';

const EditarCurso = () => {

    let { id } = useParams();

    const [data,setData] = useState({});
    const [alerta,setAlerta] = useState({
        view: false,
        status: '',
        message: ''
    });

    useEffect(() => {

        fetch('/api/cursos/' + id,{
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

        const response = await fetch('/api/cursos/' + id,{
            method : 'PUT',
            body: JSON.stringify(dataEdit),
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

        setAlerta({
            ...alerta,
            view: true,
            status: 'danger',
            message: 'Existen errores en la peticion'
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
        { data.id_curso !== undefined &&
            <Formulario textBtn="Editar" data={data} handleSubmit={handleSubmit}/>
        }
    </>

}

export default EditarCurso