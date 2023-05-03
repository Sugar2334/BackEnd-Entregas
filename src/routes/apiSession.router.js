import { Router } from "express";
import { getCurrent } from "../controllers/user.controller.js";

const router = Router()

router.get('/current', getCurrent)

export default router