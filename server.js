import apiCartRouter from "./src/routes/cart.router.js";
import prodRouter from "./src/routes/product.router.js";
import apiSessionsRouter from "./src/routes/apiSession.router.js"
import sessionRouter from "./src/routes/session.router.js"
import views from "./src/routes/views.router.js";
import userRouter from "./src/routes/users.router.js";
import loggerTest from "./src/routes/test.router.js";
import ProductManager from "./src/mongoManager/ProductManager.js";
import MsgsManager from "./src/mongoManager/MsgsManager.js";
import CartManager from "./src/mongoManager/CartManager.js";
import { serve, setup } from 'swagger-ui-express'
import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
import mongoStore from "connect-mongo"
import passport from "passport";
import cors from 'cors'
import swaggerSpec from './src/config/swaggerConfig.js'
import StripePayment from './src/utils/stripePayment.js';
import { __dirname } from "./src/utils.js";
import { Server } from "socket.io";
import cookieRouter from "./src/routes/cookie.router.js";
import jwtRouter from "./src/routes/jwt.router.js";
import "./src/db/mongo.js";
import "./src/config/dbConfig.js";
import "./src/utils/passport.js";
import config from "./src/config/config.js";
import { isPremium } from "./src/middlewares/role.middleware.js";


export const app = express();
const cookieKey = "SignedCookieKey";
const PORT = process.env.PORT


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(cookieKey));
app.use(passport.initialize())


const fileStore = FileStore(session)
app.use(
  session({
    secret: "secretCode",
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 50000 },
    store: new mongoStore({
      mongoUrl: config.mongoUrl,
    }),
  }),
);

app.use(passport.session())

Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

const path = new ProductManager();
const msgManager = new MsgsManager();
const cartManager = new CartManager();

// * Evita el error: ANOENT: main.hbs //
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "./src/layouts/",
    helpers: {
      toJSON: function (obj) {
        return JSON.stringify(obj);
      },
    },
  }),
);
// *
app.set("view engine", "hbs");
app.set("views", __dirname + "/views")

app.use('/apidocs', serve, setup(swaggerSpec))

// views
app.use("/", views);

app.use('/', sessionRouter)
app.use("/cookies", cookieRouter);
app.use('/jwt', jwtRouter)

// app.use("/cart", cartRouter)
app.use("/api/carts", apiCartRouter);
app.use("/api/products", prodRouter);
app.use('/api/sessions', apiSessionsRouter);
app.use("/api/users", userRouter);
app.use("/api/test", loggerTest);

export const serverLocal = app.listen(PORT, () => {
  console.log("200 OK");
});

const socketServer = new Server(serverLocal);

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado ${socket.id}`);

  socket.on("showProds", async (owner) => {
    const prods = await path.getProducts(owner);
    socket.emit('prods', prods)
  });

  socket.on('showMsg', async () => {
    const getMsgs = await msgManager.getMsgs();
    socket.emit("msgs", getMsgs);
  })

  socket.on("send", async (prod, user) => {
    const posted = await path.addProduct(prod);
    const prods = await path.getProducts(user.email);
    socket.emit("alert", "Producto agregado");
    socket.emit("prods", prods);
  });

  socket.on("delete", async (id, user) => {
    const deleted = await path.deleteProduct(id, user.role);
    const prods = await path.getProducts(user.email);
    if (deleted) {
      socket.emit("prods", prods);
      socket.emit("alert", deleted.message);
    } else {
      socket.emit("alert", "Sin acceso para borrar el producto");
    }
  });

  socket.on("msg", async (e) => {
    const sendMsg = await msgManager.sendMsg(e);
    const getMsgs = await msgManager.getMsgs();
    socket.emit("alert", sendMsg);
    socket.emit("msgs", getMsgs);
  });

  socket.on('mongoProds', async () => {
    const getPags = await path.getPagination()
    socket.emit('prods', getPags)
  })

  socket.on("addToCart", async (e, user) => {
    const cart = await cartManager.addToCart(e.idCart, e.obj._id, user);
    socket.emit("alert", cart);
  });
});
