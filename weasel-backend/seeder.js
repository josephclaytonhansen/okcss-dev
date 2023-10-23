//create sample data using Event model, Person model, Tool model, and Worship model
import User from './models/user.js'
import db from './mongo.js'

let users = [
]

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
