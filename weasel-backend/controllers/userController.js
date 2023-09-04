import asyncHandler from '../middleware/asyncHandler.min.js'
import User from '../models/user.js'
import { createToken, verifyToken, createAuth, verifyAuth } from './jwt.js'

const userLoginByEmail = asyncHandler(async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({ email: {$eq:req.body.email} })
    console.log(user, user.validPassword(req.body.password))
    if (user && user.validPassword(req.body.password)) {
        let auth_token = createAuth(createToken(user.email))
        res.json({auth_token: auth_token, email: user.email, organization: user.organization, ward: user.ward} )
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }

})

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.body.token || req.query.token
    const user = req.body.user || req.query.user
    let decode = verifyAuth(verifyToken(token))
    if (decode.email === user) {
        next()
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

export {
    userLoginByEmail,
    verifyToken
}