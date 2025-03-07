import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'


export const Layout = () => {

     
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid justify-content-end">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul>
                    <NavLink className='navbar-brand text-white' to="/">Inicio</NavLink>
                    <NavLink className='navbar-brand  text-white' to="/login">Login</NavLink>
                    <NavLink className='navbar-brand  text-white' to="/perfil">Perfil</NavLink>
                </ul>
            </div>
        </div>
        <Outlet/> 
    </nav>
}

