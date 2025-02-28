import { auto } from "@popperjs/core"


export const PokemonCard = ({id, name, sprites = [], song}) => {
    return (
        <section style = {{height:auto}} className="w-100 d-flex flex-column  justify-content-center align-items-center">
                            
                <h3 className="text-capitalize">#{id} - { name } </h3>
                { /*imagenes */ }
                <div className="w-100 d-flex flex-column justify-content-center align-items-center gap-3">{
                    <img src={sprites} key={sprites} alt={name} className="w-50 rounded-circle"/>
              
                    }{
                    <audio controls className="w-50">
                        <source src={song} type="audio/mpeg"></source>
                        Your browser does not support the audio element.

                    </audio>
                    }
                </div>
            
        </section>
    )
}

