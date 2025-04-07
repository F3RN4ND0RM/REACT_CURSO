import Product from '../models/product.model.js'

export const getProducts = async(req, res) =>{
    try{
        let products = await Product.findAll()

        if(products.length > 0 )
            return res.status(200).json(products)

        return res.status(400).json({erro : 'Algo salió mal'})

    }catch(error){
        console.log(error)
        return res.status(400).json({erro : 'Algo salió mal'})
    }
    
}