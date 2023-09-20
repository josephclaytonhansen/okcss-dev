import mongoose from 'mongoose'

const outgoingMissionarySchema = new mongoose.Schema({
    name: String,
    location: {
        city: String,
        state: String,
        country: String,
    },
    email: String,

})

const OutgoingMissionary = mongoose.model('OutgoingMissionary', outgoingMissionarySchema)
export default OutgoingMissionary
