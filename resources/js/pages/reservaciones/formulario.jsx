import React, { useState } from 'react'
import SelectCursos from '../../components/selectCursos';

const FormularioReservacion = (props) => {

    const [data, setData] = useState(props.data);

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const setCursoInData = (id_curso) => {
        setData({
            ...data,
            id_curso: id_curso
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setData(await props.handleSubmit(data));
    }

    return (
        <form className="container" style={{maxWidth:600+'px'}} onSubmit={handleSubmit}>
            <div className="mb-3 row">
                <label htmlFor="inicio" className="col-4 col-form-label text-end">Curso *</label>
                <div className="col-8">
                    <SelectCursos onSelect={setCursoInData}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inicio" className="col-4 col-form-label text-end">Inicio *</label>
                <div className="col-8">
                    <input 
                    type="datetime" 
                    placeholder="YYYY-MM-DD HH:MM"
                    className="form-control" 
                    name="inicio" 
                    id="inicio" 
                    onChange={handleInputChange}
                    value={data.inicio}
                    required/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="fin" className="col-4 col-form-label text-end">Fin *</label>
                <div className="col-8">
                    <input 
                    type="datetime" 
                    placeholder="YYYY-MM-DD HH:MM"
                    className="form-control" 
                    name="fin" 
                    id="fin" 
                    onChange={handleInputChange}
                    value={data.fin}
                    required/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="num_estudiantes" className="col-4 col-form-label text-end">Estudiantes *</label>
                <div className="col-8">
                    <input 
                    type="number" 
                    className="form-control" 
                    name="num_estudiantes" 
                    id="num_estudiantes" 
                    onChange={handleInputChange}
                    value={data.num_estudiantes}
                    required/>
                </div>
            </div>
            <div className="row">
                <div className="col-5 mx-auto d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" className="btn btn-success ms-1">{props.textBtn}</button>
                </div>
            </div>
        </form>
    )
}

export default FormularioReservacion