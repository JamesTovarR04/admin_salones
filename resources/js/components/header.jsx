import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {

    return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Administrar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <NavLink exact to="/" className='nav-link'>Inicio</NavLink>
                <NavLink exact to="/salones" className='nav-link'>Salones</NavLink>
                <NavLink to="/cursos" className='nav-link'>Cursos</NavLink>
            </div>
            </div>
        </div>
    </nav>

}

export default Header;
