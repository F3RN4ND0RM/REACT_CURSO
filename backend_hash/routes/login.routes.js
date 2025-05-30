import { Router } from "express";
import { login, postUser } from "../controllers/login.controller.js";

const router = Router();

router.post("/login", login);
router.post("/users", postUser);

export default router;
