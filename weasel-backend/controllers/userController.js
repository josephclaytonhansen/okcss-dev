import asyncHandler from '../middleware/asyncHandler.min.js'
import User from '../models/user.js'

const getUserByEmail = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: {$eq:req.params.email} })
    res.json(user)
})

const userLoginByEmail = asyncHandler(async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({ email: {$eq:req.body.email} })
    console.log(user, user.validPassword(req.body.password))
    if (user && user.validPassword(req.body.password)) {
        res.json(user)
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }

})

export {
    userLoginByEmail
}