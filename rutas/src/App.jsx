import './App.css';
import { Routes, Route } from 'react-router-dom';

import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Perfil} from './pages/Perfil';
import { Layout } from './pages/Layout';

export function App() {
    return (
        <>
            
            <Layout/>
            <Routes>                         
                <Route path="Login" element={ <Login/> }></Route>
                <Route path="Perfil" element={ <Perfil/> }></Route>
                <Route path="Home" element={ <Home/> }></Route>
                <Route path="*" element={ <Home/> }></Route>
            </Routes>
        </>
    );
}
