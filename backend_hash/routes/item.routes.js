import { Router } from "express";
import {validatesJWT} from "../middleware/jwt-validator.js"
import {
  getItems,
  getItem,
  postItem,
  putItem,
  deleteItem,
} from "../controllers/item.controllers.js";

const router = Router();

router.get("/items", validatesJWT, getItems);
router.get("/items/:id",validatesJWT, getItem);
router.post("/items",validatesJWT,postItem);
router.put("/items/:id",validatesJWT,putItem);
router.delete("/items/:id",validatesJWT, deleteItem);

export default router;
