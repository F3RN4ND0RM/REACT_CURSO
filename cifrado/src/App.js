
import './App.css';
import { useState } from 'react';
import CryptoJS from 'crypto-js';

function App() {
  const [word, setWord] = useState({value: ""});

  
  const cifrar = (texto) =>{
    var textoCifrado = CryptoJS.AES.encrypt(texto, '12345678').toString()
    return textoCifrado
  }

  const descifrar = (texto) => {
    var bytes = CryptoJS.AES.decrypt(texto, '12345678');
    var textoDescifrado = bytes.toString(CryptoJS.enc.Utf8)
    return textoDescifrado
  }

  return (
    <>
    <div className='p-4 w-100 d-flex flex-column justify-content center align-items-center bg-white' >
      <div className="App">
        <h3>Texto cifrado: {cifrar(word.value)}</h3>    
        <h3>Texto descifrado: {descifrar(cifrar(word.value))}</h3>    
      </div>

      <div className='w-100'>
        <div class="mb-3 w-100">
          <label for="exampleFormControlInput1" class="form-label">Texto a Cifrar</label>
          <input type="text" class="form-control" id="exampleFormControlInput1"
                  value={word.value}
                  onChange={(e) => setWord({ ...word, value: e.target.value })}          
          ></input>
        </div>
      </div>
    </div>
    </>
  
  );
}

export default App;
