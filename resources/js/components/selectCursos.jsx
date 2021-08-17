import React, { useEffect, useState } from 'react'

function SelectCursos(props) {

    const [cursos, setCursos] = useState([])

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
            setCursos(response.data);
        });

    }, []);

    const HandleSelect = (event) => {
        props.onSelect(event.target.value)
    }

    return (
        <select onChange={HandleSelect} className="form-select" aria-label="Default select cursos" defaultValue="Seleccionar" required>
            <option disabled>Seleccionar</option>
            { cursos.map(curso => <option key={curso.id_curso} value={curso.id_curso}>{curso.id_curso} - {curso.nombre}</option>) }
        </select>
    )
}

export default SelectCursos
