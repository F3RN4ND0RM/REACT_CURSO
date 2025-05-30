

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

dotenv.config()


//Middleware to validate JWT 
//Returns  {error: "user not authenticated"} if JWT is not valid
//Continues if JWT is confirmed an duser existe
export const validatesJWT = async (req, res, next) => {
    //Retrieves token from header
    const token =await req.get("token")
    let userId = 0    

    try{
        //If theres token         
        if(token){
            //Verify it 
            await jwt.verify(token,String(process.env.SECRET), (err, userToken) => {
                //updates employee id
                console.log(err)
                
                if(!err)
                    userId = userToken.id                
            })
        }         
        
        if(userId == 0)
            return res.status(400).json({error: "User not authenticated"})        
        //Append user  to body
        req.userId = userId
        next()

    }catch(error){
        console.log(error)
       return res.status(400).json({error: "Something went wrong"})
    }
}
