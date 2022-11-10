import React from 'react';
import logo from '../assets/imgs/MisionTIC-UIS.png';

const Header = () => {

    return (
        <header className="d-flex flex-wrap justify-content-center py-2 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <img src={logo} alt="MisionTIC logo" width="120px" className="me-3"/>
                <span className="fs-4">
                    <strong style={{ color: 'blue' }}>React</strong><strong style={{ color: 'black' }}>Tareas</strong>
                </span>
            </a>
            <ul className="nav nav-pills">
                <li className="nav-item"><a href="/" className="nav-link">Inicio</a></li>
                <li className="nav-item"><a href="/tareas" className="nav-link">Tareas</a></li>
            </ul>
        </header>
    );
    
}

export default Header;