import fs from 'fs'
//const fs = require('fs')

class ProductManager {
    constructor(ruta) {
        this.path = ruta
    }

    getProducts = () => {
        if (fs.existsSync(this.path)) {
            let products = []
            return products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        } else {
            fs.writeFileSync(this.path, '[]', 'utf-8')
            let products = []
            return products
        }
    }
    

    addProduct = (title, description, code, price, thumbnail, stock,) => {
        let products = this.getProducts()
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status: true
        }


        if (products.length === 0) {
            product.id = 1
        } else {
            product.id = products[products.length - 1].id + 1
        }
    
        let found = products.some(p => p.code === code)
        if (!found) {
            products.push(product)
            fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8')
            //console.log(this.products)
        } else {
            console.log('El codigo ya existe, intente con otro')
        }
        
    }

    getProductById = (id) => {
        let products = this.getProducts()
        let searchedId = (products.find(p => p.id === id))
        if (searchedId) {
            return searchedId
        } else {
            console.log('ID not found')
        }
    }

    updateProduct = (id, key) => {
        let products = this.getProducts()
        let objIndex = products.findIndex(obj => obj.id === id)
        if (objIndex === -1) {
            console.log("Producto no encontrado");
            return;
        }
        if (key.title) {
            products[objIndex].title = key.title;
        }
        if (key.description) {
            products[objIndex].description = key.description;
        }
        if (key.price) {
            products[objIndex].price = key.price;
        }
        if (key.thumbnail) {
            products[objIndex].thumbnail = key.thumbnail;
        }
        if (key.stock) {
            products[objIndex].stock = key.stock;
        }
        if (key.status) {
            products[objIndex].status = key.stock;
        }

        fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8')
    }

    deleteProduct = (id) => {
        let products = this.getProducts()
        let objIndex = products.findIndex(obj => obj.id === id)
        if (objIndex > -1) {
            products[objIndex].status = false
            products[objIndex].stock = 0;
        } else {
            console.log(id + ' No encontrado')
        }

        return products = fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8')
    }
}

export default ProductManager