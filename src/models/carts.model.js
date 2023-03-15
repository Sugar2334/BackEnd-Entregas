import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
      type: mongoose.Schema.Types.ObjectId, ref: "products", default: [] 
    }],
});
  
export const cartModel = mongoose.model("carts", cartSchema);