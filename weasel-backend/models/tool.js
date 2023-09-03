import mongoose from "mongoose"

const toolSchema = new mongoose.Schema({
    stri: String,
    sbmr: String,
    sbu: String,
    vsrc: String,
    vtpc: String,
    sutftm: String,
    vso: String
})

const Tool = mongoose.model("Tool", toolSchema)
export default Tool