import mongoose from 'mongoose'

const highCouncilReportSchema = new mongoose.Schema({
    counselor: String,
    date: Date,
    content_text: String,
    content_link: String
})

const HighCouncilReport = mongoose.model('HighCouncilReport', highCouncilReportSchema)
export default HighCouncilReport