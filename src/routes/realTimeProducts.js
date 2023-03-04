import { Router } from "express";

const router = Router()

router.get('/realtime', async (request, response) => {
    response.render('realTimeProducts')
})

export default router