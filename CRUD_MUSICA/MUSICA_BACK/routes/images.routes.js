import { Router } from "express";
import getImage  from "../controllers/images.controller.js";

const router = Router();
router.get('/:folder/:file', getImage)

export default router;