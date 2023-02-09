import fs from 'fs'
//const fs = require('fs')
import ProductManager from '../daos/product-manager.js'

const products = new ProductManager('./src/mockDB/productos.json')
products.getProducts()

class CartsManager {
    constructor(ruta) {
        this.path = ruta
    }

    getCarts = () => {
        if (fs.existsSync(this.path)) {
            let carts = []
            return carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        } else {
            fs.writeFileSync(this.path, '[]', 'utf-8')
            let carts = []
            return carts
        }
    }
    

    addCart = () => {
        let carts = this.getCarts()
        const cart = {
            products: []
        }


        if (carts.length === 0) {
            cart.id = 1
        } else {
            cart.id = carts[carts.length - 1].id + 1
        }

        carts.push(cart)
        fs.writeFileSync(this.path, JSON.stringify(carts), 'utf-8')
        
    }

    addInCart = (cid, pid) => {
        let prods = products.getProducts()
        let carts = this.getCarts()

        let searchedId = (prods.find(prod => prod.id === pid))
        let cartFound = carts.find(crt => crt.id === parseInt(cid))
        
        if (!cartFound || !searchedId) {
            console.log('Problema al tratar de resolver cid o pid')
        } else {
            const productIndex = cartFound.products.findIndex(prod => prod.id === pid)
            if (productIndex === -1) {
                cartFound.products.push({ id: pid, quantity: 1 })
                fs.writeFileSync(this.path, JSON.stringify(carts), 'utf-8')
            } else {
                cartFound.products[productIndex].quantity += 1
                fs.writeFileSync(this.path, JSON.stringify(carts), 'utf-8')
            }
            //cartFound[products].push(pid)
            //cartFound[products].push(quantity)
        }

    }
}

export default CartsManager