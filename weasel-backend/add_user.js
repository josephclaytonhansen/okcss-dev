import User from './models/user.js'
import db from './mongo.js'

import {users} from './data.js'

const importData = async () => {
    try {
        
        const createdUsers = await User.insertMany(users)
        console.log(createdUsers)
        process.exit()
        
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
        
    }
}

importData()
