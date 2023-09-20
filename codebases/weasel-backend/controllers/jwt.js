import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.JWT_SECRET
const auth_secret = process.env.JWT_AUTH_SECRET

export const createToken = (user) => {
    return jwt.sign({ email: user.email, organization: user.organization, ward: user.ward }, secret, { expiresIn: '30m' })
}

export const verifyToken = (token) => {
    return jwt.verify(token, secret)
}
