import {dirname} from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashPassword = async (e) => {
    return bcrypt.hash(e, 10)
}

export const comparePasswords = async (pass, ashedPass) => {
    return bcrypt.compare(pass, ashedPass)
}

export const generateToken = (user) => {
    const token = jwt.sign((user), process.env.SECRET_JWT, { expiresIn: '1h' })
    return token
}