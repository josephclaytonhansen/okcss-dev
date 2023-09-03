//create sample data using Event model, Person model, Tool model, and Worship model
import Event from './models/event.js'
import Person from './models/person.js'
import Tool from './models/tool.js'
import Worship from './models/worship.js'
import db from './mongo.js'

import {tools} from './data.js'

const importData = async () => {
    try {
        await Tool.deleteMany()
        const createdTools = await Tool.insertMany(tools)
        console.log(createdTools)
        process.exit()
        
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
        
    }
}

importData()
