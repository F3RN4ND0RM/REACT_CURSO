import Router from "express"
import { getProducts,editarProducto, crearProductos, deleteProducto} from "../controllers/products.controller.js"

const router = Router()

router.get('/',getProducts )
router.post('/', crearProductos)
router.put('/:id',editarProducto )
router.delete('/:id',deleteProducto )



export default router