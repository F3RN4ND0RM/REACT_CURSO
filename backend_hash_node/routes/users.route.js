

import { Router } from 'express'
import { check } from "express-validator";
import {checkValidator} from "../middlewares/check-validator.js"
import {logIn} from '../controllers/user.controller.js'



const router = Router()


//Login Route
router.post('/login' , [
    //Checking username on body
    check('email', 'email empty').notEmpty(),
    checkValidator
], logIn)

export default router