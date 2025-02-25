import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Counter } from './Counter.jsx'
import { SimpleForm } from './Hooks.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>    
    <SimpleForm/>    
  </StrictMode>,
)
