import express from 'express'

import productRouter from './src/routes/products.js'
import cartRouter from './src/routes/cart.js'


const PORT = 8080
const server = express()
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use('/api/products', productRouter)

server.use('/api/carts', cartRouter)


server.listen(PORT, err =>{
    if (err)  console.log(err)
    console.log(`Corriendo en http://localhost:${PORT}`)
})