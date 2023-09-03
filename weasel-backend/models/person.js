import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
    name: String,
    image: {
        src: String,
        alt: String,
        width: String,
        class: String,
    },
    position: String,
    email: String,
    phone: String,
    size: String,
    organization: String,
    bio: String
})

const Person = mongoose.model('Person', personSchema)
export default Person