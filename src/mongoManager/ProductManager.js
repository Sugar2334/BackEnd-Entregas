import { transporter } from "../controllers/user.controller.js";
import { productModel } from "../models/products.model.js";

class ProductManager {

  async getProducts(param = {}) {
    try {
      const products = await productModel.find(param);
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async getPagination(query, limit = 10, page = 1, value = undefined) {
    try {
      const options = {
        sort: { price: value },
        limit,
        page,
      };
      const pags = await productModel.paginate({ query }, options);
      return pags;
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(obj) {
    try {
      const newProd = await productModel.create(obj);
      console.log(newProd)
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
      const update = await productModel.findOneAndUpdate(id, {
        $set: { [field]: elem },
      });
      return update;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id, user) {
    try {
      if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        return { message: "Ingrese un ID válido" };
      }
      const prod = await productModel.findById(id);
      
      if(!prod) {
        return { message: "No se encontró el ID" };
      }
      
      if (prod.owner === 'admin' && user.role === 'admin') {
        await productModel.findByIdAndRemove(id)
        return { message: "Producto eliminado", prod: prod };
      }

      else if (user.email === prod.owner || user.role === 'admin') {
        const mailOptions = {
          from: "noreply@example.com",
          to: prod.owner,
          subject: "Su producto ha sido eliminado",
          text: `Su producto ${prod.title}, fue eliminado.`,
        };

        await transporter.sendMail(mailOptions);
        await productModel.findByIdAndDelete(id)
        return { message: "Producto eliminado", prod: prod };
      }


      else if (user.role !== 'admin') {
        return { message: 'No tienes los permisos suficientes para borrar este producto' }
      }
    } catch (err) {
      console.log(err);
      return { message: err.error }
    }
  }
}

export default ProductManager;