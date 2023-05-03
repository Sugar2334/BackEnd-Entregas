import UserManager from "../mongoManager/UserManager.js";
import UserDTO from '../dao/dto/UserDTO.js'

const userManager = new UserManager()

export const githubCallback = (req, res) => {
  req.session.email = req.user.email;
  req.session.role = req.user.role
  res.redirect(`/products/${req.session.passport.user}`);
};

export const loginGet = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.json({ error: err });
    } else {
      // render desde router para borrar cookies, ni idea si esta bien pero funciona
      res.render("login")
    }
  });
}

export const loginPost = async (req, res) => {
  const { email, password } = req.body;
  const user = await userManager.loginUser(req.body);

  if (user) {
    req.session.email = email;
    req.session.role = user.role
    res.redirect(`/products/${user[0].id}`);
  } else {
    res.redirect("/errorLogin");
  }
}

export const getCurrent = (req, res) => {
  const user = req.session
  const userDTO = new UserDTO(user)
  res.json(userDTO)
}