import { useFetch } from '../hooks/useFetch';
import { useCounter } from '../hooks/useCounter';
import { LoadingMessage } from './LoadingMessage.jsx';
import { PokemonCard } from './PokemonCard.jsx';

const CLIENT_ID = 'e08c4a0e'; 
const genero = 'rock'; 
// ¡Nunca expongas el CLIENT_SECRET en el frontend en producción!

export const CustomHook = () => {
  const { counter, decrement, increment, reset } = useCounter(1); 
  // Asegúrate de que tu custom hook devuelva "reset" o ajusta el nombre

  // Llamada a la API de Jamendo para obtener 10 canciones con search=rock
  const { data, hasError, isLoading } = useFetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&search=${genero}&limit=100`
  );

  // Si hay error, puedes mostrarlo así
  if (hasError) {
    return <div>Error al cargar los datos: {hasError}</div>;
  }

  return (
    <>
      <h1>Listado de Canciones Rock</h1>
      <hr />
      <div className='z-1'>
      {
        // Muestra mensaje de carga si aún estamos esperando la respuesta
        isLoading 
          ? ( <LoadingMessage /> ) 
          : (
            
              data?.results?.length > 0 
                ? 
                    <div key={data.results[counter].id} style={{ marginBottom: '1rem' }}>   
                      <PokemonCard 
                        // Ajusta según tu componente. 
                        // A modo de ejemplo, mandamos ID, nombre y la imagen del álbum.
                        id= {data.results[counter].artist_name}
                        name={data.results[counter].name}
                        sprites={data.results[counter].album_image}
                        song = {data.results[counter].audio}
                      />
                    </div>
                  
                  
                : <p>No se encontraron canciones.</p>
                
            )
            
      }
      </div>
      {
        
        <div className='w-100 d-flex gap-1 z-3'>                
            <button className='w-50 p-2 btn btn-dark' onClick= { ()=>decrement() } >Anterior</button>
            <button className='w-50 p-2 btn btn-secondary' onClick= { ()=>reset() } >Reset</button>
            <button className='w-50  p-2 btn btn-dark' onClick= { ()=>increment() } >Siguiente</button>
        </div>  
      }

      
    </>
  );
};