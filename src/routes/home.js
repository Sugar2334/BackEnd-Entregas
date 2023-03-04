import { Router } from "express";
import ProductManager from '../daos/product-manager.js'

const motos = new ProductManager('./src/mockDB/productos.json')
motos.getProducts()

const router = Router()

router.get('/home', async (request, response) => {
    let products = await motos.getProducts()
    
    response.render('home', {
        products
    })
})

export default router