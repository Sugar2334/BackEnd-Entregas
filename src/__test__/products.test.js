import { expect } from "chai";
import request from "supertest";
import { serverLocal } from "../src/server.js";


const wait2Secs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  });
};


before(async () => {
  await wait2Secs();
});


describe("Product Controller", () => {
  describe("GET /api/products", () => {
    it("should return a list of products", async () => {
      const res = await request(serverLocal).get("/api/products");
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("status");
      expect(res.body).to.have.property("payload").to.be.an("array");
    });
    
    it("should return a specific product by ID", async () => {
      const productId = "64bed15109e7e07651a6ec65";
      const res = await request(serverLocal).get(`/api/products/${productId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("title");
      expect(res.body).to.have.property("price");
  });    
});


describe("POST /api/products", () => {
     it("should add a new product", async () => {
       const productData = { title: "Mango", description: 'algo', price: 10.99, code: 'AA12', stock: 1, category: 'test' };
       const session = { id: "1", role: 'admin', email: 'test@gmail' }
       const res = await request(serverLocal)
         .post("/api/products")
         .send(productData);
       expect(res.status).to.equal(200);
     });
   });

   describe("PUT /api/products/:id", () => {
     it("should update a product", async () => {
       const productId = "64bec4d9bf68f80865062f7f";
       const updatedData = { title: "Mango", price: 19.99 };
       const res = await request(serverLocal)
         .put(`/api/products/${productId}`)
         .send(updatedData);
       expect(res.status).to.equal(200);
       expect(res.body).to.have.property("name", updatedData.title);
       expect(res.body).to.have.property("price", updatedData.price);
     });
   });

   describe("DELETE /api/products/:id", () => {
     it("should delete a product", async () => {
       const productId = "64bec4d9bf68f80865062f7f";
       const res = await request(serverLocal).delete(
         `/api/products/${productId}`
       );
       expect(res.status).to.equal(200);
       expect(res.body).to.have.property("message", "Producto eliminado");
       expect(res.body).to.have.property("prod");
     });
  });
});

after(() => {
  serverLocal.close();
})