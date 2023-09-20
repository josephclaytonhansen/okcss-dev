import mongoose from 'mongoose'
const internalMissionarySchema = new mongoose.Schema({
    name1: String,
    name2: String,
    name3: String,
    phone: String,
    ward: String,
})

const InternalMissionary = mongoose.model('InternalMissionary', internalMissionarySchema)
export default InternalMissionary