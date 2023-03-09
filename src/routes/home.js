import { Router } from "express";
import ProductManager from '../daos/product-manager.js'

const tech = new ProductManager('./src/mockDB/productos.json')
tech.getProducts()

const router = Router()

router.get('/home', async (request, response) => {
    let products = await tech.getProducts()
    
    response.render('home', {
        products
    })
})

export default router