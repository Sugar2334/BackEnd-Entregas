import { Router } from "express";
import ProductManager from "../mongoManager/ProductManager.js";

const prodRouter = new Router();

const prod = new ProductManager();

//  listar todos los prods
prodRouter.get("/", async (req, res) => {
  const { page, limit } = req.query;
  const result = await prod.getPagination(page, limit);
  const next = result.hasNextPage
    ? `http://localhost:8080/api/products?page=${result.nextPage}`
    : null;
  const prev = result.hasPrevPage
    ? `http://localhost:8080/api/products?page=${result.prevPage}`
    : null;
  res.json({
    status: "sucess",
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: prev,
    nextLink: next

  });
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