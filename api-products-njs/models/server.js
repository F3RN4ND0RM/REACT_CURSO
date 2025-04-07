import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import productsRoute from '../routes/products.route.js'
import db from '../db/connection.js'
class Server{

    app;
    port;    
    constructor(){
        this.port = process.env.PORT || "9090"
        this.app = express()     
        this.apiPaths ={
            products : '/products'
        }   

        this.middlewares();
        this.routes();
        this.dbConnection();
    }
        

    //Defining server middlewares 
    middlewares() {
        //cors
        this.app.use(cors({}));
        //body parser
        this.app.use(express.json())
        this.app.use(cookieParser());
        //carpeta publica
        this.app.use(express.static('public'))
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            console.error(error);
        }
    }

    routes(){                    
        this.app.use(this.apiPaths.products,productsRoute)        
    }


    listen(){
        this.app.listen(this.port, () =>{
            console.log("Server running on: "+ this.port)
        })
    }

}

export default Server