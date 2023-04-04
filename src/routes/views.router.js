import { Router } from "express"
import CartManager from "../mongoManager/CartManager.js"
import UserManager from "../mongoManager/UserManager.js"
import session from 'express-session'

const views = Router()
const cartManager = new CartManager()
const userManager = new UserManager()

views.get("/", (req, res) => {
    res.render("home");
  });

views.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

views.get("/chat", (req, res) => {
  res.render("chat");
});

views.get("/products", (req, res) => {
  const { user } = req.session
  res.render("products", user);
});

views.get("/cart/:id", async (req, res) => {
  res.render("cart", {cart: await cartManager.getCart(req.params.id) });
});

views.get("/products/:id", async (req, res) => {
  res.render("products", { user: await userManager.checkUser(req.params.id) });
});

// render desde session.router.js para borrar la cookie
// views.get("/login", (req, res) => {
//   res.render("login");
// });

views.get("/signup", (req, res) => {
  res.render("signup");
});

views.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

views.get("/errorSignUp", (req, res) => {
  res.render("errorSignup");
});

views.get("/perfil", (req, res) => {
  res.render("perfil");
});

export default views