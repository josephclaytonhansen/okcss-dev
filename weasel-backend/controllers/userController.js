import asyncHandler from '../middleware/asyncHandler.min.js'
import User from '../models/user.js'

const getUserByEmail = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: {$eq:req.params.email} })
    res.json(user)
})

const userLoginByEmail = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: {$eq:req.params.email} })
    if (user && user.validPassword(req.params.password)) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('Invalid credentials')
    }

})

export {
    userLoginByEmail
}