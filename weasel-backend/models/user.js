import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    ward: String,
    organization: String
})

userSchema.methods.encryptPassword = function( pwd ) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(10), null)
}

userSchema.methods.validPassword = function( pwd ) {
    return bcrypt.compareSync(pwd, this.password)
}

userSchema.pre('save', function(next) {
    if (this.password) {
        this.password = this.encryptPassword(this.password)
        this.save()
    }
    next()
})

userSchema.pre('validate', function(next) {
    if (this.password) {
        this.password = this.encryptPassword(this.password)
        next()
    }
})


const User = mongoose.model("User", userSchema)


export default User