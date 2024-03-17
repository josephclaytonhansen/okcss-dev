import mongoose from 'mongoose'

const highCouncilEmailSchema = new mongoose.Schema({
    email: String,
})

const HighCouncilEmail = mongoose.model('HighCouncilEmail', highCouncilEmailSchema)

export default HighCouncilEmail