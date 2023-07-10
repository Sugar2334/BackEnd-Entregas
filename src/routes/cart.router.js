import { Router } from "express";
import { isUser } from '../middlewares/role.middleware.js'
import {
  addToCart,
  createCart,
  emptyCart,
  getCart,
  purchaseCart,
  removeFromCart,
  replaceCart,
  sumQuantity,
} from "../controllers/cart.controller.js";

const router = new Router();


router.post("/", isUser, createCart);

router.get("/:cid", isUser, getCart);


router.put("/:cid", isUser, replaceCart);


router.delete("/:cid", isUser, emptyCart);

router.post("/:cid/purchase", purchaseCart);


router.post("/:cid/product/:pid", isUser, addToCart);


router.put("/:cid/product/:pid", isUser, sumQuantity);


router.delete("/:cid/product/:pid", isUser, removeFromCart);

export default router;