import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const onLogin = () => {
    // Suponiendo que la validación es exitosa
    navigate('/Perfil');
    };
    return (
        <div className='w-100 p-5 d-flex flex-column justify-content-center align-items-center' style={{height:100+ 'vh'}}>
            <div className='w-50 d-flex flex-column justify-content-center align-items-center gap-4'>
                <h1 className='fs-3'>Inicia sesión</h1>
                <input className='w-50 form-control p-3'  type="text" placeholder="Username" value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <button className='w-50 btn btn-dark p-3' onClick={onLogin}>Login</button>
            </div>
        </div>
    )
}
