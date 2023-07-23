import { Router } from "express";
import { changeRole, getCurrent } from "../controllers/user.controller.js";

const router = Router()

router.get('/current', getCurrent)

router.get('/premium/:uid', changeRole);

export default router