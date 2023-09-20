import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    googleId: {type:String, unique: true},
    username: {type:String},
    email: {type:String, unique: true},
    display_name: {type:String, default: "No display name set"},
    picture: String,
    bio: {type:String, default: "No bio yet"},
    permissions: {type: String,
        default: "user"
    },
    totp: {type: Boolean, default: false},
    totpSecret: {type: String},
})

const User = mongoose.model('User', userSchema)
export default User