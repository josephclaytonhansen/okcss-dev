import asyncHandler from '../middleware/asyncHandler.min.js'
import User from '../models/userModel.min.js'

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})

const getUserByUsername = asyncHandler(async (req, res) => {
    const user = await User.findOne({username: {$eq: req.params.username}})
    if (user) {
        res.json(user)
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }
})

const getUserByEmail = asyncHandler(async (req, res) => {
    const user = await User.findOne({email: {$eq: req.params.email}})
    if (user) {
        res.json(user)
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }
})

const updateUserById = asyncHandler(async (req, res) => {
    const {username, email, password, permissions, picture, display_name, bio} = req.body
    const user = await User.findById(req.params.id)
    if (user) {
        //update modified fields
        user.username = username
        user.email = email
        user.password = password
        user.permissions = permissions
        user.picture = picture
        user.display_name = display_name
        user.bio = bio
        const updatedUser = await user.save()
        res.json(updatedUser)
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }

})

const updateUserBioById = asyncHandler(async (req, res) => {
    const {bio} = req.body
    const user = await User.findById(req.params.id)
    if (user) {
        //update modified fields
        user.bio = bio
        const updatedUser = await user.save()
        res.json(updatedUser)
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }
})

const updateUserDisplayNameById = asyncHandler(async (req, res) => {
    const {display_name} = req.body
    const user = await User.findById(req.params.id)
    if (user) {
        //update modified fields
        user.display_name = display_name
        const updatedUser = await user.save()
        res.json(updatedUser)
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }
})

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: 'user removed' })
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }

})

const createUser = asyncHandler(async (req, res) => {
    const {username, email, password, permissions, picture, display_name, bio} = req.body
    await User.create({
        username,
        email,
        password,
        permissions,
        picture,
        display_name,
        bio
    }).then((user) => {
        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                password: user.password,
                permissions: user.permissions,
                picture: user.picture,
                display_name: user.display_name,
                bio: user.bio
            })
        } else {
            res.status(400)
            throw new Error('invalid user data')
        }
    })
})

export {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    updateUserById,
    updateUserBioById,
    updateUserDisplayNameById,
    deleteUserById,
    createUser
}