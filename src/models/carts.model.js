import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: []
})

export const cartModel = mongoose.model('carts', cartSchema)