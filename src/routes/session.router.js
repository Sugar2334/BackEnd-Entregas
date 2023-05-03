import { Router } from "express";
import passport from "passport";
import { githubCallback, loginGet, loginPost } from "../controllers/user.controller.js";

const sessionRouter = Router();

sessionRouter.get("/login", loginGet);

sessionRouter.post("/login", loginPost);

// Login local con passport
sessionRouter.post("/signup", passport.authenticate('singup', {
  failureRedirect: '/errorLogin',
  successRedirect: '/login',
  passReqToCallback: true
}))

sessionRouter.get('/login/github', passport.authenticate('github', {scope: ['user:email']  , session: false}))

sessionRouter.get('/login/github/callback', passport.authenticate('github'), githubCallback)

export default sessionRouter;