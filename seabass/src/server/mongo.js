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

db.ObjectId = mongoose.Types.ObjectId

//create a session store
db.sessionStorage = {
    sessions: {},
    get: function (sid, cb) {
        cb(null, this.sessions[sid])
    },
    set: function (sid, session, cb) {
        this.sessions[sid] = session
        cb(null, session)
    },
    destroy: function (sid, cb) {
        delete this.sessions[sid]
        cb(null)
    }
}

export default db