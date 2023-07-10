import { Router } from "express";
import { deleteInactiveUsers, getUsersInfo } from "../controllers/user.controller.js";

const router = Router()

router.get('/', getUsersInfo)

router.delete('/', deleteInactiveUsers)

export default router