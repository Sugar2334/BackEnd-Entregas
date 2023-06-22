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

  async getPagination(query, limit = 10, page = 1, value = undefined ) {
    try {
      const options = {
        sort: { price: value },
        limit,
        page
      }
      const pags = await productModel.paginate({query}, options)
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

  async getProductByUserId(id) {
    try {
      const products = await productModel.find({ owner: id });
      return products;
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
      return { message: 'Producto eliminado', prod: deleted };
    } catch (err) {
      console.log(err);
    }
  }
}

export default ProductManager;