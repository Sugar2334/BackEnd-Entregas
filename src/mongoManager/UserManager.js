import { userModel } from "../models/users.model.js";
import { cartModel } from "../models/carts.model.js";
import { comparePasswords, hashPassword } from "../utils.js"

class UserManager {
  async createUser(user) {
    try {
      const { email, password } = user;
      const userExists = await userModel.find({ email });

      if (userExists.length !== 0) {
        return null;
      } else {
        const hashNewPass = await hashPassword(password)
        const cart = await cartModel.create({
          products: [],
        });
        const newUser = await userModel.create({ ...user, password: hashNewPass, role: "user", cart: cart._id });
        return newUser;
      }
    } catch (err) {
      console.log(err);
      return null
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const username = await userModel.find({ email });

      if (username.length !== 0) {
        const isPass = await comparePasswords(password, username[0].password)
        if (isPass) {
          return username
        }
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async checkUser(id) {
    try {
      const user = await userModel.findById(id).lean()
      return user
    } catch (err) {
      console.log(err);
    }
  }
}

export default UserManager;