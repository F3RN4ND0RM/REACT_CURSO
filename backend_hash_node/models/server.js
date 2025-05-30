import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import db from '../db/db.js'
import usersRoute from '../routes/users.route.js'

//Defining server class
class Server{

    app ; //aplicacion
    port //puerto en el que correra
    apiPaths = {
        users : '/', //rutas,
    }

    //server constructor, inititilizes server
    constructor(){
        this.app = express(); 
        this.port = process.env.PORT || "9000"; //Defining port from .env

        this.middlewares(); 
        this.routes();
        this.dbConnection();
    }


    //db Connection testing
    async dbConnection() {
        try {
            //If ok            
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            //show error
            console.error(error);
        }
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

    //initialicing routes
    routes(){            
        //defining routes    
        this.app.use(this.apiPaths.users, usersRoute)
    }

    //Initilizes server
    listen(){
        this.app.listen(this.port, () =>{
            console.log("Server running on: "+ this.port)
        })
    }
}

export default Server;