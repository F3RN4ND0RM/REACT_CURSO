import { Router } from "express";
import { msg1, msg2, msg3, msg4 } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", msg1);
router.get("/marco", msg2);
router.get("/ping", msg3);
router.get("/a/b/c", msg4);

export default router;
