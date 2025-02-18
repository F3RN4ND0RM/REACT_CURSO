import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Holamundo } from './Holamundo.jsx'
import { MyApp } from './App.jsx'
import { Aiports } from './Aiports.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Holamundo/>
    <MyApp/>
    <Aiports/>
  </StrictMode>,
)
