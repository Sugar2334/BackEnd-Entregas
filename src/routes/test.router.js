import { Router } from "express";
import { logTest } from '../controllers/test.controller.js'


const router = Router()

router.get('/loggerTest', logTest)

export default router