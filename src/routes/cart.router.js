import { Router } from "express";
import CartManager from "../mongoManager/CartManager.js";

const apicartRouter = new Router();
const newCart = new CartManager();

// Nuevo carrito
apicartRouter.post("/", async (req, res) => {
  const result = await newCart.createCart();
  res.json(result);
});

// Listar prods
apicartRouter.get("/:cid", async (req, res) => {
  const id = req.params;
  const cart = await newCart.getCart(id.cid);
  res.json(cart);
});

// * actuliza el carrito por el array del body
apicartRouter.put("/:cid", async (req, res) => {
  const params = req.params;
  const result = await newCart.replaceCart(params.cid, req.body)
  res.json(result);
});

// Elimina todo el array
apicartRouter.delete("/:cid", async (req, res) => {
  const params = req.params;
  const result = await newCart.emptyCart(params.cid);
  res.json(result);
});

// Agregar prod al arr de prods dentro del carrito seleccionado
apicartRouter.post("/:cid/product/:pid", async (req, res) => {
  const params = req.params;
  const result = await newCart.addToCart(params.cid, params.pid);
  res.json(result);
});

// Eliminar prods del array del carrito
apicartRouter.delete("/:cid/product/:pid", async (req, res) => {
  const params = req.params;
  const result = await newCart.removeFromCart(params.cid, params.pid);
  res.json(result);
});

// * actualiza la quantity
apicartRouter.put("/:cid/product/:pid", async (req, res) => {
  const params = req.params;
  const { quantity } = req.body
  const result = await newCart.removeFromCart(params.cid, params.pid);
  res.json(result);
});


export default apicartRouter;