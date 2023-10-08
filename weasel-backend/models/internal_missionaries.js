import mongoose from 'mongoose'
const internalMissionarySchema = new mongoose.Schema({
    phone: String,
    ward: String,
})

const InternalMissionary = mongoose.model('InternalMissionary', internalMissionarySchema)
export default InternalMissionary