import { cartModel } from "../models/carts.model.js";

class CartManager {

  async createCart() {
    try {
      const cart = await cartModel.create({
        products: [],
      });
      return cart;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCart(id) {
    try {
      const deleted = await cartModel.findByIdAndDelete(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }

  async getCart(id) {
    try {
      const getCart = cartModel.findById(id);
      return getCart;
    } catch (err) {
      console.log(err);
    }
  }

  async addToCart(cid, pid) {
    try {
      const getId = await cartModel.findById(cid);
      
      // me fijo si el carrito esta creado
      if (!!getId) {

        const getProd = getId.products.find(e => e.productId === pid)

        // despues me fijo que el producto ya exista en el carrito
        if (!!getProd) {
          const update = getId.products.map(prod => {
            if (prod.productId == pid) {
              prod.quantity += 1
            }
            return prod
          })
          return await cartModel.findByIdAndUpdate(cid, { products: update })
        } else {
          const addProd = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $push: { products: { productId: pid, quantity: 1 } } }
          );
          return addProd
        }
      } else {
        return { error: "carrito no encontrado" };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export default CartManager;