import React, { useEffect, useState } from 'react'

function SelectSalones(props) {

    const [salones, setSalones] = useState([])

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
            setSalones(response.data);
        });

    }, []);

    const HandleSelect = (event) => {
        props.onSelect(event.target.value)
    }

    return (
        <select onChange={HandleSelect} className="form-select" aria-label="Default select salones" defaultValue="Seleccionar">
            <option disabled>Seleccionar</option>
            { salones.map(salon => <option key={salon.id_salon} value={salon.id_salon}>{salon.nombre}</option>) }
        </select>
    )
}

export default SelectSalones
