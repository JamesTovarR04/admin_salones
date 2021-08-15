import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Formulario = (props) => {

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
                <label htmlFor="nombre" className="col-4 col-form-label text-end">Nombre del curso *</label>
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
                <label htmlFor="profesor" className="col-4 col-form-label text-end">Profesor *</label>
                <div className="col-8">
                    <input 
                    type="text" 
                    className="form-control" 
                    name="profesor" 
                    id="profesor" 
                    onChange={handleInputChange}
                    value={data.profesor}
                    required/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="nombre" className="col-4 col-form-label text-end">Descripción</label>
                <div className="col-8">
                    <textarea 
                    className="form-control" 
                    name="descripcion" 
                    onChange={handleInputChange}
                    value={data.descripcion ? data.descripcion : ''}
                    id="nombre"/>
                </div>
            </div>
            <div className="row">
                <div className="col-5 mx-auto d-flex justify-content-center">
                    <Link to="/cursos" className="btn btn-secondary me-1">Regresar</Link>
                    <button type="submit" className="btn btn-success ms-1">{props.textBtn}</button>
                </div>
            </div>
        </form>
    )
}

export default Formulario
