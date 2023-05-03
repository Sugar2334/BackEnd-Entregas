import { Router } from "express";
import { addProd, deleteProd, getById, getProds, updateProd } from '../controllers/products.controller.js'
import { isAdmin } from "../middlewares/role.middleware.js";

const prodRouter = new Router();

//  listar todos los prods
prodRouter.get("/", getProds);

// traer el prod seleccionado
prodRouter.get("/:pid", getById);

// agregar prod
prodRouter.post("/", isAdmin, addProd);

// actualizar prod seleccionado
prodRouter.put("/:pid", isAdmin, updateProd);

// borrar prod seleccionado
prodRouter.delete("/:pid", isAdmin, deleteProd);

export default prodRouter;