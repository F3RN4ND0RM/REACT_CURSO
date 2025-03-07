
import React from 'react'
import { useCallback, useState } from 'react';
import { ShowIncrement } from './ShowIncrement';


export const CallbackHook = () => {
    const [counter, setCounter] = useState(10);
    // const incrementP = ()=> { setCounter( counter + 1 );
    // console.log('Callback'); }


    const incrementP = useCallback( ()=> {        
        setCounter ( (value) => value + 1);
        },
        []
    )


    return (
        <>
            <div className='w-100 align-center d-flex flex-column justify-center'>
                <h1>useCallback Hook: { counter } </h1>
                <hr/>
                <ShowIncrement increment={ incrementP } />  
            </div>

        </>
    )
}
    