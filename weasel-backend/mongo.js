import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_STRING = process.env.MONGO_STRING

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    return mongoose.connect(MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "weasel-backend-dev", keepAlive:true, keepAliveInitialDelay:300000, retryReads:true, retryWrites:true }).catch((err) => {
        console.log('MongoDB connection unsuccessful, retry after 1 seconds.')
        setTimeout(connectWithRetry, 1000)
    })
}

connectWithRetry()

const db = mongoose.connection

db.on('error', (error) => {
    console.log(error)
    mongoose.disconnect()
})

db.on('connected', () => {
    console.log('Database Connected');
})

db.on('disconnected', () => {
    connectWithRetry()
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