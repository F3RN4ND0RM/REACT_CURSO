export function MyApp(){

  const nombre = "Carlos Fernando"  
  const apellido = "Ramos Mena"
  const nombreCompleto = `${nombre} ${apellido}` 
  
  const  elemento = <h2>{getSaludo(nombreCompleto)}</h2>
  
  return elemento


}

function getSaludo(nombre){
  return `Esto es un saludo desde componente App, hola: ${nombre}` ;
}


export default MyApp