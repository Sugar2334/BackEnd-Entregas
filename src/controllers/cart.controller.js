import CartManager from '../mongoManager/CartManager.js'

const cart = new CartManager()

export const createCart = async (req, res) => {
  const result = await cart.createCart();
  res.json(result);
};

export const getCart = async (req, res) => {
  const id = req.params.cid;
  const cart = await cart.getCart(id);
  res.json(cart);
};

export const replaceCart = async (req, res) => {
  const params = req.params;
  const result = await cart.replaceCart(params.cid, req.body);
  res.json(result);
};

export const purchaseCart = async (req, res) => {
  const params = req.params;
  const result = await cart.purchase(params.cid);
  res.json(result);
};

export const emptyCart = async (req, res) => {
  const params = req.params;
  const result = await cart.emptyCart(params.cid);
  res.json(result);
};

export const addToCart = async (req, res) => {
  const params = req.params;
  const result = await cart.addToCart(params.cid, params.pid);
  res.json(result);
};

export const removeFromCart = async (req, res) => {
  const params = req.params;
  const result = await cart.removeFromCart(params.cid, params.pid);
  res.json(result);
};

export const sumQuantity = async (req, res) => {
  const params = req.params;
  const { quantity } = req.body;
  const result = await cart.sumQuantity(params.cid, params.pid, quantity);
  res.json(result);
};