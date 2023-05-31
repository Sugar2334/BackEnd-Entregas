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

  async checkByEmail(email) {
    try {
      const user = await userModel.find({ email })
      return user[0]
    } catch (err) {
      console.log(err);
    }
  }

  async changePassword(userId, newPassword) {
    try {
      // Obtener el usuario de la base de datos
      const user = await userModel.findById(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
  
      // Actualizar la contraseña del usuario
      const hashedPassword = await hashPassword(newPassword);
      user.password = hashedPassword;
      await user.save();
  
      return user;
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }
  }

  async changeUserRole(userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const newRole = user.role === 'user' ? 'premium' : 'user';
      user.role = newRole;
      await user.save();

      return user;
    } catch (error) {
      console.error('Error al cambiar el rol del usuario:', error);
      throw error;
    }
  }
}

export default UserManager;
