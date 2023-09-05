import asyncHandler from '../middleware/asyncHandler.min.js'
import User from '../models/user.js'
import { createToken, verifyToken, createAuth, verifyAuth } from './jwt.js'

const userLoginByEmail = asyncHandler(async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({ email: {$eq:req.body.email} })
    console.log(user, user.validPassword(req.body.password))
    if (user && user.validPassword(req.body.password)) {
        let auth_token = createToken(user.email)
        res.json({auth_token: auth_token, email: user.email, organization: user.organization, ward: user.ward} )
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }

})

const verifyTokenUser = asyncHandler(async (req, res, next) => {
    const token = req.body.token || req.query.token
    const user = req.body.user || req.query.user
    let decode = verifyToken(token)
    let user_json = JSON.parse(user)
    if (decode.email === user_json.user.email && decode.ward === user_json.user.ward && decode.organization === user_json.user.organization) {
        res.status(200)
        res.json({message:'success'})
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

const createUser = asyncHandler(async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        ward: req.body.ward,
        organization: req.body.organization
    })
    await user.save()
    res.status(201).json(user)
})

export {
    userLoginByEmail,
    verifyTokenUser,
    createUser
}