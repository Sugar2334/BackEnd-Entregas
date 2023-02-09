import { Router } from "express";
import CartsManager from '../daos/carts-manager.js'
import ProductManager from '../daos/product-manager.js'

const router = Router()

const cart = new CartsManager('./src/mockDB/carts.json')
const products = new ProductManager('./src/mockDB/productos.json')
cart.getCarts()
products.getProducts()

router.post('/', async (request, response) => {
    try {
        cart.addCart();
        response.status(201).send('Carrito añadido exitosamente');
    } catch {
        console.log(err)
        response.status(500).send('No se logro crear el carrito' + err);
    }
})

router.get('/:cid', (request, response) =>{
    let carts = cart.getCarts()

    let cid = request.params['cid']
    const cartFind = carts.find(crt => crt.id === parseInt(cid))

    if (!cartFind) {
        return response.status(400).send('No es posible encontrar el carrito')
    } else {
        response.status(200).send(cartFind.products)
    }
})

router.post('/:cid/product/:pid', async (request, response) => {
    let cid = request.params['cid']
    let pid = request.params['pid']

    try {
        cart.addInCart(cid, pid)
        let carts = cart.getCarts()
        response.status(200).send(carts)
    } catch (err) {
        response.status(500).send('Ocurrio el error: '+ err)
    }

})



export default router