import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from   '../models/users.model.js'






 /* Get Employee info
    Returns {error: "Auth Failed"} if employee doesnt exists
    Returns { "name": "name", "rolename": "rolename", "email": "email","percentage": "percentage"} if ok
*/
export const getEmployeeInfo = async(req,res)=>{
    //Retrieves employee ID
    const userId = req.userId
    try{

        const user = await User.findByPk(userId, {            
            attributes : ['name', 'rolename', 'email', ],
        })

        //if employee return values
        return user
            ? res.status(200).json(user)
            : res.status(400).json({error: "Auth Failed"})
        
    }catch(error){
        console.error(error)
        return res.status(400).json({error: "Something went wrong"})
    }
}



//Login function
//returns jwt if password setted
//returns false if password unsetted
export const logIn = async(req, res) =>{    
    try{
        //Retrive email form body
        const email = req.body.email
        const pass = req.body.pass || ""
        let resok = await User.findAll()
        return res.status(200).json(resok)

        const user = await User.findOne({where: {email : email}})

        //Email is not registered
        if(!user)   
            return  res.status(400).json({error : "Failed Auth"})    

               
        
        //Validating encripted password             
        const isValid = await bcrypt.compare(pass || "", user.pass)        
        if (!isValid)            
            return  res.status(400).json({error : "Failed Auth"})

        //creating JSON WEB TOken
        const jwtoken = jwt.sign({
            id : user.id,}
            ,String(process.env.SECRET)
            ,{ expiresIn: "86400000" })

        //Login ok
        return res.status(200).json({status : "true", token : jwtoken})                    

    }catch(error){
        console.error(error)
        return res.status(400).json({error : error})
    }
}