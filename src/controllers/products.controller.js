import ProductManager from "../mongoManager/ProductManager.js";

const prod = new ProductManager();

export const getProds = async (req, res) => {
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
};

export const getById = async (req, res) => {
  const params = req.params; // 'products/1' = SHREK ; 'products/10' = 'Not found'
  const prods = await prod.getProductById(params.pid);
  res.json(prods);
};

export const addProd = async (req, res) => {
  const response = await prod.addProduct(req.body);
  if (response) {
    res.status(200).json({ message: "producto agregado", prod: req.body });
  } else {
    res.json({ message: "error" });
  }
};

export const updateProd = async (req, res) => {
  const id = req.params;
  const field = Object.keys(req.body).toString();
  const elem = Object.values(req.body).toString();
  const result = await prod.updateProduct(id.pid, field, elem);
  res.json(result);
};

export const deleteProd = async (req, res) => {
  const id = req.params;
  const result = await prod.deleteProduct(id.pid);
  res.json(result);
};