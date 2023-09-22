//create sample data using Event model, Person model, Tool model, and Worship model
import Event from './models/event.js'
import Person from './models/person.js'
import Tool from './models/tool.js'
import Worship from './models/worship.js'
import User from './models/user.js'
import db from './mongo.js'

import {tools, events, contacts, users} from './data.js'

const importData = async () => {
    try {
        await Tool.deleteMany()
        await Event.deleteMany()
        await Person.deleteMany()
        const createdTools = await Tool.insertMany(tools)
        const createdEvents = await Event.insertMany(events)
        const createdContacts = await Person.insertMany(contacts)
        console.log(createdTools, createdEvents, createdContacts)

        users.forEach(user => {
            if (!User.exists(
                {email: {$eq: user.email}}
            )){
                const newUser = new User({
                    email: user.email,
                    password: user.password,
                    ward: user.ward,
                    organization: user.organization
                })
                newUser.save()
            }
        })
        
        process.exit()
        
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
        
    }
}

importData()
