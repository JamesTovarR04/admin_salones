import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const FormularioSalon = (props) => {
    const [data, setData] = useState(props.data);

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setData(await props.handleSubmit(data));
    }

    return (
        <form className="container" style={{maxWidth:600+'px'}} onSubmit={handleSubmit}>
            <div className="mb-3 row">
                <label htmlFor="nombre" className="col-4 col-form-label text-end">Nombre del salón *</label>
                <div className="col-8">
                    <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    id="nombre" 
                    onChange={handleInputChange}
                    value={data.nombre}
                    required/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="profesor" className="col-4 col-form-label text-end">Capacidad *</label>
                <div className="col-8">
                    <input 
                    type="number" 
                    className="form-control" 
                    name="max_estudiantes" 
                    id="max_estudiantes" 
                    onChange={handleInputChange}
                    value={data.max_estudiantes}
                    required/>
                </div>
            </div>
            <div className="row">
                <div className="col-5 mx-auto d-flex justify-content-center">
                    <Link to="/salones" className="btn btn-secondary me-1">Regresar</Link>
                    <button type="submit" className="btn btn-success ms-1">{props.textBtn}</button>
                </div>
            </div>
        </form>
    )
}

export default FormularioSalon
