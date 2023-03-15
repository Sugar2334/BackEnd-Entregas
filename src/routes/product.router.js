import { Router } from "express";
import ProductManager from "../mongoManager/ProductManager.js";

const prodRouter = new Router();

const prod = new ProductManager();

//  listar todos los prods
prodRouter.get("/", async (req, res) => {
  const { limit = 0 } = req.query; // '/products?limit=5'
  const products = await prod.getProducts();

  if (limit === 0) {
    if (products.length !== 0) {
      res.json({ products });
    } else {
      res.send("No hay productos");
    }
  } else if (limit > products.length) {
    res.json({ error: "Limit Exceeded" });
  } else {
    let arr = [];
    products.map((e, i) => {
      if (i < limit) arr.push(e);
    });
    res.json(arr);
  }
});

// traer el prod seleccionado
prodRouter.get("/:pid", async (req, res) => {
  const params = req.params; // 'products/1' = SHREK ; 'products/10' = 'Not found'
  const prods = await prod.getProductById(params.pid);
  res.json(prods);
});

// agregar prod
prodRouter.post("/", async (req, res) => {
  const response = await prod.addProduct(req.body);
  if (response) {
    res.status(200).json({ message: "producto agregado", prod: req.body });
  } else {
    res.json({ message: "error" });
  }
});

// actualizar prod seleccionado
prodRouter.put("/:pid", async (req, res) => {
  const id = req.params;
  const field = Object.keys(req.body).toString();
  const elem = Object.values(req.body).toString();
  const result = await prod.updateProduct(Number(id.pid), field, elem);
  res.json(result);
});

// borrar prod seleccionado
prodRouter.delete("/:pid", async (req, res) => {
  const id = req.params;
  const result = await prod.deleteProduct(id.pid);
  res.json(result);
});

export default prodRouter;
