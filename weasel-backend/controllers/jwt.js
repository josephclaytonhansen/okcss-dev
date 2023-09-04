import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.JWT_SECRET
const auth_secret = process.env.JWT_AUTH_SECRET

export const createToken = (email) => {
    return jwt.sign({ email }, secret, { expiresIn: '1h' })
}

export const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

export const createAuth = (token) => {
    return jwt.sign({ token }, auth_secret, { expiresIn: '1h' })
}

export const verifyAuth = (token) => {
    return jwt.verify(token, auth_secret)
}