import { Router } from 'express'
import {getAllSong, addSong} from "../controllers/music.controller.js"
import { checkValidator } from '../middlewares/check-validator.js'
import { check } from 'express-validator'

const router = Router()

//Defining get abilitires route
router.get('/', getAllSong)
router.post('/', [
    check('name', 'name cannot be empty').notEmpty(),
    check('artist', 'artist cannot be empty').notEmpty(),
    check('album', 'album cannot be empty').notEmpty(),
    checkValidator
], addSong)

export default router