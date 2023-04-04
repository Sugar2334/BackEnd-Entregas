import { Router } from "express";
import session from "express-session";

const apiSessionsRouter = Router()

apiSessionsRouter.get('/current', (req, res) => {
    const user = req.session
    res.json(user)
})

export default apiSessionsRouter