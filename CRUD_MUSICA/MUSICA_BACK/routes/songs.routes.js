import { Router } from 'express'
import {getAllSong, addSong, updateSong,getSongById, deleteSongById} from "../controllers/music.controller.js"
import { checkValidator } from '../middlewares/check-validator.js'
import { check } from 'express-validator'

const router = Router()

//Defining get abilitires route
router.get('/:id', getSongById)

router.get('/', getAllSong)

router.put('/:id',[
    check('name', 'name cannot be empty').notEmpty(),
    check('artist', 'artist cannot be empty').notEmpty(),
    check('album', 'album cannot be empty').notEmpty(),
    checkValidator
    ],updateSong)

router.post('/', [
    check('url', 'invalid url format').isURL(),
    check('name', 'name cannot be empty').notEmpty(),
    check('artist', 'artist cannot be empty').notEmpty(),
    check('album', 'album cannot be empty').notEmpty(),
    checkValidator
], addSong)

router.delete('/:id', deleteSongById)

export default router