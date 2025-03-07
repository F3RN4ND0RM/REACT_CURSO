import { GifItem } from './GifItem';
import { useFetchGifs } from '../hooks/useFetchGifs';
export const GifGrid = ( {category} ) => {
const { images, isLoading } = useFetchGifs( category );
return (
    <>
        <div className='d-flex w-100 flex-column justify-content-center mt-4'>
            <h3 className='text-white'>{category }</h3>
            {
                isLoading && ( <h2>Cargando...</h2> )
            }
            <div className="container ">            
                <div className='row gap-2 w-100 justify-content-center'>
                {
                        images.map( (image) => (
                            
                                <GifItem key={image.id} {...image} />
                        
                        ))
                }       
                </div>     
            </div>

        </div>
    </>
)
}
