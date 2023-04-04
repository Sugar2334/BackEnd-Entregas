import { Router } from "express";

const cookieRouter = Router()

// cookieRouter.use(cookieParser)

// cookieRouter.get("/crear", (req, res) => {
//     res.cookie("cookieJavi", "Mi primera cookie").send("Cookie guardada")
// })

// cookieRouter.get("/crearFirmada", (req, res) => {
//     res.cookie("cookieJavi", "Mi primera cookie firmada", { signed: true }).send("cookie firmada")
// })

// cookieRouter.get("/leer", (req, res) => {
//     console.log(req.cookies);
// })

// cookieRouter.get("/borrar", (req, res) => {
//     res.clearCookie("cookieJavi").send("cookie borrada")
// })

// maxAge es el tiempo de vida que tiene la cookie, despues de pasado el tiempo se borra. En este caso, despues de 15 segundos se borrara.
// cookieRouter.post("/login", (req, res) => {

//     const { name, email } = req.body
//     res.cookie(name, email, {maxAge: 15000}).send("creado")
// })

export default cookieRouter