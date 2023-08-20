import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_STRING = process.env.MONGO_STRING
mongoose.connect(MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "development" })
const db = mongoose.connection
db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

export default db