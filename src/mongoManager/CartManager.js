import { cartModel } from "../models/carts.model.js";
import { ticketModel } from "../models/ticket.model.js";
import { errors } from "../utils/errors.js"

class CartManager {
  async createCart() {
    try {
      const cart = await cartModel.create({
        products: [],
      });
      return cart;
    } catch (err) {
      console.log(err);
      return errors.unknownError;
    }
  }

  async deleteCart(id) {
    try {
      const deleted = await cartModel.findByIdAndDelete(id);
      return deleted;
    } catch (err) {
      console.log(err);
      return errors.unknownError;
    }
  }

  async getCart(id) {
    try {
      const getCart = cartModel
        .findById(id)
        .populate({ path: "products._id" })
        .lean();
      console.log(getCart);
      return getCart;
    } catch (err) {
      console.log(err);
      return errors.unknownError;
    }
  }

  async addToCart(cid, pid) {
    try {
      const getId = await cartModel.findById(cid);

      // me fijo si el carrito esta creado
      if (!!getId) {
        const getProd = getId.products.find((e) => e._id == pid);

        if (!getProd) {
          getId.products.push({ _id: pid, quantity: 1 });
          await getId.save();
          return { message: "agregado con exito" };
        } else {
          return errors.productAlreadyExists;
        }
      } else {
        return errors.invalidCart;
      }
    } catch (err) {
      console.log(err);
      return errors.unknownError;
    }
  }

  async sumQuantity(cid, pid, quantity) {
    const getId = await cartModel.findById(cid);

    // me fijo si el carrito esta creado
    if (!!getId) {
      const getProd = getId.products.find((e) => e._id == pid);

      if (!getProd) {
        return { error: "el producto no esta en el carrito" };
      } else {
        getProd.quantity += quantity;
        getId.save();
        return { message: "se sumo la cantidad indicada al carrito" };
      }
    } else {
      return { error: "carrito no encontrado" };
    }
  }
  

  async removeFromCart(cid, pid) {
    try {
      const getId = await cartModel.findById(cid);

      if (!!getId) {
        const isHere = getId.products.find((e) => e.toString() === pid);
        if (!!isHere) {
          getId.products.splice(getId.products.indexOf(isHere), 1);
          getId.save();
          return { message: "Producto borrado con exito", product: pid };
        } else {
          return errors.productNotFound;
        }
      } else {
        return errors.invalidCart;
      }
    } catch (err) {
      console.log(err);
      return errors.unknownError;
    }
  }

  async emptyCart(cid) {
    try {
      const empty = await cartModel.findByIdAndUpdate(cid, { products: [] });
      if (!!empty) {
        return { message: "Carrito borrado", cart: [] };
      } else {
        return errors.invalidCart;
      }
    } catch (err) {
      console.log(err);
      return errors.unknownError;
    }
  }

  async purchase(cid) {
    try {
      const cart = await cartModel
        .findById(cid)
        .populate({ path: "products._id" });
      const productsToPurchase = [];
      const productsNotPurchased = [];
      for (const product of cart.products) {
        const availableStock = product._id.stock;
        const requestedQuantity = product.quantity;
        console.log(product);
        if (availableStock >= requestedQuantity) {
          productsToPurchase.push(product);
          product._id.stock -= requestedQuantity;
          await product._id.save();
        } else {
          productsNotPurchased.push({_id: product._id, quantity: product.quantity});
        }
      }

      cart.products = productsNotPurchased;
      await cart.save();

      if (productsNotPurchased.length > 0) {

        return {
          error: "No se pudieron procesar todos los productos.",
          productsNotPurchased,
        };
      }

      const ticket = await ticketModel.create({
        code: "ABC" + Math.random() * 2,
        purchase_datetime: new Date(),
        amount: 1,
        purchaser: cid,
      });

      return ticket;
    } catch (err) {
      console.log(err);
      return errors.unknownError;
    }
  }

  async replaceCart(cid, arr) {
    try {
      const getId = await cartModel.findById(cid);
      if (!!getId) {
        getId.products = arr;
        getId.save();
        return { message: "Carrito reemplazado con exito", cart: arr };
      }
    } catch (err) {
      console.log(err);
      return errors.unknownError;
    }
  }
}

export default CartManager;