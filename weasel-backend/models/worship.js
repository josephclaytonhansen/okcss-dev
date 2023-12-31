import mongoose from "mongoose"

const worshipSchema = new mongoose.Schema({
    ward: String,
    location: {
        address: String,
        city: String,
        state: String,
        zip: String,
        phone: String
    },
    time: String,
    googleMapsLink: String,
    image: {
        src: String,
        alt: String,
        width: String,
        class: String
    }
})

const Worship = mongoose.model("Worship", worshipSchema)
export default Worship