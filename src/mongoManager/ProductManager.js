import { productModel } from "../models/products.model.js";

class ProductManager {

  async getProducts() {
    try {
      const products = await productModel.find({});
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async getPagination(page = 1, limit = 10, sort = undefined, query = {}) {
    try {
      const pags = await productModel.paginate(query, { limit, page, sort })
      return pags
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(obj) {
    try {
      const newProd = await productModel.create(obj);
      return newProd;
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id);
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(id, field, elem) {
    try {
      const update = await productModel.findOneAndUpdate(id, { $set: { [field]: elem } });
      return update;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      const deleted = await productModel.findByIdAndDelete(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}

export default ProductManager;