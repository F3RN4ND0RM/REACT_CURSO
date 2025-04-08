import Product from '../models/product.model.js'


export const crearProductos = async(req, res) =>{
    try{
        let producto = req.body.product
        let product = await Product.create(producto)

        if(product )
            return res.status(200).json(product)

        return res.status(400).json({erro : 'Algo salió mal'})

    }catch(error){
        console.log(error)
        return res.status(400).json({erro : 'Algo salió mal'})
    }
    
}


export const getProducts = async(req, res) =>{
    try{
        let products = await Product.findAll({where : {status : 1}})

        if(products.length > 0 )
            return res.status(200).json(products)

        return res.status(400).json({erro : 'Algo salió mal'})

    }catch(error){
        console.log(error)
        return res.status(400).json({erro : 'Algo salió mal'})
    }
    
}

export const editarProducto = async (req, res) => {
    try {
        let id = req.params.id;
        let productBody = req.body.product.editingProduct;

        // Buscamos el producto por su ID
        let product = await Product.findByPk(id);
        console.log(productBody)
        if (product) {
            // Actualizamos el producto
            await product.update({
                nombre: productBody.nombre,
                descripcion: productBody.descripcion, // Corregido el nombre de la propiedad
                existencia: productBody.existencia,
                precio: productBody.precio
            });

            // Respondemos con éxito
            return res.status(200).json({ msg: "Producto actualizado correctamente" });
        }

        // Si no encontramos el producto, respondemos con error
        return res.status(404).json({ error: 'Producto no encontrado' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Algo salió mal al actualizar el producto' });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        let id = req.params.id;
        // Buscamos el producto por su ID
        let product = await Product.findByPk(id);
        
        if (product) {
            // Actualizamos el producto
            await product.update({
                status : 0
            });

            // Respondemos con éxito
            return res.status(200).json({ msg: "Producto actualizado correctamente" });
        }

        // Si no encontramos el producto, respondemos con error
        return res.status(404).json({ error: 'Producto no encontrado' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Algo salió mal al actualizar el producto' });
    }
};
