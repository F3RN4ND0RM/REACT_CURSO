import React from 'react'

export const Perfil = () => {
  return (
    <div className='w-100 p-5 d-flex flex-column justify-content-center align-items-center' style={{height:100+ 'vh'}}>
    <div className='w-50 d-flex flex-column justify-content-center align-items-center'>
      <div className="mb-3 w-100 text-dark">
        <label class="form-label">Nombres</label>
        <input type="text" className="form-control fw-bolder"value="Carlos Fernando" />
      </div>
      <div className="mb-3 w-100 text-dark">
        <label class="form-label">Apellido</label>
        <input type="text" className="form-control fw-bolder"value="Ramos Mena" />
      </div>
      <div className="mb-3 w-100 text-dark">
        <label class="form-label">correo</label>
        <input type="email" className="form-control fw-bolder"value="A01197622@tex.mx" />
      </div>
      <div className="mb-3 w-100 text-dark">
        <label class="form-label">Github</label>
        <input type="email" className="form-control fw-bolder"value="https://github.com/F3RN4ND0RM" />
      </div>
    </div>
  </div>
  )
}
