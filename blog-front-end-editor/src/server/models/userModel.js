import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {String, unique: true},
    email: {String, unique: true},
    display_name: String,
    password: {
        type: String,
    },
    picture: String,
    bio: String,
    permissions: {type: String,
        default: "user"
    },
})

const User = mongoose.model('User', userSchema)
export default User