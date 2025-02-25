import { useState } from "react"

export const Counter = () => {
    const [counter, setCounter] = useState(1)

    return (
        <div className="w-100 d-flex flex-column justify-content-center">            
                <h1>Contador: { counter } </h1>
                <div className="w-100 d-flex justify-content-between">                        
                    <button className="btn btn-primary" onClick={()=>setCounter(counter + 1)}>Add 1</button>
                    <button className="btn btn-primary" onClick={()=>setCounter(0)}>Reset</button>
                    <button className="btn btn-primary" onClick={()=>setCounter(counter - 1)}>Sub 1</button>
                </div>
            
        </div>
    )
        
}
