import ProductManager from "../mongoManager/ProductManager.js";
import { faker } from "@faker-js/faker";
import { logger } from "../utils/logger.js";


const prod = new ProductManager();

export const getProds = async (req, res) => {
  try {
    const { title, page, limit, sort } = req.query;
    const result = await prod.getPagination(title, limit, page, sort);
    const next = result.hasNextPage
      ? `http://localhost:8080/api/products?page=${result.nextPage}`
      : null;
    const prev = result.hasPrevPage
      ? `http://localhost:8080/api/products?page=${result.prevPage}`
      : null;
    res.status(200).json({
      status: "sucess",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: prev,
      nextLink: next,
    });
  } catch (error) {
    logger.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const getById = async (req, res) => {
  try {
    const params = req.params;
    const prods = await prod.getProductById(params.pid);
    res.status(200).json(prods);
  } catch (error) {
    logger.error("Error al obtener el producto por ID:", error);
    res.status(500).json({ error: "Error al obtener el producto por ID" });
  }
};

export const addProd = async (req, res) => {
  try {
    // Obtener el ID del usuario autenticado
    const userId = req.user.id;

    // Agregar el ID del usuario al objeto del producto
    const productData = { ...req.body, owner: userId };

    const response = await prod.addProduct(productData);
    if (response) {
      res.status(200).json({ message: "producto agregado", prod: productData });
    } else {
      res.json({ message: "error" });
    }
  } catch (error) {
    logger.error("Error al agregar el producto:", error);
    res.status(500).json({ error: "Error al agregar el producto" });
  }
};

export const updateProd = async (req, res) => {
  try {
    const id = req.params;
    const field = Object.keys(req.body).toString();
    const elem = Object.values(req.body).toString();
    const result = await prod.updateProduct(id.pid, field, elem);
    res.status(200).json(result);
  } catch (error) {
    logger.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const deleteProd = async (req, res) => {
  try {
    const id = req.params;
    const result = await prod.deleteProduct(id.pid);
    res.status(200).json(result);
  } catch (error) {
    logger.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const mocking = (req, res) => {
  try {
    const mocks = [];
    while (mocks.length !== 100) {
      const { price, product } = faker.commerce;
      const obj = { name: product(), price: price() };
      mocks.push(obj);
    }
    res.status(200).json(mocks);
  } catch (error) {
    logger.error("Error al generar datos falsos:", error);
    res.status(500).json({ error: "Error al generar datos falsos" });
  }
};