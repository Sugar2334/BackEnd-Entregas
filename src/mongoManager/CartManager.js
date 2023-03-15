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
      return { error: 'Algo salio mal' }
    }
  }

  async deleteCart(id) {
    try {
      const deleted = await cartModel.findByIdAndDelete(id);
      return deleted;
    } catch (err) {
      console.log(err);
      return { error: 'Algo salio mal' }
    }
  }

  async getCart(id) {
    try {
      const getCart = cartModel.findById(id)
      return getCart;
    } catch (err) {
      console.log(err);
      return { error: 'Algo salio mal' }
    }
  }

  async addToCart(cid, pid) {
    try {
      const getId = await cartModel.findById(cid);
      
      // me fijo si el carrito esta creado
      if (!!getId) {

        getId.products.push(pid)
        return getId.save()
      
      } else {
        return { error: "carrito no encontrado" };
      }
    } catch (err) {
      console.log(err);
      return { error: 'Algo salio mal' }
    }
  }

  async copyCart(cid) {
    try {
      const getCart = await cartModel.findById(cid)
      
    } catch (err) {
      console.log(err);
      return { error: 'Algo salio mal' }
    }
  }

  async removeFromCart(cid, pid) {
    try {

      const getId = await cartModel.findById(cid);

      if (!!getId) {
        const isHere = getId.products.find((e) => e.toString() === pid);
        if (!!isHere) {
          getId.products.splice(getId.products.indexOf(isHere), 1)
          getId.save()
          return { message: "Producto borrado con exito", product: pid }
        } else {
          return { error: "No se encuentra el producto en la base de datos" };
        }
      } else {
        return { error: "No se encuentra el carrito en la base de datos" };
      }
    } catch (err) {
      console.log(err);
      return { error: 'Algo salio mal' }
    }
  }

  async emptyCart(cid) {
    try {
      const empty = await cartModel.findByIdAndUpdate(cid, { products: [] })
      if (!!empty) {
        return { message: "Carrito borrado", cart: [] }
      } else {
        return { error: 'Carrito no encontrado' }
      }
    } catch (err) {
      console.log(err);
      return { error: 'Algo salio mal' }
    }
  }

  async replaceCart(cid, arr) { 
    try {

      return { arr, cid }

    } catch (err) {
      console.log(err);
      return { error: 'Algo salio mal' }
    }
  }
}

export default CartManager;