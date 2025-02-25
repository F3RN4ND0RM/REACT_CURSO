import { useEffect, useState } from 'react';
import { Message } from './Message';

export const SimpleForm = () => {
    const [formState, setFormState] = useState({
        matricula: "A01197622",
        nombre: "Carlos Fernando",
        apellidos: "Ramos Mena",
        edad: 24,
        universidad: "Tec",
        carrera: "ITC",
    });
    
    const { matricula, nombre, apellidos, edad, universidad, carrera, } = formState;

    const [response, setResponse] = useState(""); 

    const onInputChange = ({ target }) => {
        const { name, value } = target;        
        setFormState({...formState, [ name ]: value});
    }

    const onEnviar = () => {
        setResponse(JSON.stringify(formState)); // Set response to formState
    }
    
    useEffect( () => {
        // console.log('formState changed!');
    }, [formState]);


    

    
    return (
        <>
           <div className='w-100 d-flex flex-column'>
            <h1>Formulario Simple</h1><hr />
                <input type="text" className="w-100 form-control" placeholder="Matricula" name="matricula"
                    value={ matricula } 
                    onChange={ onInputChange }           
                />
                <input type="text" className="w-100 form-control mt-2" placeholder="Nombre" name="nombre"
                    value={ nombre } 
                    onChange={ onInputChange }           
                />
                <input type="text" className="w-100 form-control mt-2" placeholder="Apellidos" name="apellidos"
                    value={ apellidos } 
                    onChange={ onInputChange }           
                />
                <input type="number" className="w-100 form-control mt-2" placeholder="Edad" name="edad"
                    value={ edad } 
                    onChange={ onInputChange }           
                />
                <input type="text" className="w-100 form-control mt-2" placeholder="Universidad" name="universidad"
                    value={ universidad }  
                    onChange={ onInputChange }          
                />
                <input type="texr" className="w-100 form-control mt-2" placeholder="Carrera" name="carrera"
                    value={ carrera }
                    onChange={ onInputChange }            
                />
                <button onClick={onEnviar } >Enviar</button>
                <br></br>
                <br></br>            
                <p className='w-100'> 
                    { response }
                </p>
           </div>
            
        </>
    )
}



