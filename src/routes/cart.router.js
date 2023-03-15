import { Router } from "express";
import CartManager from "../mongoManager/CartManager.js";

const cartRouter = new Router();
const newCart = new CartManager("../mockDB/carts.json");

// Nuevo carrito
cartRouter.post("/", async (req, res) => {
  const result = await newCart.createCart();
  res.json(result);
});

// Listar prods
cartRouter.get("/:cid", async (req, res) => {
  const id = req.params;
  const cart = await newCart.getCart(id.cid);
  res.json(cart);
});

// * actuliza el carrito por el array del body
cartRouter.put("/:cid", async (req, res) => {
  const params = req.params;
  const result = await newCart.replaceCart(params.cid, req.body)
  res.json(result);
});

// Elimina todo el array
cartRouter.delete("/:cid", async (req, res) => {
  const params = req.params;
  const result = await newCart.emptyCart(params.cid);
  res.json(result);
});

// Agregar prod al arr de prods dentro del carrito seleccionado
cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const params = req.params;
  const result = await newCart.addToCart(params.cid, params.pid);
  res.json(result);
});

// Eliminar prods del array del carrito
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  const params = req.params;
  const result = await newCart.removeFromCart(params.cid, params.pid);
  res.json(result);
});

// * actualiza la quantity
cartRouter.put("/:cid/product/:pid", async (req, res) => {
  const params = req.params;
  const result = await newCart.removeFromCart(params.cid, params.pid);
  res.json(result);
});


export default cartRouter;